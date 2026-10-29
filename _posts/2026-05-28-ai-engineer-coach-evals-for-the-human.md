---
title: "AI Engineer Coach Is an Eval Harness — But for the Human"
author: Kirill Kuklin
date: 2026-05-28
layout: post
category: ai
tags: [ai-engineering, observability, vscode, agents, anti-patterns]
---

Microsoft quietly dropped [AI Engineer Coach](https://github.com/microsoft/AI-Engineering-Coach)
and the framing is, I think, deliberately understated. The README calls it a
dashboard that "reads your local AI session logs and turns them into actionable
insights." Which is true. It's also undersell of the year.

What it actually is: **the first piece of AI tooling I've used that runs evals
on _the engineer_ instead of the model.** No data leaves your machine. The
rules — 45 of them, across prompt quality, session hygiene, code review, tool
mastery, and context management — run locally against your VS Code session
logs and tell you, with receipts, how good (or sloppy) your agentic-coding
practice has been this week.

I've been quietly arguing some version of this for a while
([Staff AI Engineer interview](https://neverthesame.github.io/BeOps/job-interviews/2026-05-25-staff-ai-engineer-interview.html) →
"the model is a junior; the senior is whoever defines the eval"). AI Engineer
Coach takes that to its logical conclusion: the senior is also whoever
**measures themselves**.

## Three things that surprised me

### 1. It scores your AGENTS.md

There's an "instruction-file audit" pass. If your `AGENTS.md` is vague, missing,
or contradicts itself, the coach will tell you. This is the most satisfying
moment of dogfooding I've had this year, because back in August I wrote
[Agents.md ate my README](https://neverthesame.github.io/BeOps/devops/2025-08-27-agentsmd-ate-my-readme.html)
arguing that this file was about to become a standard. It is — and now Microsoft
is shipping a linter for it. Full circle 🔁.

The check is dumb-simple: does the file exist, does it cover setup / test /
style / branch policy, is it short enough that an agent will actually read it.
That's it. But "dumb-simple thing the team kept forgetting" is the whole job
description of half the SRE work I've ever done.

### 2. Anti-patterns are mostly about you, not the agent

The list reads like the worst quarterly review you'll never have to write
about yourself:

- prompting the agent without ever pasting the failure
- never reading what it changed before accepting
- 12 sessions on the same problem with no rollback
- letting context drift past the model's window because you can't be bothered
  to start a new session

This is what eval culture should have been doing for AI _users_ all along.
The model providers built evals for their own training loops. We — the
people who type into the chat — built nothing for ourselves. The coach
finally does.

### 3. "Skill Finder" turns repeated prompts into reusable skills

If you keep typing the same prompt variants ("turn this into a runbook",
"explain like I'm an on-call engineer at 2am"), it surfaces the pattern
and offers to extract it as a saved skill. This is the same instinct
behind the [Forward Deployed Engineering](https://neverthesame.github.io/BeOps/ai/2026-05-25-forward-deployed-engineering-ate-customer-success.html)
workflow: repeated bespoke work → productized tool. The coach is just doing
it for your own prompts.

## What it's not

It's not telemetry going home. The repo is MIT, the analysis is local,
and the only "share" surface is a screenshot generator if you actually
_want_ to post your stats. I ran it for three days against my Copilot CLI
sessions and the scariest finding was the number of sessions where I
accepted a change without reading it. Not the model's fault. Mine.

## Why this matters more than another agent benchmark

The industry has been measuring **models** for two years and almost
nobody for **practice**. SWE-bench, MMLU, HumanEval — fine. But none of
those tell me whether I, personally, am writing prompts that produce
working code or whether my AGENTS.md is doing its job. AI Engineer Coach
is the first widely-available answer to that question, and the fact that
it ships as a VS Code extension you can `code --install-extension`
in under a minute is probably its most underrated feature.

It also closes a loop I keep talking about: agentic engineering needs the
same observability discipline as production systems. Logs, dashboards,
anti-pattern alerts, weekly trends. We built all of that for our services.
We had built basically none of it for our own AI coding practice. Now
there's at least a starting point.

---

_Try it: clone, `npm ci && npm run package`, install the VSIX, point it
at your VS Code session folder, and look at your own anti-pattern board.
Be prepared to flinch._
