---
title: "I Put an OpenAI-Shaped Proxy in Front of Claude"
author: Kirill Kuklin
date: 2026-06-01
category: ai
layout: post
tags:
  - llm-ops
  - inference
  - fastapi
  - api-design
  - sre
excerpt: >
  A small FastAPI service that speaks the OpenAI Chat Completions API on the
  front and the Anthropic Messages API on the back. Any tool that already talks
  to OpenAI can point at it and get Claude instead, with zero client changes. Here's
  what I built, the API mismatches that bite, and the SRE reasoning underneath.
---

I built a small service called **`llm-batcher`**: a FastAPI proxy that speaks the
**OpenAI Chat Completions API** on the front and the **Anthropic Messages API** on
the back. Any tool that already emits OpenAI-shaped requests (an SDK, `curl`,
LangChain) can point at it and get **Claude** instead, with zero client changes.

- **Repo:** [github.com/NeverTheSame/llm-batcher](https://github.com/NeverTheSame/llm-batcher)
- **Stack:** Python 3.12, FastAPI, httpx (async), Pydantic v2, Docker
- **Tests:** 5 unit tests, mocked upstream, no API key required, all green

It's deliberately small: a clean pass-through with request/response translation and
a real test suite. But it's the seed of the thing an inference-serving team actually
runs in production: adaptive batching, routing, backpressure, and a cost/latency
observatory.

## Why a proxy at all

I've spent years as an SRE keeping distributed systems alive: Kubernetes, Terraform,
observability, the on-call pager. I'm deliberately pointing those skills at **AI
inference**, the part of the ML stack that's *least* about training and *most* about
the thing I already do: serving traffic reliably, cheaply, and fast at scale. (I
[said roughly this in a Staff AI Engineer interview]({{ '/job-interviews/2026-05-25-staff-ai-engineer-interview.html' | relative_url }}),
less model magic and more boring engineering.)

The insight that unlocked the project: **an LLM inference proxy is just a reverse
proxy with interesting backpressure.** Connection pooling, request batching, queueing
under load, latency budgets, cost telemetry. Those are exactly the problems I've
solved for databases and microservices. I don't need to learn ML from scratch; I need
to point existing skills at a new kind of upstream. It's the same "treat generative AI
like any other production workload" stance I took on
[Composer LLM]({{ '/ai/2025-11-20-composer-llm-model.html' | relative_url }}) and the
[Hugging Face model radar]({{ '/ai/2025-11-20-huggingface-model-radar.html' | relative_url }}),
just from the serving side instead of the model-selection side.

## Before and after: switching a real app to Claude

Here's the concrete payoff, the thing I care about most: a real app, before and
after. Say you have a small tool built on the **official OpenAI Python SDK**. It
works, it's in production, and now someone asks: "can we try Claude for this?"

**Before (no proxy):** to answer that question you rewrite the call against the
**Anthropic SDK**. Watch how many lines that touch the API have to change.

```python
# BEFORE: the app as it ships today, talking to OpenAI
from openai import OpenAI

client = OpenAI()  # reads OPENAI_API_KEY
resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are terse."},
        {"role": "user", "content": "Reply with exactly: pong"},
    ],
    max_tokens=16,
)
print(resp.choices[0].message.content)
```

```python
# BEFORE: the rewrite you need to run that same logic on Claude
from anthropic import Anthropic

client = Anthropic()  # different client, reads ANTHROPIC_API_KEY
resp = client.messages.create(
    model="claude-3-5-haiku-latest",
    system="You are terse.",                  # system prompt leaves the messages array
    messages=[
        {"role": "user", "content": "Reply with exactly: pong"},
    ],
    max_tokens=16,                            # no longer optional
)
print(resp.content[0].text)                   # response is a list of typed blocks
```

Every line that touches the API changed: the client class, the system-prompt
placement, the now-mandatory `max_tokens`, and the response parsing. Multiply
that across a codebase with retries, streaming, function-calling, logging, and
tests, and "let's just try Claude" quietly becomes a multi-day migration.

**After (with `llm-batcher`):** the app doesn't change at all. You point the
OpenAI client at the proxy and ask for a Claude model. That's the entire diff.

```python
# AFTER: same OpenAI SDK, same message shape, same parsing
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1")  # the only line that changed
resp = client.chat.completions.create(
    model="claude-3-5-haiku-latest",   # a Claude model id
    messages=[
        {"role": "system", "content": "You are terse."},
        {"role": "user", "content": "Reply with exactly: pong"},
    ],
    max_tokens=16,
)
print(resp.choices[0].message.content)
```

Or change nothing in code at all, because the OpenAI SDK already honors an env var:

```bash
export OPENAI_BASE_URL="http://localhost:8000/v1"
```

The proxy absorbs every contract difference, so the application code stays
exactly as it was:

| What changes to use Claude | Without the proxy | With `llm-batcher` |
| --- | --- | --- |
| SDK / client class | swap OpenAI for Anthropic | unchanged |
| System prompt | move into top-level `system` | unchanged |
| `max_tokens` | add it (now required) | unchanged |
| Response parsing | rewrite for content blocks | unchanged |
| Net code change | every API call site | one `base_url`, or one env var |

That's the whole idea: meet the tool where it already is. The interesting
engineering is in *how* the proxy absorbs those differences, which is the rest of
this post.

## What it does

```
┌────────────────┐   OpenAI-shaped    ┌───────────────┐   Anthropic-shaped   ┌──────────────────┐
│ OpenAI client  │ ─ POST /v1/chat/ ─▶│  llm-batcher  │ ─ POST /v1/messages ▶│  Anthropic API   │
│ (SDK, curl,    │   completions      │  (translates  │                      │  (Claude models) │
│  LangChain…)   │◀─ chat.completion ─│   both ways)  │◀─ messages response ─│                  │
└────────────────┘                    └───────────────┘                      └──────────────────┘
```

Concretely, the proxy:

1. **Accepts an OpenAI `POST /v1/chat/completions` request**, the de-facto shape
   nearly every LLM tool already emits.
2. **Translates it to Anthropic's Messages format** (the two contracts differ in
   subtle, important ways; more below).
3. **Forwards it** to `https://api.anthropic.com/v1/messages` over async httpx, with a
   timeout and proper error propagation.
4. **Translates Claude's response back** into the OpenAI `chat.completion` shape,
   including `usage` token counts and a mapped `finish_reason`, so the caller never
   knows it wasn't talking to OpenAI.
5. Exposes **`GET /health`** for liveness checks (the SRE in me refuses to ship a
   service without one).

## The interesting part: the two APIs are *almost* the same

This is the kind of detail that looks trivial until you wire it up. OpenAI and
Anthropic both do "chat," but the contracts diverge in ways that *will* bite you.

### 1. The system prompt lives in a different place

OpenAI carries the system prompt as a *message* with `role: "system"` inside the
`messages` array. Anthropic does **not** allow a `system` role inside `messages`. The
system prompt is a **top-level field**. So the translator has to lift every `system`
message out of the array and join them into the top-level `system` field:

```python
def _to_anthropic_payload(req: ChatCompletionRequest) -> dict[str, Any]:
    system_parts: list[str] = []
    messages: list[dict[str, str]] = []
    for m in req.messages:
        if m.role == "system":
            system_parts.append(m.content)
        else:
            role = "assistant" if m.role == "assistant" else "user"
            messages.append({"role": role, "content": m.content})

    if not messages:
        raise HTTPException(status_code=400,
                            detail="At least one non-system message is required.")

    payload = {
        "model": req.model or DEFAULT_MODEL,
        "max_tokens": req.max_tokens or DEFAULT_MAX_TOKENS,
        "messages": messages,
    }
    if system_parts:
        payload["system"] = "\n\n".join(system_parts)
    return payload
```

### 2. `max_tokens` is optional in OpenAI but **required** in Anthropic

Forward an OpenAI request that omits `max_tokens` and Anthropic rejects it. The proxy
defaults it (`DEFAULT_MAX_TOKENS`, env-configurable) so callers don't have to care.

### 3. The response envelope is shaped differently

Anthropic returns content as a list of typed blocks with its own stop-reason and
usage names. OpenAI clients expect `choices[].message.content`, a `finish_reason`, and
`usage` keyed as `prompt_tokens` / `completion_tokens` / `total_tokens`. The translator
flattens the blocks, maps the stop reason, and renames the usage fields:

```python
def _to_openai_response(anthropic_json, model):
    text = "".join(b.get("text", "")
                   for b in anthropic_json.get("content", [])
                   if b.get("type") == "text")
    stop = anthropic_json.get("stop_reason")
    finish_reason = "stop" if stop in ("end_turn", "stop_sequence") else "length"
    usage = anthropic_json.get("usage", {})
    pt, ct = usage.get("input_tokens", 0), usage.get("output_tokens", 0)
    return {
        "id": "chatcmpl-" + uuid.uuid4().hex,
        "object": "chat.completion",
        "created": int(time.time()),
        "model": model,
        "choices": [{"index": 0,
                     "message": {"role": "assistant", "content": text},
                     "finish_reason": finish_reason}],
        "usage": {"prompt_tokens": pt, "completion_tokens": ct,
                  "total_tokens": pt + ct},
    }
```

### 4. Auth and versioning headers differ

OpenAI uses `Authorization: Bearer <key>`. Anthropic uses a custom header pair, and
forgetting `anthropic-version` is a classic first-time 400:

```python
headers = {
    "x-api-key": api_key,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
}
```

Pinning the version in one place means I never chase that bug across call sites.

## Engineering choices (and the SRE reasoning behind them)

**Async all the way down (`httpx.AsyncClient`).** A proxy's whole job is to wait on an
upstream. Blocking I/O would cap concurrency at the worker count; async lets one
process hold thousands of in-flight requests cheaply, which matters enormously once
batching enters the picture, because batching is *literally* "hold requests and wait."

**Timeouts and explicit error mapping.** Every upstream call has a timeout. Network
failures become `502 Bad Gateway`; a missing key becomes a clear `500` with a human
message; Anthropic's own errors are propagated with their status code. No silent hangs,
no leaked stack traces. That's the difference between "works on my laptop" and "survives a
bad afternoon in prod."

**Config via environment, secrets via `.env` (git-ignored).** `ANTHROPIC_API_KEY`,
`DEFAULT_MODEL`, `DEFAULT_MAX_TOKENS`, and `REQUEST_TIMEOUT_S` are all env-driven. The
repo ships a `.env.example` and a `.gitignore` that keeps real keys out of version
control, verified before I made the repo public.

**Pydantic v2 request models.** Incoming requests validate against a typed schema, so
malformed input fails fast with a 422 instead of exploding three layers deep.

## Testing without spending a cent (or leaking a key)

I wanted a suite that runs in CI with **no API key and no network**, because tests
that hit the real API are slow, flaky, and cost money, and a key in CI is a key that
can leak. So the upstream Anthropic call is **mocked** and the deterministic
translation logic is tested directly. Five tests cover:

1. System-message lifting into the top-level `system` field
2. Rejecting a request with no non-system message
3. Response-shape translation (content flattening, `finish_reason`, token math)
4. A full **mocked round-trip** through the FastAPI endpoint
5. The `/health` endpoint

```
$ pytest -q
.....                                                    [100%]
5 passed in 1.53s
```

There's also a `tests/smoke.sh` for a live round-trip once you drop in a real key, but
it's never required for the suite to pass.

## Try it yourself

```bash
git clone https://github.com/NeverTheSame/llm-batcher
cd llm-batcher

python3 -m venv venv
./venv/bin/pip install -r requirements.txt

cp .env.example .env          # then paste your ANTHROPIC_API_KEY
./venv/bin/uvicorn app.main:app --reload --port 8000
```

Now talk to Claude using an **OpenAI-shaped** request:

```bash
curl -sS -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-haiku-latest",
    "messages": [
      {"role": "system", "content": "You are terse."},
      {"role": "user", "content": "Reply with exactly: pong"}
    ],
    "max_tokens": 16
  }'
```

Or run it in a container:

```bash
docker compose up --build
```

## Where it's going

Today it's a pass-through. The name, `llm-batcher`, is a promise about the next
bricks: **request batching** (accumulate concurrent requests into one upstream window),
a **cost & latency observatory** (per-request p50/p95/p99 and a dollar estimate),
**backpressure and concurrency caps** (graceful degradation under load), and a
**benchmark harness** to put throughput-vs-latency-vs-cost numbers on the table.

The point isn't to build a production gateway; those exist. The point is to
demonstrate, in public, that I think about LLM serving the way an inference engineer
does: in terms of tail latency, fleet efficiency, and dollars per million tokens, not
model accuracy.

**Repo:** [github.com/NeverTheSame/llm-batcher](https://github.com/NeverTheSame/llm-batcher).
Follow along to watch a reverse proxy turn into an inference-serving primitive.
