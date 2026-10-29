---
title: "LiteLLM's Release Key Was Somebody's gh Login"
author: Kirill Kuklin
date: 2026-10-28
category: devops
layout: post
tags:
  - supply-chain
  - github
  - ci-cd
  - secrets
  - litellm
excerpt: >
  A malicious litellm 1.107.0 went out through LiteLLM's own signed release
  pipeline, driven by three stolen GitHub CLI logins. The chain started with a
  master key leaked in May and never revoked, and an agent platform that handed
  an org owner's token to anyone holding that key.
---

On Oct 21, LiteLLM's real release pipeline signed and published a poisoned
`litellm==1.107.0`. Nobody broke the pipeline. The attacker logged in as three
of LiteLLM's own people, using their GitHub CLI tokens, and pressed the buttons.

**The release key was a human's `gh auth login`, and it was sitting in places
a bot could read.**

## What happened

LiteLLM published two write-ups. The
[first incident post](https://docs.litellm.ai/blog/security-incident-oct-21-2026)
was written mid-investigation. Two days later they posted the
[attack-chain post](https://docs.litellm.ai/blog/security-incident-oct-21-2026-attack-chain)
and called it "the canonical source of truth", because some earlier
assumptions "were later proven to be inaccurate or incomplete". I follow the
second one where they differ. Datadog Security Labs has the
[payload analysis](https://securitylabs.datadoghq.com/articles/litellm-compromised-pypi-docker).

What shipped:

- **PyPI:** Seven malicious wheels, uploaded 11:39:51 to 11:40:13 UTC, pulled by 13:23.
- **Docker Hub:** `v1.107.0`, `latest`, `main-latest`, `main-stable` pointed at a bad image from 11:46:56 to 14:20. GHCR tags were gone by 13:51.
- **Payload:** `cook.pth`, `cook.py` and `sitecustomize.py` dropped into `site-packages`. Python runs `.pth` files and `sitecustomize.py` on every start, so any Python process runs it. LiteLLM says that includes `pip`.

Per Datadog, litellm has about 23 million weekly downloads, and this is its
second supply chain compromise in 2026. The stealer goes after cloud keys, SSH
keys, AI coding tool sessions, browser passwords, and the tables where a
LiteLLM proxy stores upstream provider keys.

## The chain, in five hops

```
May 27  master key for an internal agent platform committed to a public repo
          (force-pushed over, never revoked)
Oct 10  attacker calls the agent platform API with that key
          GET /api/v1/managed_agents/agents  ─▶ org owner's gh CLI token
Oct 10  owner pushes throwaway ci-tmp-* branches
          their workflows post GH_TOKEN and RELEASE_PLEASE_TOKEN to webhook.site
          (both held other maintainers' personal gh tokens)
Oct 21  owner token overrides branch protection on the release repo,
          points the release at the lookalike fork Berri-AI/litellm
        maintainer #2 token approves the production gate
        maintainer #3 token deletes the run records
```

By my arithmetic the master key stayed valid for 136 days after the leak. The
owner's token went to work within the hour: 44 minutes after the API returned
it, it pushed the first exfiltration branch. The two maintainer tokens then sat
in the attacker's hands for 11 days before the release.

The agent platform was an experiment for cloud agents that open PRs. To do
that, LiteLLM says, it held a token that "was not associated with a service
account and was not scoped down". It was the owner's own GitHub CLI token. The
API that lists agent configs returned it.

**An org owner's login was stored as a bot credential, and a list endpoint
gave it away.**

## Every control was there. Every control took a human token.

LiteLLM wasn't careless about releases. After a compromise in March they moved
releases to a private repo, used trusted publishing, made Docker tags
immutable, and started signing images. Their normal flow also required a
special account locked to an office laptop to approve. Here is how each one went:

| Control | What beat it |
|---|---|
| Branch protection on the release repo | Push rejected at 10:08:29, then forced through with the owner's token at 10:08:34 |
| Release builds from the real repo | Commit `9cf97e9` let the workflow build from another repo, so it built `Berri-AI/litellm` |
| Office-laptop approver | Relaxed that week so any two engineers could trigger and approve backports |
| Two-person release | Two stolen tokens counted as two people |
| Workflow logs | The third token deleted the run records at 11:53 |
| Clean `main` history | Force-pushed back to `d687b69` at 12:24, overriding the force-push block |

Two details stung me. LiteLLM writes that GitHub CLI tokens "are post-2fa and
not subject to GitHub's 'super-user' 2fa reauth flows". Bypassing branch
protection never asked anyone to confirm anything. And the fork commit opens at
`github.com/BerriAI/litellm/commit/20535d8f`, because GitHub serves a fork's
commits through the parent repo. A reviewer clicking that link sees the real
org name.

**The build provenance named the fork, and the release shipped anyway.**
Datadog says it "faithfully recorded the malicious fork as the source".

## About the Claude Code line

You may have seen this one quoted. LiteLLM's first post says they "observed
specific situations in which Claude Code will embed a user's GitHub CLI OAuth
token into a response body", and that where response bodies are logged, the
tokens "may appear in LiteLLM logs". That post's theory was that the attacker
got into an internet-exposed internal LiteLLM deployment and read tokens from
its logs.

The attack-chain post drops that theory: "The request logs show the first token
came from a different service." It doesn't mention Claude Code at all, neither
to repeat the observation nor to retract it. So I treat it as a side
observation the canonical post doesn't revisit, not as how this attack worked.

I'd still act on it, for a reason that has nothing to do with blame. If your
LLM gateway logs full response bodies, those logs hold whatever your coding
agents print, secrets included.

## GitHub shipped expiring gh tokens the same day

Same date, no mention of LiteLLM:
[GitHub CLI can now use expiring, auto-refreshing OAuth tokens](https://github.blog/changelog/2026-10-21-github-cli-opt-in-to-expiring-auto-refreshing-oauth-tokens),
in public preview. In GitHub's words, "a leaked access token becomes unusable
within hours instead of lasting indefinitely".

```bash
gh --version                                 # needs 2.103.0+
gh auth login --expiring                     # opt in for this login
gh config set expiring_credentials enabled   # opt in for every future login
gh auth setup-git                            # let gh refresh tokens for git over HTTPS
gh auth status                               # shows when the current token expires
```

GitHub recommends git 2.46 or newer. It works on github.com and ghe.com now,
and on GitHub Enterprise Server from 3.23. They plan to make it the default for
new sign-ins later.

On a laptop, opt in today. It would not have saved LiteLLM from the owner's
token, which was used 44 minutes after the theft. It would have helped with the
other two. My own reasoning: a maintainer token that expired within hours could
not have approved a release 11 days after it was stolen.

But read GitHub's own warning: scripts that run `gh auth token` once and store
the result "will eventually be left holding an expired token". The two
maintainer tokens here were stored that way, in CI secrets. So was the owner's
token in the agent config. **Expiring tokens protect the laptop and break every copied token, and here
you want both.** For the copied ones, the fix is a GitHub App or a scoped,
bot-owned token.

## What I'd check this week

1. **Hunt for 1.107.0.** `pip show litellm` on hosts and images, and search for
   `cook.pth`, `sitecustomize.py` and `litellm-1.107.0.dist-info`. If you find
   it, don't start with `pip install`, since any Python start reruns the payload.
   Delete the files from the shell, kill the detached Python daemon holding
   `/tmp/remote_code_loader.lock`, pin `litellm==1.106.2`, rebuild, and rotate
   everything that host could reach.
2. **Audit CI secrets for human tokens.** You can't read a secret back, so list
   them and find out whose token each one holds. Any `GH_TOKEN` or similar
   holding a person's GitHub CLI token is one branch push away from
   `webhook.site`. Replace it with a GitHub App.
3. **Grep agent and bot configs too.** Anything that opens PRs for an agent
   should run as its own identity with repo-scoped rights, never an owner.
4. **Revoke leaked keys, not just the commit.** Force-pushing over a leaked key
   hides it. It stays valid until someone revokes it.
5. **Limit who can bypass branch protection.** An owner token should not make
   the release repo writable in five seconds.
6. **Pin the release source.** Check that the build attestation names your repo
   before you publish.
7. **Stop logging LLM response bodies,** or redact tokens before they're written.
8. **Opt into `gh auth login --expiring`** on every engineer's machine.

If you want the same lesson from the agent side, I wrote about
[MCP clients handing saved tokens to the wrong server]({{ '/ai/2026-10-07-mcp-open-servers-not.html' | relative_url }})
three weeks ago.

## What to take away

- **Three stolen GitHub CLI tokens ran LiteLLM's real, signed release.** No
  build server was hacked.
- **The first token came from an agent platform API,** unlocked by a master key
  leaked May 27 and never revoked.
- **The other two were personal tokens stored as CI secrets,** exfiltrated by
  throwaway workflows.
- **LiteLLM's "tokens from our logs" theory was replaced** by the agent
  platform API. The canonical post doesn't revisit the Claude Code observation.
  Don't cite either as the cause.
- **Opt into expiring gh tokens on laptops, and give bots their own identity.**
- **Safe pin: `litellm==1.106.2`.**
