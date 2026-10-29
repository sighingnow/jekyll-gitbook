---
title: "I Taught My LLM Proxy to Watch Itself"
author: Kirill Kuklin
date: 2026-06-04
category: ai
layout: post
tags:
  - llm-ops
  - inference
  - observability
  - finops
  - sre
excerpt: >
  A proxy that translates and batches requests is still a black box until it can
  answer two questions about itself: how fast is it, and what is it costing me? So
  I added a cost and latency observatory: per-request p50/p95/p99, token
  accounting, and an estimated dollar figure, exposed as an opt-in JSON snapshot
  at GET /metrics. Here is the metrics stack I deliberately did NOT use, the
  nearest-rank percentile math, and the unpriced bucket that refuses to lie about
  spend.
---

Two posts ago I put [an OpenAI-shaped proxy in front of Claude]({{ '/ai/2026-06-01-openai-compatible-proxy-for-claude.html' | relative_url }}),
and one post ago I [taught it to wait on purpose]({{ '/ai/2026-06-03-microbatching-llm-proxy.html' | relative_url }})
so concurrent requests get grouped into admission windows instead of stampeding
the upstream. That microbatching post ended with a promise: the next brick is a
cost and latency observatory, so the tail latency I keep talking about stops
being a claim and starts being a graph. This post builds that brick.

The honest problem up front: **a proxy that translates and batches is still a
black box until it can answer two questions about itself, how fast is it and what
is it costing me.** Both of the things it already does are claims about behavior
under load, and until now there was no way to check either one.

I also built a small interactive dashboard of the metrics surface, which makes
the shape click faster than the JSON does:
**[observability.html on GitHub Pages](https://neverthesame.github.io/llm-batcher/observability.html)**
(open it in a browser to see the percentiles and the cost breakdown laid out).

## You cannot tune what you cannot see

The proxy translates between the OpenAI and Anthropic shapes, and it can group
concurrent requests into a short window before fanning them out. Did windowing
actually smooth the upstream call rate? Did it add latency, and if so how much,
and to which requests? How much am I spending per thousand requests, and on which
models? Right now those are all shrugs.

Without measurement, the next two roadmap items, backpressure tuning and a
benchmark harness, are guesswork. Observability is the dependency that unblocks
them. So this increment is deliberately the cheapest thing that produces the data
those steps need, and nothing more.

## The metrics stack I rejected, and why

The obvious move is to reach for a real metrics stack: a Prometheus client
library, a `/metrics` endpoint in the text exposition format, histograms with
predefined buckets, a scrape config. That is the correct answer for a production
fleet, and the wrong answer here, for three reasons.

1. It adds a dependency and a serving format whose value only appears once there
   is a Prometheus server, a Grafana instance, and a multi-host deployment to
   aggregate. None of that exists in a single-process learning proxy.
2. Prometheus histograms commit you to fixed buckets up front. For a quick look
   at "what is my p95 right now," a bounded ring buffer of raw samples is more
   honest and easier to reason about than bucket boundaries chosen blind.
3. The interesting engineering here is not "wire up a library." It is the set of
   small correctness decisions a metrics layer quietly gets wrong: percentile
   method, unknown-model cost handling, where latency is measured relative to
   batching, and how errors are accounted. A hand-rolled registry forces each of
   those into the open.

So the design is an in-process registry with a JSON snapshot. It is explicitly
not durable, not multi-worker, and not a substitute for a real metrics pipeline.
It is the measurement you need to make the next tuning decision, and it states
its own limits. (This is the same instinct I described in a [Staff AI Engineer
interview]({{ '/job-interviews/2026-05-25-staff-ai-engineer-interview.html' | relative_url }}):
less model magic, more boring serving engineering.)

## What real systems do, in miniature

The shape of this feature is borrowed from patterns that show up everywhere once
you start measuring latency-sensitive services.

- **Tail latency over averages.** The canonical argument is Dean and Barroso, "The
  Tail at Scale." The mean latency of a service is nearly useless because a small
  fraction of slow requests dominates the experience, especially when one user
  action fans out into many backend calls. Report percentiles, and care most
  about p95, p99, and the max, not the average.
- **Quantile estimation on a stream.** Systems that cannot store every sample use
  streaming quantile sketches (t-digest, HdrHistogram, DDSketch, Prometheus
  summaries). They trade a little accuracy for bounded memory. A bounded ring
  buffer is the simplest member of that family: it keeps exact samples for a
  recent window and is exact for that window by definition.
- **Cost as a first-class metric.** FinOps practice treats spend like latency,
  something you attribute per request, per model, per tenant, then watch over
  time. Token-based pricing makes this tractable because the upstream hands you
  the exact billable quantity, input and output tokens, in every response.
- **RED and USE.** Tom Wilkie's RED method (rate, errors, duration) and Brendan
  Gregg's USE method (utilization, saturation, errors) are the standard checklists
  for a request-serving system. This snapshot is a small RED surface: request rate
  (counts), errors, and duration (percentiles), plus the cost dimension that LLM
  serving adds on top.

## Three ideas that hold the whole thing up

**Percentiles by the nearest-rank method.** A percentile answers "what latency is
this request faster than p percent of the recent window." There are several
defensible definitions; this uses nearest-rank on the sorted window. For a window
of `n` ascending samples, the rank for percentile `p` is
`round(p/100 * (n - 1))`, clamped into `[0, n - 1]`. That makes p100 the max, and
makes every percentile of a single sample equal to that sample, with no
interpolation and no off-by-one at the edges. The cost is one sort per snapshot
call, which is fine because the window is bounded.

**A bounded window, not all-time.** All-time percentiles drift. A service that was
slow at startup and fast since then reports a misleadingly high p99 forever. A
bounded window, the last `METRICS_LATENCY_WINDOW` samples, reports recent behavior,
which is what you act on. The tradeoff is that a quiet service shows stale samples
until new traffic rolls them out. For a tuning tool, that is the right tradeoff.

**Cost is an estimate, and it says so.** The upstream reports exact token counts,
so the only source of error in the dollar figure is the pricing table, which is
static and maintained by hand. The dangerous failure mode is a model that is not
in the table silently contributing zero dollars, which makes spend look lower than
it is. The registry refuses that: unknown-model usage goes into a separate
`unpriced` bucket, never folded into the priced totals, and an `estimate_complete`
flag flips to false whenever any unpriced traffic exists. A wrong-but-confident
number is worse than a right-but-incomplete one.

## Walking through the code

The feature is one module, `app/metrics.py`, plus a few lines of wiring in
`app/main.py`.

### Pricing lookup with family matching

Model names arrive with version or date suffixes (`claude-3-5-haiku-latest`,
`claude-3-5-haiku-20241022`). The pricing table is keyed by family, and the lookup
matches the longest table key the model name starts with:

```python
def _price_for(model: str):
    name = (model or "").lower()
    best = None
    for key in PRICING_USD_PER_MTOK:
        if name.startswith(key) and (best is None or len(key) > len(best)):
            best = key
    return PRICING_USD_PER_MTOK[best] if best is not None else None
```

Longest-prefix matching means a more specific family wins over a shorter one if
one is ever added, and unknown models cleanly return `None` instead of a guess.

### The percentile helper

```python
def _percentile(sorted_values, pct):
    n = len(sorted_values)
    if n == 1:
        return sorted_values[0]
    rank = int(round((pct / 100.0) * (n - 1)))
    rank = max(0, min(n - 1, rank))
    return sorted_values[rank]
```

It assumes a non-empty ascending list. The snapshot handles the empty case by
reporting `null` percentiles and a `sample_count` of zero, so a freshly started
proxy returns a well-formed snapshot instead of dividing by nothing.

### The registry

`Metrics` holds counters, a `deque(maxlen=window)` of recent latencies, priced
token totals, a running cost, and the parallel `unpriced` accounting. Two record
methods cover the two outcomes:

- `record_success(model, input_tokens, output_tokens, latency_ms)` always bumps
  the total and success counts and appends the latency. It then either adds to the
  priced totals and cost, or, for an unknown model, adds to the unpriced bucket.
  Both paths record latency, because a slow successful call is still a data point
  even if it is unpriced.
- `record_error(latency_ms)` bumps the total and error counts and records the
  latency, but touches no token or cost state, because a failed call before the
  upstream responds has no usage to bill.

Every mutation and the whole `snapshot()` copy happen under a `threading.Lock`. On
a single event loop the synchronous record methods cannot interleave, but the lock
costs almost nothing and keeps the registry safe under the threaded test client and
any future move to worker threads. The window size is clamped on construction
(`max(1, min(window, 100000))`) so a fat-fingered env value can never make the
per-snapshot sort expensive.

### Wiring it in

`main.py` gains a `METRICS_ENABLED` flag (default off) and builds the registry in
the existing FastAPI `lifespan` only when enabled. The chat endpoint is refactored
so both the batcher path and the direct path run inside one `try/except` around a
`perf_counter` span:

```python
start = time.perf_counter()
try:
    if BATCH_ENABLED and _batcher is not None:
        anthropic_json = await _batcher.submit(payload)
    else:
        anthropic_json = await _direct_dispatch(payload)
except Exception:
    if _metrics is not None:
        _metrics.record_error((time.perf_counter() - start) * 1000.0)
    raise
latency_ms = (time.perf_counter() - start) * 1000.0
if _metrics is not None:
    usage = anthropic_json.get("usage", {})
    _metrics.record_success(model, usage.get("input_tokens", 0),
                            usage.get("output_tokens", 0), latency_ms)
```

This measures end-to-end request latency, the number the caller actually
experiences. In batch mode that span includes the admission-window wait, which is
the honest thing to report, because that wait is real latency the client paid. It
is deliberately not labeled "upstream call latency," since under batching one
upstream call can serve several logical requests, and conflating the two would
overstate per-request upstream timing.

### The endpoint

```python
@app.get("/metrics")
async def metrics():
    if not METRICS_ENABLED or _metrics is None:
        raise HTTPException(status_code=404, detail="Metrics are not enabled.")
    return _metrics.snapshot()
```

When the feature is off the route returns 404 rather than an empty object. That
keeps the default behavior identical to before the feature existed, and avoids
exposing a traffic-and-spend surface on a public proxy unless the operator opts in.

## Configuration

```bash
METRICS_ENABLED=0           # off by default; 1 enables collection and the endpoint
METRICS_LATENCY_WINDOW=1024 # recent samples kept for percentiles (clamped to 100000)
```

## Testing without a network

`tests/test_metrics.py` is fully deterministic and never touches the network. It
drives the `Metrics` class directly to assert the math, and exercises the endpoint
through the app:

- Percentile edges: a single sample, and the nearest-rank values for a known
  1..100 window (p50 is 51, p95 is 95, p99 is 99, p100 is 100).
- Pricing: family and dated-alias resolution, and `None` for unknown models.
- Cost math: a known model where one million input and one million output tokens
  produce an exact dollar figure, with `estimate_complete` true.
- Unknown model: zero priced cost, `estimate_complete` false, and the usage landing
  in the `unpriced` bucket instead of the priced totals.
- Error accounting: errors bump the error count and record latency but no tokens.
- Empty snapshot: null percentiles, zero counts, well-formed shape.
- Window clamping: zero clamps up to one, a billion clamps down to 100000.
- Endpoint: 404 by default, and after reloading the module with the flag set, a
  mocked round trip produces `total: 1`, `success: 1`, the right token total, and a
  positive estimated cost.

The default suite runs with the feature off, proving the existing realtime and
translation tests are untouched. The endpoint test reloads the module with
`METRICS_ENABLED=1` to prove the enabled path, so both modes are covered.

## Limitations, stated on purpose

- **In process, single worker.** Behind multiple workers each process has its own
  counters; a real deployment would aggregate them in a scrape target.
- **Recent window, not history.** Percentiles describe the bounded window, not
  all-time behavior.
- **Cost is an estimate from a static table.** Prices change and the table is
  updated by hand. Unknown models are surfaced, never silently zeroed.
- **No durability.** A restart resets every counter, which is correct for a tuning
  tool and wrong for billing. Billing-grade accounting belongs in the provider's
  own usage records.

## What it demonstrates

The same distributed-systems instincts from the last two posts, now pointed at
self-measurement: tail-latency thinking, a streaming-quantile primitive picked for
the actual scale, FinOps-style cost attribution, a RED surface, and the judgment to
reject the heavyweight metrics stack until it earns its place. Plus the small
refusals that keep numbers honest: the unpriced bucket, the 404 when disabled, the
clamp on the window.

**Visualization:** [observability.html](https://neverthesame.github.io/llm-batcher/observability.html) ·
**Repo:** [github.com/NeverTheSame/llm-batcher](https://github.com/NeverTheSame/llm-batcher).
With the observatory in place, the remaining roadmap items become measurable
instead of asserted. Backpressure and concurrency tuning can be judged by their
effect on p95 and the error rate, and the benchmark harness can read real
throughput, latency, and cost out of `/metrics` under load. The tail latency stops
being a claim and starts being a graph.
