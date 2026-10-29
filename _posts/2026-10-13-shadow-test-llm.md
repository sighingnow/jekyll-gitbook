---
title: "Shadow-Test the New Model Before You Cut Over"
author: Kirill Kuklin
date: 2026-10-13 09:00:00 -0700
category: sre
layout: post
tags:
  - llm-ops
  - shadow-traffic
  - canary
  - envoy
  - istio
excerpt: >
  Swapping the model behind your app is a deploy, so ship it like one. Copy a
  slice of real traffic to the new model, throw its answers away, compare
  offline, then roll out in steps with a switch that undoes it in seconds.
---

A typical model switch goes like this. Run the eval set, the scores look
fine, change the model name in config, watch the dashboards. Evals tell you how
the new model does on prompts you wrote. Production tells you how it does on
prompts your users wrote, at your traffic shape, against your timeouts.

**Shadow testing gets you the second answer before a single user is involved.**
It's an old SRE (site reliability engineering) pattern, and it needs a few
changes for LLMs (large language models).

## Two steps, two questions

**Shadow (also called mirroring):** every request, or a slice of them, gets
copied to the candidate model. The user only ever sees the current model's
answer. The candidate's answer goes to a log. Envoy's docs describe their
version as
["fire and forget"](https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/route/v3/route_components.proto):
Envoy "will not wait for the shadow cluster to respond before returning the
response from the primary cluster." Istio's
[mirroring task](https://istio.io/latest/docs/tasks/traffic-management/mirroring/)
says the mirrored responses "are discarded." AWS built the same idea into
[SageMaker shadow tests](https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html):
"Only the responses of the production variant are returned to the calling
application."

**Canary:** after the shadow looks good, real users get the new model, a few
at first. Google's SRE workbook
[defines canarying](https://sre.google/workbook/canarying-releases/) as "a
partial and time-limited deployment of a change in a service and its
evaluation."

```
user ──▶ gateway ──▶ current model ──▶ answer back to user
            │
            └── copy of 10% ──▶ candidate model ──▶ log only
```

**The shadow tests the model. The canary tests the cutover.** Skip the first
and the canary becomes your test bench, with real users on it.

## Where the copy happens

You need one place every model call already passes through: a gateway, a
service mesh, or your own LLM proxy.

| Layer | Setting | How much gets copied | Worth knowing |
|---|---|---|---|
| Envoy | `request_mirror_policies` on a route | `runtime_fraction`; if unset, "all requests" | appends `-shadow` to the Host header unless `disable_shadow_host_suffix_append` is set |
| Istio | `mirror` + `mirrorPercentage` | "If this field is absent, all traffic will be mirrored" | same `-shadow` suffix |
| LiteLLM proxy | `silent_model` on a deployment | the docs page shows no percentage setting | shadow calls are logged with `is_silent_experiment: True` |
| Envoy AI Gateway | proposed `mirrors` field | proposed `percent` | [open feature request](https://github.com/envoyproxy/ai-gateway/issues/2137) since May 13, 2026, not shipped |

Sources: [Envoy route docs](https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/route/v3/route_components.proto),
[Istio mirroring](https://istio.io/latest/docs/tasks/traffic-management/mirroring/),
[LiteLLM traffic mirroring](https://docs.litellm.ai/docs/traffic_mirroring).

**Envoy and Istio both copy everything by default.** Set the percentage on
purpose, because every copied request is a paid one.

## Why a plain HTTP mirror isn't enough

Envoy and Istio copy a web request. They don't know it's an LLM call. Four
things bite.

**1. The model name lives in the request body.** A copied request still says
`"model": "<current model>"`. The Envoy AI Gateway feature request spells out
the result: "the shadow backend sees a request shaped for the primary, not for
itself." If the candidate is from another provider, the whole request shape is
different too. I hit those differences when I
[put an OpenAI-shaped proxy in front of Claude]({{ '/ai/2026-06-01-openai-compatible-proxy-for-claude.html' | relative_url }}):
the system prompt moves, `max_tokens` becomes required, the response comes back
in blocks. Something has to rewrite the copy for its target.

**2. The `-shadow` suffix.** Both Envoy and Istio change the Host header on the
copy (`cluster-1` becomes `cluster-1-shadow`); Envoy's docs say it's useful for
logging. If
your shadow target is a hosted API, check that it still routes, or turn the
suffix off.

**3. Tool calls.** If the model runs inside an agent loop, the shadow's answer
may ask to call a tool. Never execute it. Mirror the bare model call; if you
mirror the whole agent, the shadow starts writing to real systems.

**4. Chat history.** In a multi-turn chat, the copied request carries the
current model's earlier answers. The candidate is judged on a conversation it
didn't steer. Fine for single-shot calls; for chat, weight first turns or
replay whole sessions offline.

## What to compare

Tag every record with a request ID and `primary` or `shadow`, then join the
pairs. The SRE workbook asks for the same thing for canaries:
"fine-grained breakdowns that enable you to differentiate metrics between the
canary and control populations."

| Signal | Measure | Red flag |
|---|---|---|
| Errors | 4xx/5xx, timeouts, refusals | a new error class, not just a higher rate |
| Truncation | finish reason `length` | answers cut off at your `max_tokens` |
| Latency | p50/p95 (the time half or 95% of requests beat); time to first token if you stream | p95 above your timeout |
| Cost | input + output tokens per request, times the candidate's price | a model that writes twice as much |
| Quality | rubric score, JSON schema checks, side-by-side review | judged by exact string match |

Don't compare outputs as strings. Two good answers rarely match word for word.
Score them against what the request needed, and have a human read a sample of
the disagreements.

This is the gap in my own proxy. When I
[taught llm-batcher to watch itself]({{ '/ai/2026-06-04-llm-proxy-observability.html' | relative_url }}),
`/metrics` got one pooled latency window, not a split by model, and it does no
mirroring. One idea from that post carries over directly: a model missing from
the price table lands in an `unpriced` bucket instead of costing $0. A shadow
candidate is the model your price table hasn't heard of yet.

## The bill and the privacy notice

**Cost.** Every mirrored request is billed twice: once for the answer the user
gets, once for the answer you throw away. Mirror 10% of traffic to a model with
the same price and output length, and total spend goes up about 10%. A
candidate that writes longer answers costs more than that. The Envoy AI Gateway
proposal turns off cost reporting on mirror copies so dashboards don't
double-count tokens. Your provider still bills both calls. Give the shadow an
end date, the way SageMaker's shadow tests run "for a predefined duration of
time."

**Privacy.** Mirrored prompts are still user data. If the candidate is a new
provider or a new region, that's a new place your users' text goes. Check your
contracts and privacy notice cover it before the first copy. The
shadow log also stores every prompt next to two answers. LiteLLM sends shadow
calls to your normal logging (Langfuse, S3), so give that log the same
retention and access rules as production, or strip personal data first. If
that's hard, start by mirroring internal users only.

## Then the canary, with a real switch

Once the shadow numbers hold, move real users in steps. My default is 1%, then
10%, then 50%, then 100%, holding each step for at least one full daily
traffic cycle. That's my own schedule; Google's workbook example
uses 5%. [Argo Rollouts' example](https://argo-rollouts.readthedocs.io/en/stable/features/canary/) goes 10% then 20%. Istio does it with route
weights:

```yaml
- destination: { host: llm-gateway, subset: current }
  weight: 90
- destination: { host: llm-gateway, subset: candidate }
  weight: 10
```

Each step needs a gate written down before you start: error rate and p95 no
worse than the current model, cost per request inside the budget. Miss a gate,
go back.

Going back has to be fast. Argo Rollouts says that on abort, "traffic can be
immediately shifted back to the stable ReplicaSet without delay." Your version
can be a route weight or a flag in your proxy. **If rollback needs a deploy,
you don't have a rollback switch.**

## What to take away

- Treat a model swap as a deploy: shadow first, then canary, then cut over.
- Mirror at the layer every call already passes through, and set the
  percentage yourself. Envoy and Istio default to all traffic.
- Rewrite the copy for its target model, and never execute a shadow's tool
  calls.
- Compare errors, truncation, p95, tokens and quality per request pair, not
  string matches.
- Budget for the doubled spend on the mirrored slice, and treat mirrored
  prompts as the user data they are.
- Make rollback a weight or a flag you can flip in seconds.
