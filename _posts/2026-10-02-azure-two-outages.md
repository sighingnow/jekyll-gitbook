---
title: "Azure Went Down Twice in 40 Hours. Your LLM Lives in One Region."
author: Kirill Kuklin
date: 2026-10-02
category: sre
layout: post
tags:
  - azure
  - outages
  - azure-openai
  - failover
  - incident-response
excerpt: >
  Between Sep 29 and Oct 1, Azure had two separate outages: AI services in one
  region, then network gateways in 18. Neither was exotic, and both are a good
  excuse to find out what your system does when its one region goes quiet.
---

Azure had two separate outages in about 40 hours this week. The first took
Azure OpenAI offline in one region for almost six hours. The second broke the
links between companies' own networks and Azure, in 18 regions at once.

Neither one was exotic. That's the part worth your attention.

## What happened

The best single write-up I found is
[shattered.io's breakdown](https://shattered.io/azure-outage-2-incidents-18-regions-2026/),
which stitches together Microsoft's status-page notices.
[The Register](https://www.theregister.com/off-prem/2026/10/01/azure-maintenance-mess-disrupted-hybrid-clouds-vpns-cloudy-vmware-services/5300333)
covered the second incident too. The short version:

| | Incident 1 | Incident 2 |
|---|---|---|
| When (UTC) | Sep 29, 10:00 to ~15:58 | Sep 30, 20:30 to Oct 1, 02:15 |
| Duration | ~5h 55m | ~5h 45m (final update at 03:30) |
| Where | Sweden Central only | 18 regions |
| What broke | Azure OpenAI, AI Foundry Agent Service, Foundry Models, Cognitive Services | ExpressRoute Gateway, VPN Gateway, Azure Firewall, Application Gateway, WAF, Azure VMware Solution |
| Stated cause | Not disclosed | A "correlation" with infrastructure OS servicing, now paused |

Two details stood out. A developer on Microsoft's Q&A forum reported every
Azure OpenAI deployment in Sweden Central failing from 23:00 UTC on Sep 28,
eleven hours before the official start time. And after the gateway incident,
Microsoft said some network management components "have not recovered
automatically." Traffic came back before the ability to change anything did.

There's no full postmortem for either incident yet. **Until there is, "OS
servicing" is a correlation, not a root cause.**

## Patching is a deploy

Strip the status-page language and the gateway outage reads like this:
Microsoft was updating the operating system on the machines that run its gateway
fleet, something went wrong, and the rollout was paused once customers started
reporting broken connectivity.

That's the same shape as most big cloud outages of the last year. The article
lines them up:

- **AWS, Oct 20 2025:** a latent defect in DynamoDB's automated DNS management.
- **Azure Front Door, Oct 29 2025:** a bad configuration change rolled out,
  passed health checks, and even overwrote the "last known good" snapshot.
  8h 24m.
- **Cloudflare, Nov 18 2025:** a database permissions change doubled the size of
  a feature file and crashed the software reading it.

None of these started with a dead disk or a data center losing power. **They
started with a routine change that passed every check and still broke
production.** I treat OS patches, config pushes and permission changes the same
way I treat a code deploy: staged, watched, and with a rollback that doesn't
depend on the thing you just changed. Hyperscalers know this better than anyone.
It still got through.

You can't fix Microsoft's rollout process. You can decide how much of your
system stops when it fails.

## Your LLM lives in one region

The Sweden Central incident is the one I keep thinking about, because it hit the
stack everyone is rushing to production: model endpoints and the agent service.

Plenty of European teams picked Sweden Central on purpose, for data residency.
That choice has a cost the outage made visible: **if your compliance rules pin
you to one region, there is no same-provider failover.** You can't quietly fall
back to a US region without breaking the promise you made to your customers.

So the useful question isn't "is Azure OpenAI reliable?" It's "what does my
product do when the model endpoint returns 5xx for six hours?" In a lot of apps
the honest answer is: it errors, and someone opens a ticket.

The options, roughly in order of effort:

```
model call fails (5xx / timeout)
        |
        +-- retry with backoff ........... handles blips, not a 6h outage
        +-- second region, same rules .... only if your compliance allows one
        +-- second provider .............. needs a contract and a data review
        +-- degrade on purpose ........... queue the work, show a banner,
                                           turn the AI feature off cleanly
```

The last option is the one that gets skipped, and it's the one that's always
available. A feature that says "summaries are delayed, we'll email you" is a
much better six hours than a spinner.

This is also why I like having a proxy between the app and the model. In June I
put [an OpenAI-shaped proxy in front of Claude]({{ '/ai/2026-06-01-openai-compatible-proxy-for-claude.html' | relative_url }})
so an app could switch providers with a config change, and then
[taught it to watch itself]({{ '/ai/2026-06-04-llm-proxy-observability.html' | relative_url }}).
None of those posts covered failover, and after this week I think that's the
next piece it needs. The proxy sees every failure, so it's the natural place to
decide: retry, reroute, or degrade.

## The outage that doesn't look like one

The gateway incident is sneakier. It didn't touch compute or storage. It hit
ExpressRoute and VPN Gateway, the links that make a company's own network and
Azure behave like one network.

When those links drop, your cloud app can stay green on every dashboard while
the on-prem system that feeds it goes silent. **Your health checks pass because
they run on the side that's still up.**

If you run hybrid, ask three things:

1. What actually breaks on the on-prem side when the link drops? Not "does the
   app stay up", but which jobs stop, which queues grow, which reports go stale.
2. Is there a check that runs from the on-prem side and alerts when it can't
   reach Azure?
3. When the link comes back, does everything resync on its own, or does someone
   have to kick it? Microsoft's own management components needed help this time.

## Watch the status feed like a dependency

One small, practical thing from the article: Azure publishes a machine-readable
status feed. Most teams find out about provider incidents from their users.

```bash
curl -s https://rssfeed.azure.status.microsoft/en-us/status/feed/ | grep -A2 "title"
```

Pipe that into whatever already pages you, filter it to the regions and services
you actually use, and you'll stop learning about Azure incidents from Slack.

It isn't the first time this month either. On Sep 3,
[a failure in Azure's East US region disrupted ChatGPT, Claude and Grok at the same time](https://shattered.io/chatgpt-claude-grok-outage-azure-2026/),
because all three run part of their stack on Azure. Three competitors, one
shared dependency.

## What to take away

- **Two Azure outages in about 40 hours:** AI services in Sweden Central (~6h),
  then network gateways in 18 regions (~6h). No full postmortem yet.
- **Routine changes cause the big outages.** Treat patches and config pushes
  like deploys, including your own.
- **A single-region model endpoint is a single point of failure,** and
  data-residency rules can take your failover option away. Pick your degrade
  path before you need it.
- **Hybrid links fail quietly.** Monitor from the on-prem side too.
- **Subscribe to your provider's status feed** and route it into your paging,
  filtered to what you use.
