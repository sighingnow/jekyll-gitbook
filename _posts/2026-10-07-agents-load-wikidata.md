---
title: "The Agents Didn't Break In. They Just Kept Asking."
author: Kirill Kuklin
date: 2026-10-07
category: sre
layout: post
tags:
  - wikimedia
  - rate-limiting
  - observability
  - ai-agents
  - incident-response
excerpt: >
  Wikimedia says agents it believes OpenAI runs sent hundreds of thousands of
  queries to Wikidata's query service, traffic that "may have contributed" to a
  partial outage in May. The incident report is the useful part: the first rate
  limits came from a 1-in-128 traffic sample that never saw the scraper.
---

In May, half the requests to Wikidata's public query service timed out at peak.
On Oct 5, Wikimedia said traffic from agents it believes OpenAI runs "may have
contributed" to that outage.

Nobody broke in. Wikimedia found no evidence of that. This is a load story, and
load stories are the ones every on-call engineer will see again.

## What Wikimedia says

The source is
[Wikimedia's post on Diff](https://diff.wikimedia.org/2026/10/05/openai-rogue-agent-activities-found-on-wikimedia-projects/),
signed by Selena Deckelmann, the Foundation's chief product and technology
officer. In short, agents "we believe to be operated by OpenAI":

- made **millions** of automated requests to Wikimedia's public APIs and crawled
  millions of pages, mainly on Wikidata and Commons;
- sent **hundreds of thousands** of queries to the Wikidata Query Service
  (WDQS, a public database anyone can run queries against);
- edited the configuration of a citation tool in a way Wikimedia believes was
  meant to turn it into a proxy (a relay that fetches other sites for you);
- tried, and failed, to compromise Wikimedia's public Etherpad and use it as a
  proxy too.

Wikimedia found no sign of agents coordinating through its systems, and no sign
of its systems or data being compromised. The post says OpenAI "admits to agents
behaving 'unpredictably'", without a link. OpenAI's only on-record reply I found
came through Reuters, which I couldn't open, so I read it second-hand in
[The Next Web](https://thenextweb.com/news/wikimedia-openai-agents-wiki-edits-wikidata-outage):
"We'll continue to share relevant information as that work progresses."

**Wikimedia's own wording is "may have contributed", and I'm keeping it that
way.** The rest of this post is about the outage itself, not about blame.

## Nearly four days, by the incident report

The post links its outage sentence to
[Wikimedia's incident report](https://wikitech.wikimedia.org/wiki/Incidents/2026-05-13_wdqs).
That report names no one. It says "aggressive scrapers". Here is the timeline
(UTC), trimmed:

| When | What happened |
|---|---|
| May 7, 15:10 | Outage begins. Aggressive scrapers hit WDQS. |
| May 8, 09:52 | The team finds its own index updater being throttled. |
| May 8, 18:32 | Rate limits on suspected clients, picked from the sampled data. It helps, but the outage runs through the weekend. |
| May 11, 09:11 | The sample "does not report traffic accurately enough". An engineer reads the logs on the servers themselves. |
| May 11, 13:50 | Outage ends. What fixed it was a rule aimed at a scraper the sample had missed. |
| May 11, 16:40 | The emergency rules that had hit legitimate users are lifted. |

At peak, 50% of requests to the public endpoint were timing out, and 6 servers
served data more than 20 hours stale.

**The report never says whose scraper the sample missed, so I won't either.**

## Your sample can't rate-limit what it can't see

This is the line from the report I'd pin above every on-call desk. The first
rate limits were "extrapolated from a Turnilo data cube based on a 1-in-128
sample of all incoming web requests across Wikimedia projects." Turnilo is the
dashboard; the data behind it keeps one request in 128.

Sampling is the right tool for the big picture. It is the wrong tool for finding
one client. A client that hammers one expensive endpoint can still be a rounding
error across the whole fleet, and an estimate built from 1 in 128 can miss it
entirely. The report doesn't say why it was missed here, only that it was.

```
all requests --> 1-in-128 sample --> dashboard --> rate-limit rules
                                     (scraper not in it)

all requests --> raw logs on the WDQS servers --> scraper found, May 11
```

Wikimedia's own conclusion: "we cannot rely only on Turnilo (webrequest sample)
to extrapolate actors that need rate limits." **Keep a way to count every client
on your most expensive endpoints, not just a sample of them.** It doesn't have
to be fancy. On the server itself, during an incident:

```bash
# Who is sending the most requests right now? Raw log, no sampling.
tail -n 200000 /var/log/nginx/access.log \
  | awk -F'"' '{print $6}' | sort | uniq -c | sort -rn | head -10
```

That counts User-Agents in the standard nginx log format. Swap the field for
client IP or API key if that's what identifies callers on your side. Last week
I wrote about [Azure going down twice in 40 hours]({{ '/sre/2026-10-02-azure-two-outages.html' | relative_url }}),
where health checks stayed green because they ran on the side that was still up.
Same family of problem: your monitoring describes the traffic you expected.

## The flood throttled their own updates

The quieter failure in the report: the overloaded database also throttled the
service that keeps its index fresh. Index updates got rejected with HTTP 429
("too many requests"), lag grew, and that in turn slowed down edits on
wikidata.org itself.

So the public saw timeouts, and the data behind the answers that did come back
went stale. The follow-up is plain: the updater "should not be throttled by
Blazegraph filter logic." (Blazegraph is the database behind WDQS.)

**If your rate limiter can't tell your own write path from the flood, you end up
throttling yourself.** Give internal traffic its own lane, and check it under
load, not just on a quiet day.

## Give agents a name and a budget

Wikimedia's ask of AI companies is modest: systems that "non-profit website
owners like us can easily identify, and choose how they interact with our
services." The post also repeats the Foundation's 2025 figures: bandwidth up 50%
from bot activity since 2024, and 65% of the most resource-heavy traffic coming
from bots.

Wikimedia already has a rule for this. Its
[User-Agent policy](https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_User-Agent_Policy)
(the name a client sends with every request) asks for
`<client name>/<version> (<contact information>)`, suggests putting "bot" in
the string, and says a bot that copies a browser's User-Agent "will be assumed
malicious". Empty or generic ones get a 403.

That gives you something to sort traffic by. My version for any public API:

| Traffic | How you tell | Budget |
|---|---|---|
| People in browsers | Normal browser behavior, sessions | The default |
| Declared bots and agents | Named User-Agent with contact info | Its own bucket, capped per operator |
| Undeclared automation | Generic or copied User-Agent, bot behavior | The tightest limit, first to be cut |

The point is the separate bucket. **When an agent operator misbehaves, you want
to slow down that operator, not everyone.**

## Every URL-fetching feature is a proxy

Two of Wikimedia's findings weren't about volume at all. A citation tool and a
note-taking tool both fetch things from the web, and agents tried to use both to
fetch other sites through Wikimedia.

**If your service fetches a URL because a user gave it one, it's a proxy,
whether you meant it to be or not.** Agents will find those; these ones tried two. List
every feature that does it (link previews, imports, webhooks, citation helpers),
then for each one: limit where it can fetch, rate-limit it per caller, and log
who asked.

## If you're the one running agents

The other side of the same checklist, and it's short. Send a User-Agent with your
name and a way to reach you. Cap requests per site. Back off when a site sends
429s. The post names "the difficulty and effort involved in investigating and
attributing this activity" as a cost Wikimedia carried. A clear name makes that
cost close to zero.

## What to take away

- **Wikimedia says OpenAI agents' traffic "may have contributed"** to a partial
  WDQS outage in May (May 7 to May 11). Its incident report names no one.
- **A 1-in-128 sample missed the scraper.** Raw server logs found it. Keep an
  unsampled per-client count on your expensive endpoints.
- **Keep your own write path out of the throttle,** or an overload makes your
  data stale too.
- **Give declared agents their own rate budget,** and make undeclared ones pay
  the most.
- **Treat every URL-fetching feature as a proxy:** limit where it can go, and log
  who asked.

## Also this week

Three stories, one thread: agents and the tools around them are moving faster than the checks on them.

- [MCP Is Open. The Servers Aren't.]({{ '/ai/2026-10-07-mcp-open-servers-not.html' | relative_url }}): an open protocol, with servers that pick which agents get in.
- [Strata Is Fast. Nobody Has Shown It's Right Yet.]({{ '/ai/2026-10-07-strata-speed-vs-quality.html' | relative_url }}): a speed claim that reproduces, and an accuracy claim nobody has measured on your task.
