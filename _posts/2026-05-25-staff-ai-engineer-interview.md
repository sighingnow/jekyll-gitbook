---
title: "I Just Took a Staff AI Engineer Interview — Here's What I Said"
author: Kirill Kuklin
date: 2026-05-25
category: job-interviews
layout: post
tags:
  - ai-engineering
  - rag
  - agents
  - observability
  - llm-ops
  - incident-response
excerpt: >
  My own brain-dump from a Staff AI Engineer loop — what I shipped, what I'd
  defend in a code review, and the answers that apparently didn't tank me
  because I got invited back. Spoiler: less magic, more boring engineering,
  and one or two opinions about Grafana.
---

---

_Posting this mostly for me — a sanity-check of the answers I gave in a recent Staff AI Engineer loop. Also because writing it down is cheaper than therapy 💸. Names of the hiring company and my current employer are off-limits, so I'll keep the specifics generic, but the technical substance is exactly what I said in the room._

---

## Background they asked about

My path is one I've seen more and more of: SRE → DevOps → AI-facing engineering, with the operational instincts still intact (read: I still twitch at the word "deploy on Friday"). Before AI, I did system architecture and a long stint in customer/technical support — which I told them, with a straight face, was the single most useful background for building anything customer-facing on top of LLMs.

> "You stop reaching for clever model tricks and start asking 'what does the on-call human actually need at 2am?'" 🌙

I've been shipping AI features since the GPT-3 era — early on, building an abstraction layer over the Azure OpenAI APIs so the rest of the org could stop copy-pasting `requests.post` snippets. More recently, an automated incident-quality assessment pipeline that other teams ended up adopting, which is honestly the cleanest signal that a tool is working: people steal it.

---

## The system I walked them through

My current charter: an incident-triage automation system for a security product line, processing multiple customer-reported incidents per day. The inputs are messy — missing logs, half-finished troubleshooting notes, screenshots without context, and the occasional _"it's broken, plz fix 🙏"_. My job is to turn that into something a human responder can act on in seconds.

The system is more boring than the conference talks make it sound, which is the point. Boring in production is a compliment. Exciting in production means someone's getting paged.

**1. Quality assessment.** Before anything else, an LLM call grades the incoming incident against the backend data we already have — does the customer's description actually match what telemetry shows? Low-quality inputs get bounced back for clarification instead of poisoning the rest of the pipeline. Garbage in, very confidently-worded garbage out.

**2. Retrieval.** A RAG layer over ~1,600 internal articles plus the public product documentation, indexed in a vector database with semantic matching. Nothing exotic — the work was in chunking and threshold tuning, not algorithm choice. Sorry, no secret sauce 🥲.

**3. Historical context.** KQL (Kusto) queries pull the five most recent incidents with similar symptoms. When they asked which retrieved context moves the needle most, I said historical incidents — higher than docs, every time. The docs tell you what _should_ happen. Past incidents tell you what _actually_ happens.

**4. Synthesis.** The model drafts a triage summary with citations back into the retrieved set. Citations are mandatory; uncited answers are dropped. No vibes-based answers, no matter how confident the model sounds.

---

## RAG — what actually moved the metric

This was the section where I expected the deepest follow-ups, and got them. My short version:

> "Most of the wins came from things you'd find in a 2023 blog post. The mistake is thinking you've already done them."

- **Precision@k as the primary metric**, not recall. For triage, missing a relevant article is annoying; surfacing an irrelevant one is poison.
- **Recursive / semantic chunking** consistently beat fixed-window chunking.
- **Relevance threshold of 0.6** before a chunk is allowed into the answer set. Below that, drop it. Counter-intuitively, returning less context produced better answers — the model is happier with a small, clean tray than a giant buffet.
- **LLM-as-judge** as a second pass — a smaller model scores the synthesized answer against the retrieved chunks. Disagreement triggers a re-run with tighter retrieval.
- **Language-specific datasets.** English and German incidents get separate weights. The temptation is to treat language as a translation problem. It isn't — the technical vocabulary, log formats, and even the way customers complain are different.

---

## Evaluation

The interviewer leaned in here, which I took as a good sign.

- **Offline-only evals**, run in GitHub Actions on every PR. No live A/B in production for the triage path; the cost of a wrong answer is too high.
- **50–100 incidents manually categorized with SMEs** as the golden set. We re-do this every quarter — the distribution of incident types drifts faster than you'd think.
- **LangFuse** for dataset management and trace inspection. I admitted I had previously tried to bend Grafana into doing this and gave up. Grafana is the wrong shape for LLM calls — you're not looking at metrics, you're looking at a conversation.
- A separate eval suite per feature — quality assessment, retrieval, synthesis, and the judge each get their own.

---

## Safety, policy, and the human in the loop

The team services some VIP customers where any automated action needs human approval. The implementation I described and would defend in any review:

- **Approval requests routed via Teams**, with an escalation chain — primary owner, then a colleague, then mobile phones via the on-call system if neither responds in N minutes. The approval is a feature, not friction — but it has to feel fast or people will route around it.
- **LangGraph for policy enforcement.** Every tool call passes through a policy node that checks:
  - tool name against an allow-list,
  - argument validation (types, ranges, regex on resource IDs),
  - role-based access for the calling agent,
  - a risk level on the tool that maps to required approval.
- **Read-only database credentials** for any code path that touches sensitive data. _"If your agent has DELETE, it will eventually DELETE."_ (Frame this and hang it above your desk.)
- **Prompt-injection defence**: untrusted text (customer descriptions, retrieved docs) is wrapped in clearly delimited blocks, and the system prompt instructs the model to treat anything inside those blocks as data, not instructions. Belt and suspenders, but it has caught real attempts.

---

## Memory & context engineering

This is where I leaned hardest on the SRE background, and I think it landed.

> "State is durable. Context is what the model needs _right now_. Stop mixing them."

- **State vs context split.** State lives in a real store and survives across turns. Context is rebuilt every turn and contains only what the next step needs.
- **Compression triggers at ~40% of the context window.** I explicitly do not wait for the window to fill — by then, performance has already degraded.
- **Memory hierarchy:**
  - **Cold storage** — immutable raw logs. Source of truth, never queried by the model directly.
  - **Structured memory** — extracted facts (entities, decisions, customer preferences) stored as JSON. Queried deterministically.
  - **Compressed summaries** — what actually goes into the prompt.
- **Critical-information tagging** before any compression pass. User preferences, explicit decisions, constraints, and tool outputs are tagged high-importance and survive every compression round verbatim. Tool outputs are almost always more important than the model thinks they are.

---

## Skills, MCP, and the capability registry

I'm bearish on giving an agent unrestricted MCP access and I said so out loud. The setup I described:

- **Capability registry** — every tool has an explicit contract: name, permission level, side-effect class (read / mutate / external), and whether it's exposed publicly (as a slash command) or only callable internally.
- **Dynamic skill selection per conversation.** Pipeline:
  1. Pull candidate skills from the registry filtered by the user's role.
  2. Rank by relevance to the current user message and the conversation's accumulated context.
  3. Cap at **3–5 MCPs per conversation**. More than that and the model's tool-choice accuracy collapses — we measured it. Apparently agents, like the rest of us, get decision fatigue at the buffet.
- **`Examples.md` files** per skill that the model is shown verbatim. Deterministic invocation patterns beat clever tool descriptions every time.
- Hard RBAC enforcement happens _outside_ the LLM, in the policy layer — the model is never trusted to gate its own access.

---

## Observability & infrastructure

- **LangFuse is the standard** for LLM observability on my team. Grafana stays for the rest of the stack.
- **Everything is logged and alerted.** Every tool invocation, every retrieval, every policy decision, every approval response. If it isn't logged, it didn't happen — and if it didn't happen, you can't reproduce the bug that just paged you.
- **Strict separation of production and evaluation environments.** Different credentials, different data stores, different model deployments.
- **Mock tools for CI/CD.** The eval pipeline runs against mocks so it can exercise the agent's reasoning without making real API calls or mutations.
- **Sandbox / shadow environments** for testing new policies or skills against real traffic patterns without affecting production.
- **Dry-run mode** is a first-class feature, not a debug flag. Any mutating tool can be run with `dry_run=true` and the agent's plan is logged but not executed.

---

## What I'd tell past-me before the loop

A few patterns kept showing up in my own answers that I want to plant flags on:

1. **The metric is precision, not recall.** This applies to retrieval, to tool selection, to approval workflows. Returning less, but better, beats returning more.
2. **State and context are different things.** Treating them as one is the most common mistake I see in agent code reviews — including my own old ones.
3. **The policy layer is not part of the model.** It runs around the model and is allowed to refuse. The model is never the security boundary.
4. **Offline evals with a small, hand-curated golden set, refreshed quarterly.** Glamour-free, the only thing that actually moved the metric.
5. **Operational instincts beat ML instincts** for this class of system. If you're hiring, look at SRE / support / platform résumés.

---

## The verdict

I got the email a couple of days later: **invited to the next round** 🎉. So either the above answers were directionally right or I caught the interviewer on a generous day — I'll take either. Next stage is a system-design round, and I suspect "design the incident-triage system without the benefit of having already built it" is going to be the prompt. Updates to follow.

If you're prepping for a Staff-level AI engineering loop yourself, the section headers above are basically the question list. You're welcome 🎁.
