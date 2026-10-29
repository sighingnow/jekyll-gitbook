---
title: "Your Agents Need Their Own Identity, Not Yours"
author: Kirill Kuklin
date: 2026-10-29
category: ai
layout: post
tags:
  - github
  - copilot
  - ai-agents
  - identity
  - security
excerpt: >
  GitHub now lets Copilot agents sign in as a GitHub App with a token that dies
  after an hour, instead of borrowing a person's login. If your bots still run
  on someone's personal token, this is the week to start moving them.
---

A lot of GitHub automation runs as a person. A bot opens PRs
with a developer's personal token, an agent calls Copilot through someone's
`gh` login, a CI job has a maintainer's token pasted in as a secret.
**The bot has no name of its own, so every log, bill and kill switch points at
the wrong thing.**

On October 27 GitHub shipped a public preview that fixes this for Copilot:
[server-to-server authentication for the Copilot SDK](https://github.blog/changelog/2026-10-27-github-copilot-supports-server-to-server-authentication).
I think it's the most useful AI release of the month for anyone who runs a
GitHub org, and it has nothing to do with models.

## What GitHub shipped

Services and agents built with the Copilot SDK can now call Copilot as a
**GitHub App** instead of as a signed-in user. GitHub calls this a
"workload-owned identity": the program has its own account, separate from any
human's.

The setup, from the [SDK docs](https://docs.github.com/copilot/how-tos/copilot-sdk/auth/server-to-server-tokens):

1. Create a GitHub App with the organization permission **Copilot Requests**
   set to Read-only.
2. Install it on the org that should pay for the usage.
3. Mint an installation access token (a temporary password the app requests
   for itself) with `organization_copilot_requests: read`.
4. Pass that `ghs_` token to the SDK.

Usage is billed to the org that owns the installation. The org's model
policies, budgets and spending controls apply. Installation tokens expire
after one hour. Owners can find app usage in the AI usage CSV export through
the `app_client_id` column, and cut an app off by suspending or uninstalling it.

The SDK side looks like this:

```typescript
const client = new CopilotClient({
    connection: RuntimeConnection.forStdio(),
    gitHubToken: process.env.INSTALLATION_TOKEN,
    useLoggedInUser: false,
});
```

`useLoggedInUser: false` switches off the fallback to stored user
credentials. Leave it out, and a broken token setup can quietly fall back to
whoever's login is on that machine, which is the exact problem you were trying
to get rid of.

## A bot on your token gets four things wrong

When an agent runs on a human's token, four things that ops depends on stop
telling the truth:

- **Audit.** Every action says "Kirill did this". You can't tell my 2 a.m.
  push from my agent's 2 a.m. push.
- **Billing.** Usage lands on a person. When that person's spend jumps, you
  have to ask them whether it was them or one of their scripts.
- **Revocation.** To stop the bot you revoke the human's token, which breaks
  their laptop, their git, and every other script they forgot about.
- **Blast radius.** The bot gets everything the human can do. If the human is
  an org owner, so is the bot.

Here is the same agent three ways:

| | Agent on a human's token | Agent as a GitHub App | Job inside GitHub Actions |
|---|---|---|---|
| Who it acts as | The person | The app installation | The workflow's `GITHUB_TOKEN` |
| How long the token lives | Until someone revokes it | One hour | Until the job ends |
| Who pays for Copilot | The person's Copilot access | The org that installed the app | The org, under Actions policy |
| How you spot its usage | You can't, it looks like the person | `app_client_id` in the CSV | Not by `app_client_id`, it's empty for Actions |
| How you stop it | Revoke the person's token | Suspend or uninstall the app | Change the workflow |
| What it can reach | Everything the person can | Only the permissions the app asked for | What the workflow's `permissions:` grant |

If the agent already runs inside GitHub Actions,
you don't need an App at all: the docs say to give the built-in token
`copilot-requests: write` and turn on the org policy "Allow use of Copilot CLI
billed to the organization". No stored secret.

## LiteLLM already paid for this

I covered the LiteLLM 1.107.0 release hijack yesterday in
[the LiteLLM post]({{ '/devops/2026-10-28-litellm-gh-token-release-hijack.html' | relative_url }}),
so I won't retell it. Their
[attack-chain write-up](https://docs.litellm.ai/blog/security-incident-oct-21-2026-attack-chain)
says an internal agent platform was set up with a GitHub CLI OAuth token that
"was not associated with a service account and was not scoped down". It was
the org owner's token. **An agent on a human token is the human, with all of
their rights, for as long as the token lives.** Once the attacker pulled that
token out of the platform, they had owner-level access to every repository.

## The fine print I'd read before migrating

The preview has limits, and the docs are upfront about them:

- **"Read-only" still spends money.** The docs say directly that Read-only
  "does not mean that the app cannot incur costs". The permission lets the app
  burn the org's AI credits. Review it like you'd review a card on the
  company account.
- **There is no per-app budget.** "You cannot create a budget for an individual
  app or installation." The app shares the org budget. An alert-only budget
  does not stop spending, so turn on "Stop usage when budget limit is reached"
  if you want a hard stop.
- **Attribution is CSV only.** App usage shows up in the CSV export, not in the
  AI usage view. You match `app_client_id` to `client_id` from the "List app
  installations for an organization" API to get the app's name.
- **Org installs only.** Personal account and enterprise installations can't
  use it.
- **Suspending is a big switch.** It also cuts the app's access to other org
  resources. Fine for a bot that only does Copilot, painful for a
  do-everything app.
- **You own token refresh.** An hour is short. Mint a new token before the old
  one expires and restart the SDK client with it.

For the per-app budget gap, I'd give each agent its own app, so the CSV at
least tells you which one ate the budget.

## The human tokens are getting shorter too

A week earlier GitHub put
[expiring, auto-refreshing tokens for the GitHub CLI](https://github.blog/changelog/2026-10-21-github-cli-opt-in-to-expiring-auto-refreshing-oauth-tokens)
into public preview. From `gh` v2.103.0, `gh auth login --expiring` gives you
an access token plus a rotating refresh token, and a leaked access token
"becomes unusable within hours instead of lasting indefinitely". GitHub
recommends `gh auth setup-git` and git 2.46 or newer.

Scripts that run `gh auth token` once and save the value will break
when it expires. **Every script that breaks this way is a bot that was living
on a human token.** That gives you a migration list.

## What I'd do this week

1. **Inventory.** List every bot, agent and CI job that authenticates as a
   person: personal access tokens in CI secrets, `gh auth token` output saved
   to env files, agent configs with someone's token.
2. **Move Actions jobs that call Copilot to `GITHUB_TOKEN`** with
   `copilot-requests: write`.
   That's the cheapest win.
3. **Move everything else to GitHub Apps,** one app per agent, with only the
   permissions it needs.
4. **Mint short-lived installation tokens** at runtime, set
   `useLoggedInUser: false`, and handle the one-hour refresh.
5. **Set the org budget to hard-stop,** since per-app budgets don't exist.
6. **Watch `app_client_id`** in the monthly AI usage CSV and map it to app
   names.
7. **Opt humans into `gh auth login --expiring`** and see which scripts
   complain.

## What to take away

- A bot running on your token is you, with all your rights, as far as GitHub
  can tell.
- Copilot's server-to-server auth gives agents their own identity, a token
  that lives one hour, and a separate line in the usage CSV.
- It's a public preview with real gaps: no per-app budget, CSV-only
  attribution, org installs only.
- Start with the inventory. Expiring `gh` tokens will show you the scripts you
  missed.
