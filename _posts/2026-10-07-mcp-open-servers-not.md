---
title: "MCP Is Open. The Servers Aren't."
author: Kirill Kuklin
date: 2026-10-07
category: ai
layout: post
tags:
  - mcp
  - ai-agents
  - oauth
  - security
  - figma
excerpt: >
  Pi went from "no MCP" to MCP in core, and a day later learned that Figma's
  remote MCP server only lets in clients from Figma's own list. The same week,
  the official MCP TypeScript SDK fixed a bug that let a hostile server collect
  your saved refresh tokens, and upgrading alone doesn't fully close it.
---

Your agent can speak MCP perfectly and still get a `403` at the door. This
week showed it from both sides: a server that won't let a client in, and a
client library that trusted servers too much.

MCP (Model Context Protocol) is the open standard agents use to call outside
tools. The protocol is open. **Who gets to connect is a policy someone else
writes.**

## What happened

On Sep 29, Earendil published
[You said no MCP](https://earendil.com/posts/you-said-no-mcp/). Pi, their
coding agent, once made "a proud declaration that Pi does not support MCP".
Now, in their words, "MCP is now a supported piece of functionality", and it lives in core.
Two days later [Pi 1.0](https://earendil.com/posts/pi-1-0/) shipped with
Codemode, which it describes as "native support for MCP". Codemode is a small
JavaScript layer that "runs where the harness runs" and coordinates the
agent's tool calls.

In between, on Sep 30, a Figma employee
[replied on X](https://x.com/GayaniFigma/status/2105295629941350454):
"our remote MCP server only accepts clients on our supported list, and Pi
isn't on it yet."

| Date (2026) | What |
|---|---|
| Sep 28 | MCP TypeScript SDK 1.31.0 and client 2.2.0 released, with a security fix |
| Sep 29 | Earendil: Pi now supports MCP, in core |
| Sep 30 | Figma employee: Pi isn't on the supported list. SDK repo advisory published |
| Oct 1 | Pi 1.0 ships. 1,687 points on Hacker News when I checked |
| Oct 6 | The CVE lands in GitHub's global advisory database |

The Figma part isn't just one tweet. The policy is in
[Figma's own developer docs](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation):
"Only clients listed in the Figma MCP Catalog like VS Code, Cursor, or Claude
Code can connect to the Figma MCP Server." New clients join a waitlist. Only
the "Pi isn't on it" detail rests on the employee's post.

## Speaking the protocol gets you to the door

How does Figma tell clients apart? Per
[WorkOS's write-up](https://workos.com/blog/figma-mcp-403-forbidden-client-name)
from Oct 5, it happens during sign-up with Figma's login server (OAuth dynamic
client registration, where a client registers itself on first connect):

```
agent ──register──▶ Figma auth server
        client_name: "<whatever the client says>"
                         │
            name on the allow-list?
              ├── yes ─▶ normal OAuth sign-in
              └── no  ─▶ HTTP 403, body: Forbidden
```

The key detail: `client_name` is a field the client fills in about itself.
In the [Hacker News thread](https://news.ycombinator.com/item?id=49922729),
one user says Pi added a client name setting, they typed "Codex", and Figma's
MCP server worked. I haven't tried that, and I wouldn't ship it. **A name the
client types about itself tells the server what the client claims to be, not
who it is.**

So what is the list for? A commenter who says they do security review for their
company suspects it's "a means of containing OAuth redirect vulnerabilities."
That's a guess, but a plausible one. A short list of known clients means a
short list of redirect setups to worry about.

## Where I land on the gate

I'm not outraged. I'm also not convinced.

David Soria Parra, MCP's co-creator, [replied to Figma](https://x.com/dsp_/status/2105316536852320279):
"when I created MCP, I envisioned an open ecosystem. ... Seeing restrictions
like this is sad". Earendil's own post makes the sharper point: the gap is
"less the problem of MCP but the MCP servers out there". I agree with both.

But I've been on record as
[bearish on unrestricted MCP access]({{ '/job-interviews/2026-05-25-staff-ai-engineer-interview.html' | relative_url }})
for agents, so I can't pretend a vendor locking down its own server is
unreasonable. My problem is with *what* it checks. If the goal is control, a
self-reported name is the weakest thing to check. Admin approval per
workspace, or tighter scopes, would say more about what a client may do than
its name does.

**For operators, the takeaway is simpler than the debate: every SaaS MCP
server is a dependency with its own admission policy.** The question used to
be "does this tool support MCP?" Now it's "is my client on that vendor's list,
and what do I do when it isn't?" I made a similar point about
[design systems shipping MCP servers]({{ '/ai/2026-09-27-agent-ready-design-systems.html' | relative_url }}):
an MCP server is another service to run, version and secure. The same goes
for the ones you consume.

## Trust runs both ways

Here's the part that matters more to anyone running agents today. The official
MCP TypeScript SDK had
[CVE-2026-104850](https://github.com/advisories/GHSA-6qxp-vccf-f47h): High,
7.5 out of 10 on the CVSS severity scale.

The advisory, in plain terms: "A malicious or compromised MCP server could name
its own authorization server." Then, "With no user interaction", the client
would send that server "the `refresh_token` and `client_secret` stored from an
earlier sign-in". **The server you connected to could pick where your saved
credentials went.**

Affected: `@modelcontextprotocol/sdk` from 1.12.0 to anything before 1.31.0,
and `@modelcontextprotocol/client` from 2.0.0 to anything before 2.2.0. MCP servers built with
the SDK and stdio clients (local servers started as a subprocess) are not
affected.

The fix makes the client record which login server issued each credential
(the `issuer` field) and refuse to send it anywhere else. That's where the
trap is:

| Situation | Covered by upgrading? |
|---|---|
| New credentials saved after the upgrade | Yes |
| Tokens your app saved before the upgrade, without `issuer` (everything 1.x saved before 1.31.0) | No. Add `issuer`, or clear them so users sign in again |
| Bundled providers (`ClientCredentialsProvider` and friends) without `expectedIssuer` | No. Pass `expectedIssuer` |
| A brand new interactive sign-in | No. It still goes where the MCP server says. Only sign in to servers you trust |
| 2.x with `skipIssuerMetadataValidation: true` | No |

**Bumping the version protects new tokens. The old ones in your keychain or
database are still exposed.**

First check where you stand:

```bash
npm ls @modelcontextprotocol/sdk @modelcontextprotocol/client
```

Anything below 1.31.0 or 2.2.0 needs the upgrade. Then go look at where your
OAuth provider stores tokens (file, keychain, database) and decide: backfill
`issuer`, or wipe and make people sign in again. Wiping is the boring answer,
and boring is fine here.

If an affected client may ever have talked to a server you don't trust, the
advisory is clear: rotate the client secret or signing key and revoke its
tokens.

## What I'd do this week

1. **List every remote MCP server your agents use,** and check each one for a
   client allow-list. Note which clients it admits.
2. **Pick a fallback per server:** the vendor's REST API, or a local server.
   A 403 on Monday morning shouldn't be the first time you think about it.
3. **Run the `npm ls` above** in every repo that ships an MCP client, and move
   to 1.31.0 or 2.2.0.
4. **Clean the stored credentials:** add `issuer`, or clear them.
5. **Pass `expectedIssuer`** on bundled OAuth providers.
6. **Rotate and revoke** if any affected client connected to a server you
   don't control.

## What to take away

- **MCP being open doesn't make servers open.** Figma's docs say only catalog
  clients get in, and a Figma employee said Pi isn't on the list yet.
- **The gate, per WorkOS, is a name the client reports about itself.** It's a
  policy dial, not proof of identity.
- **CVE-2026-104850 (CVSS 7.5)** let a hostile MCP server collect saved refresh
  tokens and client secrets. Fixed in SDK 1.31.0 and client 2.2.0.
- **Upgrading alone isn't enough.** Tokens saved before the fix without
  `issuer` still go wherever the server says.
- **Treat every SaaS MCP server as a dependency** with its own policy, and
  have a plan for the day it says no.

## Also this week

Three stories, one thread: agents and the tools around them are moving faster than the checks on them.

- [Strata Is Fast. Nobody Has Shown It's Right Yet.]({{ '/ai/2026-10-07-strata-speed-vs-quality.html' | relative_url }}): a speed claim that reproduces, and an accuracy claim nobody has measured on your task.
- [The Agents Didn't Break In. They Just Kept Asking.]({{ '/sre/2026-10-07-agents-load-wikidata.html' | relative_url }}): what agent traffic did to a public service, and why sampled rate limits missed it.
