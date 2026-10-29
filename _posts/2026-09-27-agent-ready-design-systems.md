---
title: "My Design System Scores Zero for AI Agents. So Do 19 of 37 Others."
author: Kirill Kuklin
date: 2026-09-27
category: ai
layout: post
tags:
  - design-systems
  - ai-agents
  - mcp
  - claude-code
  - contracts
excerpt: >
  An audit of 37 well-known design systems found that 19 score zero on its five
  agent-readiness signals, and none score five. I scored
  my own site the same way, got a zero, and the fix looks a lot more like API
  hygiene than design work.
---

An AI agent can write a decent button in seconds. The hard part now is whether
your design system can take that button back without the agent inventing a color
called `dark-blue-2` along the way.

That's the argument behind [DesignSystems.One](https://www.designsystems.one/),
a curated gallery of 120 real-world design systems built by Kiryl Zhukouski. Its
AI-ready section scores how well coding agents like Claude Code and Cursor can
use each system.

## What the site says

Their [AI-ready hub](https://www.designsystems.one/ai-ready) puts the claim in
one line: "The bottleneck moved from generation to integration." LLMs could
generate decent UI by 2023. **The open problem now is whether the design system
on the receiving end can consume that output without drift.**

They name three pillars that only work together:

- **Tokens** an agent can parse without rendering anything
- **Components** with prop shapes the agent can't violate without a type error
- **A query surface**, usually an MCP server, that the agent can hit mid-session

Then they audited 37 systems against five published signals and turned the
result into an [Agent-Ready Index](https://www.designsystems.one/ai-ready/systems),
last re-audited on 2026-09-04:

| Score (out of 5) | Systems |
|---|---|
| 0 | 19 |
| 1 | 8 |
| 2 | 7 |
| 3 | 2 (Primer, shadcn/ui) |
| 4 | 1 (Carbon) |
| 5 | 0 |

Broken down by signal, 12 of 37 ship an MCP server, 10 publish
`llms.txt`, 6 publish tokens in the W3C DTCG format, 3 ship Figma Code Connect,
and exactly 1 has a shadcn-style component registry.

## This is a contract problem wearing a design hat

Every question on their six-question checklist asks whether the consumer gets a
contract or has to guess.

My favorite line is "color.brand.500 is a guess. color.action.primary is a
contract." It's the same case I'd make for typed APIs over free-form JSON.

Same with props. Their example: `size?: string` lets the agent invent
`size='huge'`, while `size: 'sm' | 'md' | 'lg'` rejects it at type-check. **That is
input validation at the boundary.** I wouldn't let a service accept any string
for an enum field and hope the caller behaves. A design system that does exactly
that is asking to be hallucinated around.

It's the same shape I argued for in a staff AI engineer interview this year.
Every tool an agent touches gets an explicit contract. Design tokens and
component props are just more tools.

## I scored my own site and got a zero

beops.site has a small design system: one token file with 132 CSS variable
declarations across the light and dark themes, five Astro components, and a
Claude Code skill that tells the agent to use the token file and not invent
colors or font sizes. **On the index's five signals it scores 0 out of 5.** No MCP
server, no `llms.txt`, no DTCG tokens, no registry, no Code Connect. I'm in the
biggest bucket, with 19 others.

The six-question checklist is kinder, and more useful:

| Question | My site |
|---|---|
| 1. Tokens findable without Storybook? | Yes: one CSS file, and the skill points at it |
| 2. Names say meaning, not looks? | Partly: `--accent`, `--ok`, `--err` do; `--brand-brown`, `--bg-2` don't |
| 3. Components listable with exact props? | Partly: 2 of 5 declare their props |
| 4. Patterns as code, not screenshots? | Yes: HTML preview cards and JSX reference screens |
| 5. Queryable over MCP? | No |
| 6. Variants as closed unions? | Partly |

Question 6 shows up in two files that sit side by side:

```ts
// Tag.astro: a closed set. An agent can't invent a fourth kind.
interface Props { kind?: 'default' | 'live' | 'draft'; }

// Icon.astro: an open number. size={37} type-checks just fine.
interface Props { name: IconName; size?: number; stroke?: number; class?: string; }
```

The site says most teams flunk three of the six on a first audit. I flunk one
outright and half-pass three, which feels about right for a one-person site.

## Where I'd push back

**"Get all three or get none of it" is too strong for small teams.** An MCP
server is another service: something to run, version, secure and keep in sync
with the repo. For a team of five, a token file in the repo plus an instruction
file answers question 1 today with zero new infrastructure. The checklist itself
concedes this under question 5, where it lists repository files, package types
and readable docs as useful distribution paths too. They even ship CC0 templates for
`AGENTS.md`, `CLAUDE.md` and `SKILL.md`, which is the same instinct I had when
[AGENTS.md ate my README]({{ '/devops/2025-08-27-agentsmd-ate-my-readme.html' | relative_url }}).

As I said in that interview, I'm bearish on unrestricted MCP access. A read-only
design-system server is about the safest MCP server you can run, so it's a fine
first one. It still deserves the same contract as everything else.

Their audit method is the part I'd copy. They read each system's repository
tree, so absence counts as evidence, and anything they couldn't verify is marked
unknown. 48 of 185 cells are still unknown, and an unknown counts as neither a
pass nor a fail. That's how I want a dashboard to treat a missing metric.

## If I were fixing mine this month

In order of cost, cheapest first:

1. **Close the open props.** Turn `size?: number` into a union of the sizes the
   design actually uses. No new tooling, just types.
2. **Rename the appearance tokens.** `--brand-brown` tells an agent what it looks
   like, not when to use it.
3. **Publish `llms.txt`.** The index calls it the cheap race, and 10 of 37
   systems already run it.
4. **Then MCP**, once the token file is worth serving.

The same order works for a big system. It just takes longer.

If you run a design system, score it against the six questions. Mine got a zero
on the index, and most of the fixes are types.
