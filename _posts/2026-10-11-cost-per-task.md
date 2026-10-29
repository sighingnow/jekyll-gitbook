---
title: "Budget AI by Cost per Task, Not Cost per Token"
author: Kirill Kuklin
date: 2026-10-11 09:00:00 -0700
category: ai
layout: post
tags:
  - llm-ops
  - finops
  - ai-agents
  - observability
  - opentelemetry
excerpt: >
  Same model, same accuracy, 2.86x the bill. The price per token tells you the
  rate, not what one finished piece of work costs. Here's what multiplies a task,
  why cost per submission flatters, and a simple way to log the real number.
---

Same model, same accuracy, **2.86 times the bill.** On 10 long Terminal-Bench 4.0
tasks, plain Codex on GPT-6-Astra cost $9.01 per task. Codex with its own
subagents cost $25.80. Both scored 71.67%.

Those are the researchers' numbers from the [DeLM project
page](https://yuzhenmao.github.io/DeLM/), which I wrote about yesterday in
[Fire the Manager Agent]({{ '/ai/2026-10-10-delm-shared-context-agents.html' | relative_url }}).
The price per token didn't change between those two rows. The number of tokens
it took to finish one task did.

## A price list gives you the rate

A per-token price is like a price per litre of fuel. Useful, but nobody budgets a
delivery company by the litre. They budget by the delivery.

For AI work the delivery is a **task**: one ticket triaged, one pull request
merged, one incident summary a human accepted. So the number I want on a
dashboard is this:

```
cost per task = all model and tool spend for the task, start to accepted result
cost per accepted task = total spend / tasks a human or test accepted
```

**The per-token price is the rate. Cost per accepted task is the bill.**

## Five things that multiply a task

None of these show up when you compare price lists.

| What | Why it inflates one task | Where the number comes from |
|---|---|---|
| Retries | A failed attempt still paid for every model call it made | Your own logs |
| Tool calls | Tool definitions, calls and results are all input tokens | [Claude pricing docs](https://docs.claude.com/en/docs/about-claude/pricing) |
| Long context | Every turn of an agent loop re-sends the history | Provider pricing |
| Fan-out | More agents, more parallel sessions on one task | [DeLM tables](https://yuzhenmao.github.io/DeLM/) |
| Cache hits (or misses) | Reused prefixes are billed at a fraction of input | Provider caching docs |

A few concrete ones from Anthropic's docs, fetched Oct 10:

- **Tools have a fixed tax.** Any Claude Opus 5.5 request with tools gets an
  extra 286-token system prompt, on top of your tool schemas. Server-side web
  search adds $10 per 1,000 searches on top of tokens.
- **Long prompts can change the rate.** Claude Haiku 5.5 input goes from $0.10 to
  $0.50 per million tokens once a prompt passes 100,000 tokens, and cache reads
  count toward that threshold. (Opus and Sonnet price the full 1M context window
  at the standard rate.)
- **Retries are plain multiplication.** If one task in five needs a second full
  attempt, your cost per finished task is 1.2x the cost of one attempt. That's
  arithmetic, and it stays invisible until every attempt carries the same
  task ID.

## Per submission is a flattering denominator

The DeLM tables show two cost columns: cost per task and cost per submission.
In DeLM each agent produces its own full solution, so cost per submission is the
task cost divided by the number of agents. Here's the Terminal-Bench 4.0 block for
GPT-6-Astra, with one column I added:

| Setup | Accuracy | Per task | Per submission | Per correct result (my arithmetic) |
|---|---|---|---|---|
| Codex | 71.67% | $9.01 | $9.01 | $12.57 |
| Codex + subagents | 71.67% | $25.80 | $25.80 | $36.00 |
| DeLM, 2 agents | 85.00% | $13.65 | $6.83 | $16.06 |
| DeLM, 4 agents | 81.67% | $23.90 | **$5.97** | $29.26 |

The last column is cost per task divided by accuracy: roughly what you pay for
each result that passes. It's my arithmetic on their numbers, and with 10 tasks
per benchmark and accuracy spreads of 11 to 13 points either way, treat it as a
direction, not a quote.

**Read across the DeLM 4-agent row.** $5.97 per submission looks like the cheapest
thing on the page. Per task it's $23.90, and you ship one change, not four.

The answer also flips by setup. On the same benchmark with Claude Opus 5.5,
DeLM with 2 agents cost **less** per task than plain Claude Code ($17.91 vs
$20.31) and scored higher (93.33% vs 81.67%). Fan-out isn't always more
expensive. You only find out which case you're in if you measure per task.

## Cache: cheap when it hits, quiet when it misses

From [Anthropic's prompt caching docs](https://docs.claude.com/en/docs/build-with-claude/prompt-caching):
Opus 5.5 input is $4 per million tokens, a 5-minute cache write is $5, and a
cache hit is **$0.20**, 0.05x the input price. [OpenAI's
docs](https://platform.openai.com/docs/guides/prompt-caching) list cache reads at
0.1x and cache writes at 1.25x the uncached input rate for GPT-5.6 and later.

Here's what that does to an agent loop. This is an illustration on list prices,
not a measurement: a 50,000-token prefix (system prompt, tools, repo context)
re-sent on 20 turns of one task, each within five minutes of the last.

```
no cache:   20 x 50K = 1.0M input tokens x $4.00/M         = $4.00
cached:     1 write  = 50K x $5.00/M                        = $0.25
            19 reads = 950K x $0.20/M                       = $0.19
                                                     total  = $0.44
```

Same tokens, same model, about nine times cheaper per task. A cache miss doesn't
raise an error either. In the DeLM SWE-bench Verified table, Claude Code running
Gemini 3 Flash comes in around $1 per task, and the authors' footnote explains why: the CLI sends
cache blocks in Anthropic's format, so cache reuse only works if the upstream
provider honors them. mini-SWE-agent on the same model: $0.26.

**If your cache hit rate drops, your per-token price stays the same and your cost
per task jumps.** That's the regression a token dashboard won't catch.

## A simple way to log it

Start with one ID and five numbers per model call:

```json
{"task_id": "INC-4127", "attempt": 2, "agent": "triage-1",
 "model": "claude-opus-5-5", "input_tokens": 3120, "output_tokens": 860,
 "cache_read_tokens": 48000, "cache_write_tokens": 0, "tool_fees_usd": 0.01}
{"task_id": "INC-4127", "event": "outcome", "result": "accepted"}
```

Then price each line from a table, group by `task_id`, and divide total spend by
the count of `accepted` outcomes. Weekly is enough to start.

If you already emit OpenTelemetry (OTel, the open standard for traces and
metrics), the [GenAI semantic
conventions](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/registry/attributes/gen-ai.md)
name the token fields for you: `gen_ai.usage.input_tokens`,
`gen_ai.usage.output_tokens`, `gen_ai.usage.cache_read.input_tokens` and
`gen_ai.usage.cache_write.input_tokens`. Three things to know:

- **There is no cost attribute and no task ID.** `gen_ai.conversation.id` is a
  session or thread, not a unit of work. Put your own task ID on the root span and
  compute dollars yourself.
- **Watch the double count.** Anthropic's `input_tokens` excludes cached tokens.
  The [OTel Anthropic
  mapping](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/anthropic.md)
  adds them back, so OTel's `input_tokens` includes cache reads and writes. Price
  that total at the full rate and the cache tokens again at the cache rate, and
  you've counted them twice.
- **The names are still moving.** Everything is marked Development, the
  conventions moved to their own repository, and `cache_creation` was
  [renamed to `cache_write`](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/changelog.d/440.breaking.md)
  in unreleased changes. Pin your instrumentation version.

When I added a cost estimate to my LLM (large language model) proxy, I made [unknown models land in an
"unpriced" bucket]({{ '/ai/2026-06-04-llm-proxy-observability.html' | relative_url }})
instead of counting as zero dollars. Apply the same rule to tasks: if one call
in a task has no price, the task's cost is incomplete and the report says so.
That proxy tracks tokens and estimated dollars per request, the right unit for a
proxy. For agents, the task ID is the missing piece. And as I argued in [Why I Benchmark a Proxy That Already
Works]({{ '/ai/2026-06-08-why-benchmark-llm-proxy.html' | relative_url }}),
a claim you haven't measured is a story you tell about your own code.

## What to take away

- **Budget by cost per accepted task.** Per-token prices are the rate, not the bill.
- **Never budget from cost per submission** when several agents work one task.
  Divide by what you ship.
- **Give every task an ID** and stamp it on every call, retry and sub-agent.
- **Log cache reads and writes as their own numbers**, and alert when the hit rate
  drops.
- **Measure before you add agents.** On the same benchmark, adding agents cost
  2.86x more in one setup and less in another.
