---
title: "Anthropic Moved Its Monorepo Off Git. Borrow the Ideas, Keep Git."
author: Kirill Kuklin
date: 2026-10-15
category: ai
layout: post
tags:
  - ai-agents
  - source-control
  - git
  - ci-cd
  - platform-engineering
excerpt: >
  Anthropic says its daily merges went from about 2,500 in May to over 30,000
  in September, so it moved its monorepo off git onto Scion, a system built for
  clients that never go offline. You can't use Scion, but most of its ideas work
  on stock git, and my bet is that agent-heavy teams hit the merge queue first.
---

In May 2026, Anthropic merged about 2,500 changes a day into its monorepo (one
repository that holds all the company's code). By September it was over
30,000. Git, plus several hundred internal git mirrors propping it up, could
not keep up, so a team of seven built a new version control system called
Scion and moved the monorepo onto it in five months.

**Every number in this post is Anthropic's own, from its
[engineering write-up](https://www.anthropic.com/engineering/redesigning-source-control)
published Oct 13. They are self-reported, and Scion is internal, so I haven't
run it.**

## What exactly got replaced

The post says they "fully migrated our monorepo from git." It says nothing
about other repositories, and it says plainly that Scion "is by no means a
suitable replacement for git for general use." It only makes sense, in their words, for
"truly enormous monorepos, with either tens of thousands of engineers or swarms
of agents prolifically writing code."

The scale they describe:

- main-branch history of almost 100 GB, a compressed working copy over 25 GB
- on the order of 25 million CI checkouts a day, before counting developer
  machines, agent sandboxes and research jobs
- their estimate: over 600 PB of git traffic a day if all of that were fetched
  the naive way

Git assumes every copy is a full, offline-capable repository. Anthropic used
git like most companies do, with one central copy that matters, and nearly all
their clients were agents and CI jobs that are online by definition. **The
offline design that makes git great was, in Anthropic's words, "actively
undermining" their ability to scale.**

Agents as heavy, always-on clients came up here before, in
[the Wikidata load story]({{ '/sre/2026-10-07-agents-load-wikidata.html' | relative_url }}).

## Before and after

| | Git plus mirrors (before) | Scion (after) |
|---|---|---|
| Who does the work | every client can compute history, diffs, blame locally | the server answers history, blame, diffs, merges, rebases |
| Getting code | clone or fetch packfiles (git's compressed bundles of objects), seeded from snapshots | client asks for the exact directories and files it wants, nothing else |
| Committing | commit locally, then push | commit, rebase and merge all happen on the server |
| Branches and tags | cheap and everywhere | discouraged except main and release branches |
| CI asking "what changed?" | needs a local clone | an API call, often no checkout at all |
| Merge queue | industry standard: one global lock, changes land in order | no global lock, tests after merge and before deploy |
| Infra | several hundred git mirrors | 200x smaller in CPU and memory |

The checkout path is a three-tier cache:

```
agent / CI job
     |  socket
scion-daemon     one per node, shared by every job on it
     |
scion-cache      regional, streams objects from memory
     |  only on a miss
scion-server     authoritative, reads Spanner / cloud storage
```

Every tier answers the same requests, each keeps a hit rate over 99%, and the
tiers are kept strictly in order so one failing regional cache can't flood the
servers. Anthropic says checkouts now take seconds instead of minutes, and CI
alone got a 25% CPU capacity win.

## The merge queue hits you first

You probably don't have a 100 GB repo. If you run lots of coding agents, this
paragraph still applies to you:

> We haven't been able to effectively replicate the industry standard of a
> global repository lock on the merge queue, so instead, we've invested in
> post-merge and pre-deploy automated testing. This does mean that concurrent
> changes can conflict, but Claude can typically fix these conflicts faster
> than humans can even identify them.

A merge queue is the line pull requests wait in, so each one gets tested
against the latest main before it lands. In its strictest form, with one lock
on the whole repo, changes land one at a time. When agents open pull requests
all day, the queue becomes the slowest step in delivery, and adding agents only
makes the line longer.

**Anthropic gave up the lock and catches breakage after merge, before deploy.**
My read is that this only works because they have the other half too: an
agent that fixes conflicts as they show up, and automated bisect (finding the
commit that broke things) and revert pipelines, which the post says "wouldn't
be practical at scale" without cheap API access to source control. Copy the
"no lock" part without the "automatic revert" part and main goes red more often.

What I'd look at on an ordinary team, in this order:

1. Measure time in queue separately from time in CI. If the queue wait is the
   bigger number, the queue is your bottleneck, not the tests.
2. Split CI by path, so a change to one service doesn't run every test in the
   repo.
3. Move the slow suites after merge and before deploy, but only once a bad
   merge can be found and reverted without a human.

How the agents split the work before it reaches the queue is a separate
problem, covered in
[what DeLM gets right about parallel coding agents]({{ '/ai/2026-10-10-delm-shared-context-agents.html' | relative_url }}).

## Review becomes the next queue

Seven engineers can't read every line from a fleet of agents, and Anthropic
says they don't. They "still review every change request" for Scion, but they
check the intent of the change, not every line. Their review tool also tells
comment-only changes apart from sensitive logic changes, so reviewers can focus
on "the most consequential changes."

You can get part of that today with path-based ownership rules (a CODEOWNERS
file on GitHub names who must approve changes to which directories), so the
sensitive directories always get a human and the rest get a lighter pass. Write down which paths are which before the agent volume arrives.
The post also notes the engineers' main job was often to tell Claude "no" when
it broke a system constraint to match a bad pattern. That's a review skill, and
it doesn't scale by adding more agents.

## What you can do with stock git this week

Anthropic's own suggestion is to bring "the most successful parts of Scion to
git without departing from the overall model." Most CI jobs don't need full
history or every file. Git already has two features for that:

- **partial clone**: download history but skip file contents until a command
  needs them
- **sparse checkout**: put only the directories you list on disk

```bash
# history only, file contents fetched on demand, only top-level files on disk
git clone --filter=blob:none --sparse https://git.example.com/org/mono.git
cd mono
# add just the directories this job builds
git sparse-checkout set services/payments libs/common
```

Git's own docs note that partial clone "requires that the user be online and
the origin remote ... be available." A CI runner always is, which is
Anthropic's whole premise. They also warn this gets fiddly: they used
shallow clones, sparse checkouts and mirrors for months, and history commands
like diff and blame got harder to keep working on partial clones as merges grew.

Two more ideas transfer cleanly:

| Scion idea | Ordinary-team version |
|---|---|
| Ask the server, skip the clone | If a job only needs the list of changed files, ask your git host's API (GitHub, GitLab) instead of cloning |
| Per-node daemon, regional cache | Keep a git cache or mirror on the runner host or in the region, not only at the origin |

## What to take away

- The 30,000-a-day and 200x figures are Anthropic's own and unaudited, one
  company's self-report.
- Scion replaced git for one very large monorepo. It isn't a general git
  replacement and isn't available outside Anthropic.
- My bet is that with many coding agents, the merge queue and human review
  run out of capacity before git does. Measure queue time now.
- Don't drop merge locks until a bad merge can be found and reverted
  automatically.
- Try `--filter=blob:none` plus sparse checkout on one CI job and time it.
- Anthropic expects other teams to hit this "over the next six to 12 months."
  If you're adding agents, start counting how many of your git clients are
  bots.
