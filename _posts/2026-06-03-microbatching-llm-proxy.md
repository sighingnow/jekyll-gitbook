---
title: "I Taught My LLM Proxy to Wait on Purpose"
author: Kirill Kuklin
date: 2026-06-03
category: ai
layout: post
tags:
  - llm-ops
  - inference
  - backpressure
  - asyncio
  - sre
excerpt: >
  The plain proxy opened one upstream connection per request. That is fine for a
  demo and ugly under load. So I added microbatching: the proxy now waits a few
  milliseconds on purpose, groups concurrent requests into admission windows, and
  releases them in controlled waves behind a concurrency cap. Here's the before
  and after, the Anthropic feature I deliberately did NOT use, and the async
  footguns I had to dodge.
---

A few days ago I built [`llm-batcher`, an OpenAI-shaped proxy in front of Claude]({{ '/ai/2026-06-01-openai-compatible-proxy-for-claude.html' | relative_url }}).
It was a clean pass-through, and at the very end I left an IOU: the name promises
batching, and the proxy didn't do any yet. This post pays that IOU.

The counterintuitive part up front: **under load, the fastest thing a proxy can
do is sometimes wait.** A few milliseconds of deliberate waiting buys you
upstream protection, smoother throughput, and predictable tail latency. That
trade is the whole feature.

I also built a small interactive visualization of the window filling and
flushing, which makes the idea click faster than any paragraph:
**[batching.html on GitHub](https://neverthesame.github.io/llm-batcher/batching.html)**
(open the raw file in a browser to watch the waves).

## Before and after: 200 clients in the same 50 ms

The plain proxy does the obvious thing: every `POST /v1/chat/completions` opens
its own connection to the Anthropic Messages API and waits. Perfect for one
request at a time. Ugly the moment real concurrency shows up.

**Before (no batching).** 200 clients call you inside the same 50 ms:

- You open roughly 200 simultaneous upstream connections.
- The upstream sees an uncoordinated spike, the classic
  [thundering herd](https://en.wikipedia.org/wiki/Thundering_herd_problem).
- There is no single place to enforce a concurrency limit, a queue-depth limit,
  or any fairness policy.
- Your p95 and p99 go unpredictable, because every request fights every other
  request for sockets, DNS, TLS handshakes, and the upstream rate limit at once.

**After (microbatching on).** The same 200 requests land in an admission window,
get grouped, and go out as a coordinated wave behind a concurrency cap. The
upstream never sees more than N calls in flight. The spike becomes a shaped
flow. You pay a few milliseconds of latency and you get a system that degrades
gracefully instead of melting down.

| Under a 200-request burst | Plain proxy (before) | Microbatching (after) |
| --- | --- | --- |
| Upstream connections | ~200 at once | capped at `BATCH_MAX_CONCURRENCY` |
| Spike shape | thundering herd | controlled waves |
| Place to enforce limits | none | one dispatch choke point |
| Tail latency (p99) | unpredictable | bounded and tunable |
| Cost | one uncoordinated call per request | a few ms of intentional wait |

This is the exact gap between "works in a demo" and "survives production
traffic," and closing it is the kind of work an inference-serving team does every
day. That is why it was the right second feature.

## What it actually does

When `BATCH_ENABLED=1`, requests are not dispatched immediately. They drop into
an **admission window** that flushes when **either** trigger fires first:

1. **Size trigger:** the window reaches `BATCH_MAX_SIZE` requests, or
2. **Time trigger:** `BATCH_MAX_WAIT_MS` milliseconds pass since the first
   request entered the window.

The window then dispatches together. Each request is still its own realtime
Anthropic call, but the calls leave as a coordinated group on a **shared HTTP
client**, gated by a **semaphore** so the upstream never sees more than
`BATCH_MAX_CONCURRENCY` in flight.

```
                 admission window (size OR time)
clients ─▶ [ r1 r2 r3 ... rN ] ─▶ dispatch ─▶ semaphore(N) ─▶ Anthropic
                                                   │
                              at most BATCH_MAX_CONCURRENCY in flight
```

It is a latency-for-stability trade, and it is opt-in. Off by default, the proxy
behaves exactly as before.

## The decision I rejected (this is the actual engineering)

The roadmap line said "accumulate concurrent requests into one upstream call
window." Read literally, Anthropic ships something that looks like a perfect
match: the **Message Batches API**, which takes many requests in one call and is
50% cheaper. I did not use it here, on purpose.

The Message Batches API is an **offline, asynchronous bulk primitive**. You
submit a batch and poll for completion, with an SLA of up to **24 hours** (often
minutes, but the contract is "eventually"). Putting that behind a
**synchronous, OpenAI-compatible chat endpoint** would mean a client's
`POST /v1/chat/completions` could block for minutes. That is surprising,
timeout-prone, and wrong for a realtime API.

So the design splits into two tools for two jobs:

| Need | Right tool |
| --- | --- |
| Low-latency realtime chat under concurrency | In-process microbatching (this feature) |
| Cheap, huge, non-urgent bulk and eval jobs | Anthropic Message Batches API (a separate future endpoint) |

Picking the right primitive instead of the one that happens to share your
feature's name is the judgment call worth defending in an interview. The cheaper
API is not the correct API here.

## It's the same idea as a dozen systems you already trust

Microbatching is not exotic. It is one pattern wearing many hats:

- **Continuous batching in LLM serving.** [vLLM](https://docs.vllm.ai/en/latest/)
  and TGI batch tokens across concurrent requests to keep the GPU busy. Same
  instinct (group concurrent work), different layer (token scheduling vs request
  admission).
- **[Nagle's algorithm](https://en.wikipedia.org/wiki/Nagle%27s_algorithm) in
  TCP.** Briefly buffer small sends to coalesce them into fewer, fuller packets.
  A time-or-size window, exactly like ours.
- **Group commit** in databases and logging. Batch many writes into one fsync.
- **[DataLoader](https://github.com/graphql/dataloader) batching.** Coalesce many
  field resolutions in a tick into one backend call.

If you have ever tuned any of those, you already understand this layer. That is
the point: it is a small, honest instance of a technique that shows up
everywhere in high-throughput systems.

## Why a concurrency cap is the right lever (Little's Law)

Two ideas justify the knobs.
[Admission control](https://en.wikipedia.org/wiki/Admission_control) is the
window plus the semaphore deciding how much work is allowed downstream at once.
Backpressure is having a single dispatch point where you can push back when
overwhelmed (today via the cap and timeout; a queue-depth limit returning
429/503 is the next increment).

[Little's Law](https://en.wikipedia.org/wiki/Little%27s_law) is why the cap is
the correct dial. In a stable system, `L = λ × W`: average in-flight requests
(L) equals arrival rate (λ) times average latency (W). When upstream latency W
rises, holding L fixed with a semaphore stops in-flight work from exploding. You
trade a little queueing delay for a bounded, predictable system instead of an
unbounded meltdown. SRE instinct, pointed at an LLM upstream.

## The async footguns I had to dodge

The interesting bugs in this kind of code are all in the `asyncio` lifecycle. The
accumulator holds pending `(params, Future)` items under an `asyncio.Lock`, and
the snapshot-and-clear is atomic, but the upstream work happens **outside** the
lock so a slow dispatch never blocks new arrivals:

```python
async with self._lock:
    self._pending.append(item)
    if len(self._pending) >= self._max_batch_size:
        batch = self._take_pending_locked()                 # size trigger
    elif self._timer is None:
        self._timer = asyncio.create_task(self._timer_flush())  # arm time trigger
```

Dispatch is where three guarantees come from a handful of lines: a concurrency
cap, failure isolation, and no hangs.

```python
async def run_one(item):
    async with self._sem:                      # concurrency cap
        return await self._dispatch_one(item.params)

results = await asyncio.wait_for(              # per-window timeout
    asyncio.gather(*(run_one(it) for it in batch), return_exceptions=True),
    timeout=self._batch_timeout_s,
)
```

`return_exceptions=True` means one request blowing up does not fail its
neighbors; each `Future` gets its own result or its own error.
`asyncio.wait_for` puts a hard ceiling on a window, so a stuck batch fails every
still-pending caller instead of hanging forever. Three more traps I had to
handle explicitly:

- **Timer self-cancellation.** The size path cancels the timer, but the timer
  must never cancel itself. The timer clears its own reference under the lock
  instead of calling the shared cancel helper, avoiding a race that would drop a
  window on the floor.
- **Task garbage collection.** Background dispatch tasks are kept in a set until
  done, because the event loop will happily GC a task you don't hold a reference
  to, mid-flight. A real footgun.
- **Caller cancellation.** If a client disconnects before its window flushes,
  `submit` removes its pending item so the proxy never spends an upstream call on
  a result nobody is waiting for.

Graceful shutdown (`aclose()`) cancels the timer and fails any leftover futures,
so a shutdown never leaves a request hanging.

## Tested with no network and no key

Six deterministic tests run the batcher against an injected async fake, so
behavior is fully controllable with no API key and no network:

1. Flush by size groups into exactly one window.
2. Flush by time releases a partial window after the wait.
3. Results route back to the correct caller even when dispatch finishes out of
   order.
4. A per-item error is isolated; neighbors still succeed.
5. A stuck dispatcher trips the batch timeout and fails every caller (itself
   bounded by `wait_for` in the test, so a bug cannot hang CI).
6. Shutdown resolves any still-queued futures instead of hanging.

The original translation tests keep passing, because batching defaults to off.

## The knobs

All opt-in, all environment variables:

| Variable | Default | Meaning |
| --- | --- | --- |
| `BATCH_ENABLED` | `0` | Master switch. Off keeps the plain realtime path. |
| `BATCH_MAX_SIZE` | `16` | Flush a window once it holds this many requests. |
| `BATCH_MAX_WAIT_MS` | `20` | Max wait for a window to fill before flushing. |
| `BATCH_MAX_CONCURRENCY` | `8` | Max simultaneous in-flight upstream calls. |
| `BATCH_TIMEOUT_S` | `60` | Hard ceiling on one window's dispatch. |

Tuning intuition: bigger `BATCH_MAX_WAIT_MS` means more coalescing and more added
latency; bigger `BATCH_MAX_CONCURRENCY` means more upstream parallelism and less
protection. These are the same dials a real serving system exposes, and the
defaults favor low latency.

## Honest limitations

- **Per process.** Each worker has its own window. This protects the upstream but
  is not a single global queue across workers. On purpose, and documented.
- **No queue-depth limit yet.** A sustained flood can still grow the pending
  list. A `max_pending` returning 429/503 is the natural next increment.
- **N calls, not literally one.** This is operational batching (coordinated
  waves), not a single multiplexed upstream call. That is the correct trade for a
  realtime endpoint, and I keep the naming precise about it.

## What it demonstrates

Distributed-systems instincts pointed at LLM serving: admission control,
backpressure, concurrency limiting, failure isolation, timeout discipline, clean
async lifecycle management, and the judgment to pick the right primitive over the
literally-named one. The job, in miniature.

**Visualization:** [batching.html](https://neverthesame.github.io/llm-batcher/batching.html) ·
**Repo:** [github.com/NeverTheSame/llm-batcher](https://github.com/NeverTheSame/llm-batcher).
Next brick is the cost and latency observatory: per-request p50/p95/p99 and a
dollar estimate, so the tail latency I keep talking about stops being a claim and
starts being a graph.
