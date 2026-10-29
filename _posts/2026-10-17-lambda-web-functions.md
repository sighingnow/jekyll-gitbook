---
title: "Lambda Runs Your Express Server Now. 64 Requests Share One Process."
author: Kirill Kuklin
date: 2026-10-17
category: devops
layout: post
tags:
  - aws-lambda
  - serverless
  - nodejs
  - containers
  - finops
excerpt: >
  AWS Lambda Web Functions run your Express or Next.js server unchanged, with up
  to 128 requests sharing one environment. That shared process changes how you
  handle state, connection pools, timeouts and the bill.
---

A classic Lambda environment handles one request at a time. On Oct 12 AWS
launched Lambda Web Functions, and one environment can now hold up to 128 at
once (64 by default). Your Express, Fastify or Next.js server runs as it is.

AWS's announcement leans on the new billing. For people who run these apps, the
shared process matters more.

## What AWS shipped

The [AWS News Blog launch post](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-web-functions-for-fast-consistent-web-app-performance-anywhere/)
and the [Web Functions docs](https://docs.aws.amazon.com/lambda/latest/dg/web-functions.html)
have the details. In short, your server listens on the host and port Lambda puts in
`AWS_LAMBDA_HTTP_ENDPOINT`. One `aws lambda-web deploy` command creates the
function, an immutable revision and an HTTPS endpoint. An endpoint can split
traffic 90/10 between two revisions.

You pay for requests, the CPU time your code actively uses, and memory for as
long as the environment exists. Old Lambda functions are now called Event
Functions, which is a rename only. At launch it's Node.js 24 on Arm64, in five
Regions: N. Virginia, Ohio, Oregon, Tokyo and Ireland.

Two claims are AWS's own and come with no published numbers: a live URL "in
under a minute", and cold starts reduced "by orders of magnitude". **No AWS page
I read gives a latency figure.**

## Your globals are shared now

With Event Functions, a global variable belonged to one request at a time. Now
up to 128 requests run in the same Node.js process and interleave on one event
loop. The docs tell you to keep per-request state out of globals and to guard
any read-modify-write that spans an `await`.

```js
// Worked on Event Functions. Leaks between users on Web Functions.
let currentUser;
app.use(async (req, res, next) => {
  currentUser = await auth(req);   // another request can overwrite this
  next();
});

// Request-scoped instead.
app.use(async (req, res, next) => {
  res.locals.user = await auth(req);
  next();
});
```

The same goes for `/tmp`. It's 512 MB, shared by every request in the
environment, and it survives between requests. **Before moving an app, grep for
module-level `let` and fixed temp file names.**

## The memory math got smaller

Every environment gets 2 vCPUs and 2 GB of memory, and you can't change either.
The default V8 heap is 1,024 MB. At the default 64 concurrent requests, 2 GB works
out to about 32 MB per request; at 128, about 16 MB (my arithmetic, before the
runtime and buffers take their share).

That's fine for a JSON API. An SSR page that builds a big object tree, or a
route that buffers an upload, can hit "JavaScript heap out of memory" on a
handful of fat requests. **For memory-heavy apps, AWS's own advice is to lower
`maxConcurrencyPerEnvironment`.**

## Connection pools are back

On Event Functions every environment opens its own database connections, so
1,000 concurrent requests (the default account limit) can mean 1,000 environments
each holding connections. A Web Functions environment keeps one pool for all its
requests, like any normal web server.

So size it like one. An illustration: 640 requests in flight at 64 per
environment is 10 environments. A pool of 10 each is 100 connections, and
requests beyond 10 per environment wait for a free one, inside a 30-second
default timeout. **Size the pool per environment and cap the fleet with
`maxEnvironments` or `rateLimit`, so a burst can't take out the database.**

## One noisy request slows everyone in the room

Node runs your JavaScript on one main thread. A big synchronous JSON parse
blocks every other request in that environment, not just its own. The second
vCPU only helps if you move CPU work to `worker_threads`.

A crash is worse. All requests share one process, so if it dies, every request it
was holding goes with it, and clients see 503s. **One bad route can now fail up
to 128 requests at once.**

## Timeouts, cold starts, shutdown

- **Request timeout:** 30 seconds by default, 3 to 900 allowed. A streamed
  response that hits it gets cut off with a truncated body.
- **Startup:** your server must start listening within 10 seconds, or Lambda
  reports a listen timeout and the environment never takes traffic.
- **Cold starts:** there's no minimum or reserved environment setting. Lambda
  pre-warms some spare capacity, but it always scales from zero, and a burst
  bigger than that spare capacity waits for new environments.
- **Throttling:** at `maxEnvironments` or the account quota (2,000 Arm64 vCPUs per
  Region, so about 1,000 environments), Lambda returns 429 at once. It doesn't
  queue.
- **Shutdown:** in-flight requests finish "best-effort", then SIGTERM, then 1
  second to clean up.

**Retries need idempotency keys**, because a scale-down can end a request
halfway.

## The bill: CPU you use, memory you hold

Pricing page examples (US East, Arm): $0.0000276944 per active vCPU-second,
$0.0000036667 per GB-second, $0.30 per million requests, billed per 1 ms. Waiting
on a database barely costs CPU. Memory keeps billing while the environment
exists, idle gaps included.

AWS's I/O-heavy API example: 10 million requests a month, 200 ms each with 50 ms
of CPU, $19.61. That assumes exactly one environment running all month. Real
traffic usually runs more than one, and each one bills memory.

Now compare a container. [Fargate on Arm](https://aws.amazon.com/fargate/pricing/)
lists $0.0000089944 per vCPU-second, billed for every second the task runs, busy
or idle. The Web Functions active rate is about 3.1 times that. **If your code
keeps a vCPU busy more than about a third of the time, the container wins on
CPU list price.** That's CPU only. It ignores memory, the request fee and your
load balancer, so price your own service.

## Where it beats containers, and where it doesn't

| You need | Web Functions | Containers (Fargate, Kubernetes) |
|---|---|---|
| Language | Node.js 24 only | Anything |
| CPU type | Arm64 only, native modules too | x86 or Arm |
| Size | Fixed 2 vCPU, 2 GB | You choose |
| Quiet hours | Scales to zero | You pay for running tasks |
| Warm floor | No minimum setting | Keep N tasks up |
| WebSockets | Not supported | Up to your load balancer |
| Private inbound | Endpoint is always on the public internet | Internal load balancer |
| VPC database plus multi-region | VPC access works on single-Region endpoints only | Your design |
| Runtime patches | Automatic, can't pin | You pin the image |
| Multi-region | One command, best-effort routing | You build it |

My read: Web Functions win for I/O-bound Node.js APIs, SSR and LLM streaming
endpoints with spiky or quiet traffic, run by a team that doesn't want a
cluster. Containers still win for CPU-heavy work, steady busy traffic, anything
not Node.js, WebSockets, and private services that talk to a VPC database from
several Regions.

## What to take away

- **Audit globals and `/tmp` use** before you move anything. Shared state is now a
  cross-user bug.
- **Size connection pools per environment**, and cap the fleet with
  `maxEnvironments` or `rateLimit`.
- **Load test with real dependencies** and raise concurrency until latency or
  memory breaks. Averages hide the tail, as I wrote in [Why I Benchmark a Proxy
  That Already Works]({{ '/ai/2026-06-08-why-benchmark-llm-proxy.html' | relative_url }}).
- **Do the CPU math.** Busy more than about a third of the time favors a container.
- **Canary with your own metrics.** AWS's built-in metrics have no revision
  dimension, so log the revision ID during a 90/10 split.
