---
title: "The .NET QUIC Bug: Find the Apps That Brought Their Own Runtime"
author: Kirill Kuklin
date: 2026-10-16
category: devops
layout: post
tags:
  - dotnet
  - security
  - http3
  - patching
  - kestrel
excerpt: >
  Microsoft rates CVE-2026-105016 at 9.8: one crafted IPv6 QUIC packet can run
  code on a .NET server on Windows, no login needed. A runtime update fixes most
  apps, but the ones that ship their own copy of .NET need a rebuild, and they
  are easy to miss.
---

On Oct 13 Microsoft published a fix for CVE-2026-105016, a remote code
execution bug in Microsoft QUIC (MsQuic, the library that handles QUIC, the
UDP-based transport under HTTP/3) rated 9.8 out of 10. Per Microsoft's advisory,
one crafted IPv6 packet can reach the HTTP/3 code in .NET 8, 9, 10 and 11 RC2
on Windows, with no login and no click from anyone.

Most teams will patch their servers this week and move on. **The apps that
carry their own copy of .NET don't get that patch, and a host-level patch
report won't list them.**

## What Microsoft says

The source is Microsoft's advisory, mirrored in the GitHub Advisory Database as
[GHSA-5gjq-3f94-rcf7](https://github.com/advisories/GHSA-5gjq-3f94-rcf7) and
announced in
[dotnet/announcements#446](https://github.com/dotnet/announcements/issues/446).
I couldn't find an independent write-up yet, so everything below is per
Microsoft's advisory, plus Microsoft's own docs where I say so.

| | Per the advisory |
|---|---|
| CVE | CVE-2026-105016, published Oct 13, 2026 |
| Severity | Critical, CVSS 3.1 score 9.8 |
| Who can trigger it | anyone who can reach the server over the network, no account, no user action |
| Bug type | CWE-122, heap buffer overflow (code writes past the end of a memory block) |
| Trigger | a crafted IPv6 QUIC packet reaching the HTTP/3 path |
| Affected | .NET 8, 9, 10 and 11 RC2, Windows only, all architectures |
| Package listed | `Microsoft.Native.Quic.MsQuic.Schannel` 2.5.11-ci.156755675 |
| Fixed in | 2.5.11-ci.159417053 or later |

The fix list has three parts. Install the latest servicing update (the patch
release for your .NET version) and restart your apps. If a project references
the MsQuic package directly, bump it to the fixed version. And self-contained
apps (apps that ship their own copy of .NET) "are also vulnerable and must be
recompiled and redeployed."

The advisory lists no workaround or mitigation, only the update steps.

## What the advisory doesn't say

There are two gaps, and I'd keep both visible in whatever you send your team.

First, it doesn't say whether HTTP/3 has to be switched on for an app to be
exposed. Microsoft's
[Kestrel HTTP/3 page](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/http3)
says "HTTP/3 isn't enabled by default" in Kestrel, the web server built into
ASP.NET Core. That's a fact about defaults. The advisory never says it makes
you safe, so I wouldn't write "we don't use HTTP/3, we're fine" in a ticket.

Second, the package table lists exactly one build. The fix list still tells
everyone on those four .NET versions to install the servicing update. **The fix list is wider than the version table, so follow
the fix list.**

## Three kinds of app, three fixes

A .NET app gets its runtime in one of two ways. A framework-dependent app uses
the runtime installed on the machine. A self-contained app ships its own copy of the runtime inside its
folder, so it runs on a box with no .NET installed at all.

Microsoft's
[QUIC overview](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/quic/quic-overview)
says that on Windows, "msquic.dll is distributed as part of the .NET runtime."
So the library sits wherever the runtime sits.

| Your app | Where its MsQuic comes from | What fixes it |
|---|---|---|
| Framework-dependent | the .NET runtime on the host | servicing update, then restart the app |
| References the package directly | its own NuGet reference | bump to 2.5.11-ci.159417053 or later, rebuild |
| Self-contained | the runtime bundled in its folder | update the SDK, recompile, redeploy |

**The servicing update fixes the first row. The other two need a build and a
deploy, which means one pipeline run per app.**

The advisory doesn't mention containers, so this part is my reasoning. A
Windows container image built on a .NET base image carries its own runtime in
the same way. Patching the container host doesn't touch it. Rebuild the image on an updated
base and redeploy.

## Find the self-contained ones

Microsoft's own check is `dotnet --info`, which lists the SDKs and runtimes
installed on a machine. It's the right check for the first row. It tells you
nothing about a self-contained app, because that app never uses the installed
runtime.

So I'd search in two places: the repos and the hosts. In the repos, look for
the package, for self-contained publish settings, and for HTTP/3 being turned
on:

```bash
git grep -n -i -E \
  'Microsoft\.Native\.Quic\.MsQuic\.Schannel|<SelfContained>true|--self-contained|Http1AndHttp2AndHttp3|HttpProtocols\.Http3' \
  -- '*.csproj' '*.props' '*.pubxml' '*.cs' '*.json' '*.yml' '*.yaml' 'Dockerfile*'

# per project, including packages pulled in by other packages
dotnet list package --include-transitive | grep -i msquic
```

Check pipeline files by hand for the short `--sc` flag too, since the pattern
above won't catch it.

On Windows hosts, a self-contained app keeps the runtime files next to its own
executable. Search the folders you deploy to:

```powershell
# an msquic.dll outside the shared runtime means an app brought its own
Get-ChildItem D:\apps -Recurse -Filter msquic.dll -ErrorAction SilentlyContinue |
  Select-Object FullName, LastWriteTime
```

A hit doesn't prove the app has the affected build. Check which .NET version
the app was built on and when it last shipped. No hit doesn't clear an app
either, because single-file publishing can pack native files inside the
executable.

## HTTP/3 puts a new parser on the edge

HTTP/1.1 and HTTP/2 arrive over TCP. HTTP/3 arrives over QUIC, which runs on
UDP, and per the Kestrel docs, ASP.NET Core's HTTP/3 "depends on MsQuic to
provide QUIC functionality."

So enabling HTTP/3 loads a second piece of code into your web server that reads
raw packets straight off the internet. It speaks UDP, which your firewall rules
and load balancer may treat differently from TCP 443. **Turning on HTTP/3 is a
decision about what code faces the internet, and it needs an owner.**

Two lines from the Kestrel docs help you find who made that decision. HTTP/3
needs explicit configuration such as `HttpProtocols.Http1AndHttp2AndHttp3`,
which the grep above catches. And "Kestrel automatically adds the alt-svc
header if HTTP/3 is enabled." That header is how a server tells browsers it
also speaks HTTP/3, so you can check from the outside:

```bash
curl -sI https://your-host.example/ | grep -i '^alt-svc'
```

A CDN or proxy in front can add that header too, so a hit tells you something
speaks QUIC there, and you still have to find out what.

The docs also say Kestrel turns HTTP/3 off and falls back to other protocols
when the platform lacks MsQuic's requirements (on Windows, that means Windows
11 or Windows Server 2022 and later, per the QUIC overview). Put that in your inventory. The advisory
doesn't say it changes your exposure, so it changes nothing about the patch.

## Patch day is a deploy day

Earlier this month I wrote that
[patching is a deploy]({{ '/sre/2026-10-02-azure-two-outages.html' | relative_url }}),
after Azure's two outages. This bug is the other side of that. For a
self-contained app, the patch only exists once a deploy ships it. If the
pipeline for some old internal service is broken, that is now a security
problem.

**Keep a list of the components each build ships (an SBOM), and make it answer
"which apps contain msquic.dll" before the next advisory asks.** If yours lists
NuGet packages but not the runtime a self-contained app bundles, that's the
gap to close.

## What to take away

- CVE-2026-105016 is a critical (9.8) remote code execution bug in
  Microsoft QUIC as used by .NET 8, 9, 10 and 11 RC2 on Windows, fixed on Oct
  13, 2026, per Microsoft's advisory.
- Install the servicing update and restart. That covers apps that use the
  machine's runtime.
- Bump `Microsoft.Native.Quic.MsQuic.Schannel` to 2.5.11-ci.159417053 or
  later wherever a project references it directly.
- Rebuild and redeploy every self-contained app. `dotnet --info` won't find
  them. A search for `msquic.dll` in your deploy folders is a start.
- Don't write "HTTP/3 is off, so we're safe" in the ticket. Kestrel has it
  off by default, and the advisory doesn't say that's enough.
- Check which endpoints send `alt-svc`, and give each one an owner.
