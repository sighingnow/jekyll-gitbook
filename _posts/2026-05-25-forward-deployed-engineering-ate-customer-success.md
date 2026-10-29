---
title: "Forward Deployed Engineering Ate Customer Success"
author: Kirill Kuklin
date: 2026-05-25
category: ai
layout: post
tags:
  - fde
  - forward-deployed-engineer
  - ai-careers
  - hiring
  - palantir
  - openai
excerpt: >
  Forward Deployed Engineer job postings are up ~800% YoY and the role has
  quietly become the default "ship AI into a real company" job at OpenAI,
  Anthropic, Palantir, and basically every AI lab with revenue targets.
  Here's why the hype is real, and what it actually looks like day-to-day.
---

Forward Deployed Engineer (FDE) is the role nobody had heard of two years ago and that every AI lab is now hiring 50–1000 of. Palantir invented it. OpenAI, Anthropic, Cohere, Databricks, Salesforce, and Ramp copied it. EY just spun up an entire FDE practice in the UK. Job listings are up ~800% YoY between Jan and Sep 2025 🚀.

The numbers, if you're shopping:

- Base: **$174k–$265k**
- TC at top AI startups: **$400k–$630k**
- At Palantir, FDEs are reportedly **~50% of the technical workforce**

Big if true. So what is it, actually?

## It's not a sales engineer with a laptop

An FDE is a software engineer who ships production code **inside the customer's environment**. Not a slide deck. Not a POC. A running system, wired into legacy IT, weird auth, weirder data, and a compliance team that has Opinions.

The mental model I like: **a startup CTO embedded in someone else's company for 6 months.** You own the outcome, you write the code, you eat the on-call pager when the LLM agent decides Tuesday is a great day to hallucinate invoice numbers.

It's adjacent to — but distinctly not — these roles:

- **Sales engineer** — demos and pre-sales. FDE shows up *after* the contract.
- **Solutions architect** — diagrams and guidance. FDE writes the code that backs the diagram.
- **Consultant** — bills hours, leaves a deck. FDE leaves a deployed service.
- **Customer success** — adoption metrics and QBRs. FDE owns whether the thing works in prod.

## Why now

Because the "95% of AI pilots produce no measurable ROI" stat finally made it into board decks.

Every enterprise has bought GPT seats, signed an Anthropic contract, slapped a copilot on something. Almost none of them have a working deployment. The bottleneck was never the model — it was:

- 17-year-old Oracle databases with column names like `CUST_TYP_3`
- A VPN that requires a hardware token issued by a vendor that went bankrupt in 2019
- A security review process that thinks "SaaS" means "sus"
- A data team that — fairly — won't hand over PII to a model whose system prompt is in a Notion page

You don't fix that with a better model. You fix it with **an engineer who will sit in a Teams call at 7am and rewrite the integration until it works**. That's the FDE.

## What the day actually looks like

From talking to a few FDEs at AI labs and reading the postings:

1. **Discovery week**: shadow the customer's analyst / ops person. Find the spreadsheet that runs the business. (There is always a spreadsheet that runs the business.)
2. **Prototype week**: stand up an agent / RAG pipeline / fine-tune that replaces the worst 30% of the spreadsheet. Show the analyst. They cry happy tears or tell you the prototype is wrong in 14 specific ways. Both are wins.
3. **Hardening**: auth, audit logs, eval harness, rollback plan, on-call rotation. This is the part that separates FDEs from "prompt engineers with consulting hours."
4. **Handoff or expand**: either you train the customer's team and leave, or — more often lately — the customer asks you to do the next workflow, and the next one, until you've quietly become their AI platform team.

## The skill stack

- **Python + TypeScript** — non-negotiable
- **LLM plumbing** — RAG, agent loops, tool calling, evals (Braintrust / LangSmith / homegrown)
- **Cloud + IaC** — at least one of AWS/GCP/Azure, plus Terraform or Pulumi
- **Data** — SQL, dbt, Snowflake/BigQuery/Databricks, enough Spark to be dangerous
- **Security-ish** — SSO, IAM, VPC peering, data residency, "what does SOC 2 actually require"
- **People skills** — you will get yelled at by a VP who doesn't understand why their PDF doesn't parse. Don't yell back.

The SRE/DevOps crowd is honestly well-positioned here. You already know that prod is where dreams go to die. The only new muscle is **doing it inside someone else's prod**.

## Is it durable, or just a 2026 bubble role?

My bet: durable, but the title will fragment.

In two years "FDE" will split into:

- **Deployment engineers** at the AI labs (closer to today's FDE)
- **AI platform engineers** inside enterprises (the people the labs hand off to)
- **AI-native consulting** (EY, Accenture, the new wave of boutique shops)

The work doesn't go away — enterprise integration never goes away. The label might.

## If you're considering jumping

Three honest filters:

1. **Do you like customers?** Real ones. With problems. Who interrupt you.
2. **Are you willing to write boring glue code in exchange for outsized impact and comp?**
3. **Can you context-switch between a board-level outcome conversation and a 3am `kubectl logs` session?**

If yes to all three: it's probably the best comp-per-stress-unit role in tech right now, and the moat (enterprise reality is messy) is structural.

If no to any: stay platform-side. Build the tools FDEs use. That's also a good job.

— k
