---
title: "Fire the Manager Agent: What DeLM Gets Right About Parallel Coding Agents"
author: Kirill Kuklin
date: 2026-10-10
category: ai
layout: post
tags:
  - ai-agents
  - multi-agent
  - claude-code
  - codex
  - platform-engineering
excerpt: >
  Most multi-agent coding setups spend a big chunk of their time waiting on a
  "manager" agent. DeLM removes the manager, lets agents share a notebook and a
  to-do list, and gets faster and more accurate. It also costs more per task.
---

Run four coding agents in parallel and you'd expect roughly four times the
throughput. On one benchmark task, Claude Code with its native subagents spent
**44% of all agent time waiting**, and the main agent spent 73% of its time
waiting on the agents it had delegated to.

That number is from [DeLM](https://yuzhenmao.github.io/DeLM/) (Decentralized
Language Models), a June paper from Mao, Gu, Chauhan, Zhang, Kang and Mirhoseini
([arXiv 2606.10662](https://arxiv.org/abs/2606.10662)). What's new this month is
that it shipped as a [plugin for Claude Code and
Codex](https://github.com/Decentralized-LM/delm-agent-plugin), so you can try it
on your own repo.

## The problem has a name: bubbles

The authors borrow a term from pipeline parallelism. A **bubble** is agent time
that doesn't move the solution forward. They find three kinds, one per common
design:

| Design | How it wastes time |
|---|---|
| Independent agents | Redundant work: each agent rediscovers the same faults and dead ends |
| Agents that talk in rounds | Barrier waits: every round lasts as long as the slowest agent |
| One main agent + subagents | Relay waits: the main agent idles, subagents can't see each other's progress |

The third one is what most of us run today. **The main agent is a manager who
holds every meeting and passes every message.** Everyone else waits for it.

## The fix: a shared notebook and a to-do list

DeLM removes the main agent. In its place are two shared structures:

```
            +-------------------+
            |    task queue     |   open / claimed / done, and by whom
            +-------------------+
              ^   |       ^   |
       claim  |   v       |   v   add tasks
          +-------+     +-------+
          |agent 1| ... |agent n|   own session, own workspace
          +-------+     +-------+
              |   ^       |   ^
      publish v   | read  v   |
            +-------------------+
            |  shared context   |   short "gists" + files by reference
            +-------------------+
```

- **Task queue.** Any agent can add a task or claim an open one, and the first
  claim wins. Everyone sees who owns what.
- **Shared context.** Agents publish short findings as soon as they're usable,
  including failed approaches. Fixes are appended as new entries, not overwrites,
  so a peer can pick up the latest version of a file.

**No one is in charge.** Agents notice overlap themselves.
In one logged run, agent 1 saw that agent 3 had just claimed the same
five-parameter tuning job, killed its own process and moved on.

The shared context stayed **under 15K tokens** at task end, and reading it cost between 1.69% and 17.68% of the task's spend.

## The numbers

They tested on four coding benchmarks, with Claude Opus 5.5 inside Claude Code
and GPT-6-Astra inside Codex. On 10 long tasks from Terminal-Bench 4.0 (the
researchers' figures):

| Setup | Accuracy | Time | Cost per task |
|---|---|---|---|
| Claude Code, Opus 5.5 | 81.67% | 130.75 min | $20.31 |
| DeLM, 2 agents | **93.33%** | 64.77 min | $17.91 |
| DeLM, 4 agents | 89.17% | 52.51 min | $29.98 |
| Codex, GPT-6-Astra | 71.67% | 26.91 min | $9.01 |
| DeLM, 2 agents | **85.00%** | 17.47 min | $13.65 |
| DeLM, 4 agents | 81.67% | 13.16 min | $23.90 |

Two details I'd point at in a design review:

- **Native subagents can make things worse.** On DeepSWE, Claude Code with its
  own subagents dropped from 71.67% to 50.00%. DeLM with 4 agents hit 90.83%.
- **Accuracy is honest.** Each agent produces a full solution, and the README
  says accuracy "averages independently graded agent submissions; it is not
  best-of-n success." No cherry-picking the best of four.

## The catch: the bill and the sample

The page's headline cost is **cost per submission**, which divides the task cost
by the number of agents. You ship one change, not four, so the number that hits
your invoice is cost per task. On Codex with 4 agents that's $23.90 versus
$9.01, about 2.65x more for 2.05x faster.

Three more things before you roll it out:

- **The benchmark picked long tasks on purpose.** Each set is 10 tasks that took
  plain Codex 15 to 60 minutes (Terminal-Bench) or 10+ minutes (DeepSWE). Short
  tasks have little to parallelize.
- **The spread is wide.** DeLM with 2 agents on Codex is 85.00% plus or minus
  13.23. Ten tasks is a small sample.
- **More agents isn't always better.** Two agents beat four on accuracy in both
  Terminal-Bench rows. The plugin defaults to two.

The plugin itself is early: macOS only, two agents in private copies of your
project, projects under 10 GB, a 30-minute default run. It merges compatible
edits and keeps conflicts for you to resolve.

## Where I'd use it in IT operations

The paper only measures coding benchmarks. These two are my extrapolation, and
I picked them because they match the shape where DeLM won: long work that splits
into parts, with lots of shared dead ends.

**1. A platform migration across many services.** Say you're moving a dozen
services off a deprecated runtime or bumping a shared framework. Put one task per
service in the queue. The first agent to learn that "the Alpine base image breaks
the native module" or "this test is flaky under the new version" writes it to the
shared context, and the other agents skip that hour. That's the same pattern as
the paper's best trace: one agent built a whole system in 27.0 minutes, four
agents building parts in parallel finished in **7.5 minutes**.

**2. Incident investigation and postmortem prep.** Turn each hypothesis into a
task: the last deploy diff, a dependency upgrade, capacity, a config change.
Agents claim one each with read-only access and post findings like "ruled out:
database connections were flat 14:00 to 14:20" to the shared context. Nobody
greps the same logs twice, and nobody waits for a coordinator to relay results.
Keep a human approving any fix, and add one final step that merges the findings
into a single timeline, because here you want one answer, not four.

## What to take away

- **Measure the bubbles first.** Check how much agent time is spent waiting
  before you add more agents.
- **A shared queue plus a shared notebook beat a manager agent** on these
  benchmarks: up to 17.5 points more accurate and up to 2.49x faster.
- **Budget by cost per task, not per submission.** Faster can mean 2 to 3 times
  the spend.
- **Start with two agents on a long, splittable job**, like a multi-service
  upgrade, and compare against your normal run.
- The [paper](https://arxiv.org/abs/2606.10662), [code](https://github.com/yuzhenmao/DeLM)
  and all 720 agent runs are public, so you can check the claims yourself.

If you're already putting a proxy in front of your models, this is one more
reason to log cost per task: I wrote about measuring that in
[Why I Benchmark a Proxy That Already Works]({{ '/ai/2026-06-08-why-benchmark-llm-proxy.html' | relative_url }}).
