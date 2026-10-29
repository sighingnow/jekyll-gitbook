---
title: "Why I Benchmark a Proxy That Already Works"
author: Kirill Kuklin
date: 2026-06-08
category: ai
layout: post
tags:
  - llm-ops
  - inference
  - benchmarking
  - tail-latency
  - sre
excerpt: >
  A single-request demo of my proxy looks identical with batching on or off. The
  whole point of the feature is invisible until you put it under concurrent load
  and measure. So this post is the case for benchmarking: why a demo proves
  nothing, what numbers you only get under load, and what those numbers actually
  buy you (tuned knobs, a defensible trade, and regressions you can catch).
---

A week ago I [put an OpenAI-shaped proxy in front of Claude]({{ '/ai/2026-06-01-openai-compatible-proxy-for-claude.html' | relative_url }}),
then [taught it to wait on purpose]({{ '/ai/2026-06-03-microbatching-llm-proxy.html' | relative_url }})
so concurrent requests get grouped into admission windows instead of stampeding
the upstream. That microbatching post explained *how* the feature works. This
post is about something I kept dodging: *how do I know it actually helps?*

The honest answer is that, on my laptop, I couldn't tell. A single `curl` against
the proxy returns in the same few hundred milliseconds whether batching is on or
off. The before and after I wrote about is real, but it is **completely invisible
in a demo.** You only see it when 200 clients arrive in the same 50 ms. Which
means the only way to defend the feature, tune it, or trust it is to benchmark
it. That is the whole subject here.

The companion visualization makes the motivation concrete: the thundering herd,
then the fix.
**[batching.html on GitHub Pages](https://neverthesame.github.io/llm-batcher/batching.html)**
(open it in a browser and watch the uncoordinated spike turn into controlled
waves). A benchmark is just that picture with numbers attached.

## A demo proves nothing

Here is the uncomfortable part of shipping infrastructure: the failure mode you
built the feature to prevent does not show up in the way you naturally test it.

A demo is one request at a time. One request opens one upstream connection, waits,
returns. Batching adds a few milliseconds of deliberate delay, so in a demo the
batched path is, if anything, very slightly *slower*. Every instinct says the
feature is useless.

The feature only earns its keep under concurrency, and concurrency is exactly the
condition a casual test never reproduces. The plain proxy under 200 simultaneous
clients opens roughly 200 upstream connections at once, hits the classic
[thundering herd](https://en.wikipedia.org/wiki/Thundering_herd_problem), and has
no single place to enforce a limit. None of that is observable until you generate
the load on purpose. So "it works on my machine" is not a weak claim here, it is a
meaningless one. The machine was never asked the question the feature answers.

## What you cannot see without measuring

Three things stay hidden right up until you put real load through the proxy, and
all three are the things that actually matter in production.

**Tail latency.** Averages lie under load. The number that wakes people up is
p95 and p99, the slow tail that a handful of requests fall into when everyone is
competing for sockets, DNS, TLS handshakes, and upstream rate limits at once.
Google's [Tail at Scale](https://research.google/pubs/pub40801/) is the canonical
argument that the tail, not the mean, defines the user experience. You cannot
average your way to a p99. You have to measure it, and you only get a meaningful
one under concurrency.

**Backpressure and the value of the cap.** The microbatching layer puts a
[concurrency semaphore](https://docs.python.org/3/library/asyncio-sync.html#asyncio.Semaphore)
in front of the upstream so it never sees more than `BATCH_MAX_CONCURRENCY` calls
in flight. [Little's Law](https://en.wikipedia.org/wiki/Little%27s_law) says that
in a stable system the in-flight work `L = λ × W`: arrival rate times latency. If
upstream latency `W` spikes, a fixed cap keeps `L` bounded instead of letting
in-flight work explode. That is a lovely argument on paper. It is also untestable
on paper. The only way to show the cap turns an unbounded meltdown into a bounded
queue is to drive `λ` up and watch what happens.

**That the trade is real.** The microbatching post called this a
latency-for-stability trade: pay a few milliseconds of waiting, buy upstream
protection and predictable tails. A benchmark is what turns that sentence from a
claim into a measurement. Without one, it is just a story I am telling about my
own code.

## What benchmarking actually buys you

This is the part I care about most, because "run a load test" sounds like a chore
and is actually the highest-leverage thing you can do to a system like this.

**It tunes the knobs with evidence instead of vibes.** Microbatching exposes real
dials: `BATCH_MAX_WAIT_MS` (how long to coalesce), `BATCH_MAX_SIZE` (window size),
`BATCH_MAX_CONCURRENCY` (in-flight cap). Every one of them is a tradeoff. Bigger
wait means more coalescing and more added latency. Bigger concurrency means more
upstream parallelism and less protection. There is a knee in each of those curves,
and you cannot guess where it is. A concurrency sweep finds it. The defaults I
shipped (20 ms, size 16, concurrency 8) are starting points; a benchmark is how
they stop being starting points.

**It makes the design defensible.** "I added admission control" is a sentence
anyone can say. "Here is throughput and p99 with batching off, here it is with
batching on at concurrency 8, and here is where it stops helping" is a different
kind of claim. It is the difference between an opinion and a result, and in an
interview it is the part worth defending.

**It catches regressions.** Once a benchmark produces a number, that number is a
contract you can diff across commits. Refactor the dispatch path, rerun, compare.
A silent 30% throughput regression from an accidental `await` in the wrong place
is invisible to unit tests (the [batcher tests](https://github.com/NeverTheSame/llm-batcher)
are deterministic and run with no network, on purpose) but obvious to a benchmark.

**It keeps you honest about limits.** Measuring under load is also how you find
the things the feature does *not* fix. The windows are per process, so each worker
has its own, and there is no global queue across workers yet. There is no
queue-depth cap, so a sustained flood can still grow the pending list (returning
429/503 past a `max_pending` is the natural next increment). I know those are the
weak spots precisely because that is where a benchmark would push the system over.
Numbers tell you where to build next.

## What a benchmark for this measures

Concretely, the harness I want puts three axes on the table at once, because in
LLM serving they trade against each other and a single number hides the deal:

- **Throughput:** requests per second the proxy sustains as concurrency climbs.
- **Latency:** the full distribution, p50/p95/p99, not the average.
- **Cost:** dollars per request, since the point of a proxy in front of a paid
  API is partly economic.

The experiment is a concurrency sweep comparing `BATCH_ENABLED=0` against
`BATCH_ENABLED=1`: hold the workload fixed, raise the number of concurrent
clients, and plot all three curves for each mode. The batched line should hold its
tail flatter as concurrency rises, at the cost of a small constant latency add at
the low end. That crossover is the entire feature, drawn.

This is the pre-production twin of the work I did in the
[observability post]({{ '/ai/2026-06-04-llm-proxy-observability.html' | relative_url }}):
that one added a live `/metrics` surface so the running proxy reports its own
p50/p95/p99 and a dollar estimate. Same
[RED](https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/)
instinct, two settings. Benchmarking is how you learn the shape of the system
before it ships; the metrics endpoint is how you keep watching it after. You want
both, and they reinforce each other: the benchmark tells you what "normal" looks
like, so the production metrics can tell you when you have left it.

## What this demonstrates

The reflex to measure before believing. A demo answers "does it run." A benchmark
answers "does it do the thing I built it for, and where does it stop." Tail-latency
thinking, admission control you can prove with Little's Law instead of assert,
evidence-based tuning, regression gates, and the honesty to let the numbers mark
your limits. The feature was the easy part. Knowing it works is the job.

**Visualization:** [batching.html](https://neverthesame.github.io/llm-batcher/batching.html) ·
**Repo:** [github.com/NeverTheSame/llm-batcher](https://github.com/NeverTheSame/llm-batcher).
Next I wire the harness itself, so the curves in this post stop being a plan and
start being a chart.
