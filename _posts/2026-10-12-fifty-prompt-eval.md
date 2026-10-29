---
title: "Before You Switch Models, Run 50 Real Prompts"
author: Kirill Kuklin
date: 2026-10-12 09:00:00 -0700
category: ai
layout: post
tags:
  - evals
  - llm-ops
  - regression-testing
  - promptfoo
  - model-versioning
excerpt: >
  A model name in your config no longer guarantees the model behind it. Pull 20
  to 50 real requests from your logs, run old and new side by side, score
  accuracy before speed and cost, and keep the set as a gate.
---

On October 8, Google's
[Gemini API release notes](https://ai.google.dev/gemini-api/docs/changelog)
deprecated `gemini-3.7-flash` and routed every request for it to
`gemini-3.8-flash`. If your code calls `gemini-3.7-flash`, nothing errored and
nothing in your repo changed. A different model is answering anyway.

You can't stop that kind of change. You can notice it within an hour, with a
small, boring test: a fixed set of real prompts with known answers, run against
the old model and the new one before you trust either.

## Pinning a name doesn't pin the model

The usual advice is "pin your model version." It's good advice, and it's also not
enough. Here is what each provider's own docs promise:

| Provider | What the docs say |
|---|---|
| Google | Stable names "usually don't change"; `-latest` aliases get "hot-swapped with every new release" ([models page](https://ai.google.dev/gemini-api/docs/models)) |
| OpenAI | "Snapshots let you lock in a specific version of the model" ([model page](https://developers.openai.com/api/docs/models/gpt-4.1)) |
| Anthropic | An ID keeps the same model for its lifetime, but infrastructure updates can cause "minor differences in observable behavior" ([model IDs](https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions)) |

`gemini-3.7-flash` wasn't a `-latest` alias. It was a stable name, the kind the
docs tell production apps to use, and Google still rerouted it. **Keep pinning,
but pinning didn't stop this reroute.** To know what model your requests get, you
have to run your requests through it.

Local engines have the same gap from a different direction. In
[my Strata post]({{ '/ai/2026-10-07-strata-speed-vs-quality.html' | relative_url }}),
several people reproduced the speed on their own hardware within days. The one
independent accuracy test, a single user's 50-image task, found a median miss
about 3.3x bigger than llama.cpp's on the same file. Speed spreads because anyone
can read a counter. Accuracy needs an answer key.

## The afternoon version

This is the smallest eval (an automated test of a model's answers) that's worth
having. Four steps.

**1. Pull 20 to 50 real requests from your logs.** Not invented ones. Real prompts
carry the odd formatting, the half-pasted stack traces and the vague questions your
users actually send. OpenAI's
[evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
say: "Log as you develop so you can mine your logs for good eval cases."

**2. Write down the right answer for each.** Only keep requests where you're sure
of the answer: a category, a service name, an extracted field, a yes or no. If
you can't say what right looks like, that request isn't ready for the set yet.

**3. Run old vs new at identical settings.** Same system prompt, same temperature,
same max tokens, same tools. Change only the model ID. Run each prompt three
times, because outputs vary between identical calls. OpenAI's docs say Chat
Completions "may differ from request to request" and that even a fixed `seed` gives
only "mostly" deterministic output
([reproducible outputs](https://developers.openai.com/api/docs/guides/advanced-usage)).

**4. Score accuracy first, then latency, then cost.** A model that costs less per
call and gets six prompts wrong hasn't saved you anything. It moves the cost to
whoever has to notice the wrong answers.

## A config you can copy

[promptfoo](https://www.promptfoo.dev/docs/intro/) is one way to run this. It's
an open-source eval tool that "runs completely locally" and talks straight to the
model APIs. Any eval harness (the script that sends the prompts and scores the
answers) works; promptfoo's config happens to be short.

The answer key is a CSV (a spreadsheet saved as plain text). The `__expected`
column holds the check, following the
[test-case docs](https://www.promptfoo.dev/docs/configuration/test-cases/). These
rows are made up to show the shape:

```
question,__expected
"Which team owns alert KUBE-POD-OOM in cluster prod-eu?","icontains: payments"
"Classify this ticket: 'disk at 95% on db-03'","equals: storage"
```

The config points both models at the same prompt and the same rows:

```yaml
# promptfooconfig.yaml
prompts:
  - file://prompt.txt          # your production prompt, with {% raw %}{{question}}{% endraw %}
providers:
  - id: google:gemini-3.6-flash    # what you run today
    config: { temperature: 0 }     # use your production value, on both
  - id: google:gemini-3.8-flash    # the candidate
    config: { temperature: 0 }
tests: file://real_prompts.csv
defaultTest:
  assert:
    - type: latency
      threshold: 5000              # milliseconds
```

Then run it:

```bash
npx promptfoo@latest eval --repeat 3 --no-cache -o baseline.json
```

`--repeat 3` runs every test three times. Without `--no-cache`, a cached answer
comes back instantly and the latency numbers mean nothing; promptfoo's
[latency check](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/)
"requires that the cache is disabled". For the cost step, the same page documents a
`cost` assertion that also takes a threshold.

## What 50 prompts can't tell you

- **One prompt is 2 points.** With 50 prompts, a 92% vs 94% result is one prompt
  flipping, which is noise. The set catches a cliff (a model that suddenly fails a
  whole kind of request); a slow 2% drift hides in the noise.
- **Read every failure.** An exact-match check marks "storage" wrong when the model
  says "the disk is full". Sometimes the new model is right and your answer key is
  stale.
- **Save today's outputs.** After the October 8 reroute, there's no
  `gemini-3.7-flash` left to compare against. `-o baseline.json` is your only
  record of what the old model said.

**Keep the set small enough to read every failure by hand.** The failures show
you what changed.

## Keep it as a gate

The afternoon is the cheap part. The value comes from running the same set every
time something changes: a model ID, a prompt edit, a provider's release notes.

Per promptfoo's
[command-line docs](https://www.promptfoo.dev/docs/usage/command-line/), `eval`
exits with code 100 "when there is at least 1 test case failure or when the pass
rate is below the threshold set by `PROMPTFOO_PASS_RATE_THRESHOLD`." Any CI job
(continuous integration, the checks that run on every pull request) turns that
into a red build with no extra scripting.

I've described this before. In
[a staff AI engineer interview write-up]({{ '/job-interviews/2026-05-25-staff-ai-engineer-interview.html' | relative_url }})
I described the setup for an incident-triage pipeline: offline evals in GitHub
Actions on every pull request, and a golden set of 50 to 100 incidents categorized by hand,
redone every quarter because the mix of incidents drifts. Same shape, smaller
scale. It's also the argument from
[Why I Benchmark a Proxy That Already Works]({{ '/ai/2026-06-08-why-benchmark-llm-proxy.html' | relative_url }}):
once a measurement produces a number, that number is a contract you can diff.

Grow the set when production surprises you. Every bad answer a user reports is a
new row with a known answer.

## What to take away

- **A model name can point at a different model tomorrow.** Google rerouted a
  stable name on October 8, and Anthropic says even a fixed ID can shift slightly
  when serving infrastructure changes.
- **Pull 20 to 50 real requests** with answers you're sure of.
- **Change only the model ID.** Same prompt, settings and tools, three repeats.
- **Accuracy first, then latency, then cost.** Turn the cache off before you
  trust latency.
- **Save the outputs** while the old model still answers.
- **Make it a gate.** promptfoo exits with code 100 on a failure, so your CI can
  block the change.
