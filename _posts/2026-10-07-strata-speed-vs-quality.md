---
title: "Strata Is Fast. Nobody Has Shown It's Right Yet."
author: Kirill Kuklin
date: 2026-10-07
category: ai
layout: post
tags:
  - local-llm
  - inference
  - benchmarking
  - evals
  - llm-ops
excerpt: >
  Strata runs a 125B model on a 12 GB gaming card, and several people have
  reproduced the speed. The only public accuracy test so far went badly, so test
  it on your own task before anything depends on it.
---

A free installer now runs a 125-billion-parameter model on a 12 GB gaming card,
and the speed numbers hold up on other people's machines. The accuracy numbers
mostly don't exist yet, and the one independent test went badly.

That gap is the whole story, and it's the same gap I'd look for in any new
inference engine before it gets anywhere near a real workload.

## What Strata is

[Strata](https://github.com/Niko1221/Strata) is an MIT-licensed, one-click
installer for Windows and Linux. The repo was created on Sep 24, 2026. It landed on
Hacker News on Oct 4 with
[a thread](https://news.ycombinator.com/item?id=49953495) that had 927 points
and 422 comments at the time of writing.

It runs one model:
[Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next). The model
card says 125B parameters with 6B used per token. That's the trick that makes
this possible: the model is built from 24,576 small sub-networks called
"experts", and each word only needs 10 of them. So you don't need the whole
thing on the graphics card at once.

```
graphics card (12-24 GB)   the few thousand busiest experts
system RAM (32 GB+)        all 24,576 experts; the CPU works on the rest
SSD (~80 GB free)          a big lookup table
```

**The graphics card holds the busy part. Your RAM holds the rest.** On top of
that, a small helper guesses the next few words and the big model checks them in
one go. The README says that gives the same answer 1.6-1.8x sooner.

## The speed holds up

Here's what's public. tok/s is tokens per second (a token is about ¾ of a
word). llama.cpp is the standard open-source engine for running models like this
locally, and Strata itself is built partly on it.

| Machine | Writes answers | Who says so |
|---|---|---|
| RTX 5070 12 GB, 64 GB RAM | 53-94 tok/s | Strata README |
| RX 9070 XT 16 GB | 44-60 tok/s | Strata README |
| RTX 4090, 128 GB DDR5 | 124 tok/s | the HN submitter's own account |
| Radeon AI PRO R9700, IQ3_XXS | 60 tok/s (21 on llama.cpp) | one HN user |
| R9700 32 GB, 96 GB DDR4 | ~60 tok/s | another HN user |

One correction to the hype: the HN title said "100T/s" on a 4090, and the 124
tok/s figure came from the account that submitted the story. The README itself
never claims a 4090 number. Its own measurements are the 5070 and the 9070 XT.

Even so, several unrelated people on different hardware landed in the same
range. One commenter, jacquesm, summed up the mood: "the speed is definitely
there." **Speed is the part strangers have reproduced, so I believe it.**

## The one accuracy test that disagreed

Then HN user Jackson__ ran a different kind of test. He gave the model 50 images
and asked for the exact coordinates of an object in each. Same model file (the
GGUF, the file format both engines read), same vision add-on, temperature 0 (no
randomness, so the same question gets the same answer). He compared how far off
each answer was, in pixels:

| Engine | Median miss | Average miss |
|---|---|---|
| llama.cpp | 46.5 px | 81.4 px |
| Strata | 154.8 px | 168.8 px |

That's a median miss about 3.3x bigger on Strata. His own read: "as large as
the jump from a 9B model to a 35B model."

Now the caveats, because they matter. This is one person's test, on images only,
and nobody has audited it. He said the result matched what he expected and he
did no further testing. Another commenter questioned the method. Jackson__
replied that the vision part of the model is an uncompressed file in both runs,
so the weights really were the same.

**One test is not a verdict. But it's the only independent accuracy number
anyone has posted.**

## Strata's own numbers say something different

Strata's docs include their own
[quality check against llama.cpp](https://github.com/Niko1221/Strata/blob/main/docs/UNSLOTH_Q4.md#quality-against-llamacpp-on-the-same-file)
on the same file. At each position in a piece of text, they asked both engines
for their single most likely next token, and counted how often they agreed.

- Short coding answer: 99.0% agreement.
- Short reasoning answer: 97.5%.
- After a 16K-token prompt: 90.2-91.2%.

That's the project's own run, on one 4-bit file, with text only. The doc also
says where the two disagree: at near-ties, where llama.cpp itself saw two tokens
as almost equally likely.

Both stories can be true at once. Text and images take different paths through
the engine. And agreement on short answers tells you less about long ones, which
Strata's own numbers already show. **A high agreement score on text doesn't
clear the image path, and it doesn't clear your task either.**

## Why speed spreads and accuracy doesn't

Speed is easy to share. Anyone can run a prompt and read a counter, so within days
you get numbers from a lot of different machines.

Accuracy needs prompts where you already know the right answer, a way to score
them, and a second engine to compare against. Almost nobody does that for a
weekend install, so the thread fills up with speed and "feels smart to me."

I made the same argument about my own proxy in
[Why I Benchmark a Proxy That Already Works]({{ '/ai/2026-06-08-why-benchmark-llm-proxy.html' | relative_url }}):
a demo answers "does it run", and only a measurement answers "does it do the
job." A fast wrong answer costs more than a slow right one, because someone has
to notice it's wrong.

## Test it on your own task

The good news: this is cheap to check. Strata serves an OpenAI-compatible API at
`http://127.0.0.1:8080/v1`, and llama.cpp's `llama-server` speaks the same API.
Load the same GGUF in both (put llama-server on another port, say 8081), then
run the same prompts through each:

```bash
# prompts.jsonl: one {"prompt": "...", "expected": "..."} per line
for url in http://127.0.0.1:8080/v1 http://127.0.0.1:8081/v1; do
  pass=0; total=0
  while read -r line; do
    p=$(jq -r .prompt <<<"$line"); want=$(jq -r .expected <<<"$line")
    got=$(curl -s "$url/chat/completions" -H 'Content-Type: application/json' \
      -d "$(jq -n --arg p "$p" '{model:"local",temperature:0,messages:[{role:"user",content:$p}]}')" \
      | jq -r '.choices[0].message.content')
    total=$((total+1)); grep -qiF -- "$want" <<<"$got" && pass=$((pass+1))
  done < prompts.jsonl
  echo "$url  $pass/$total"
done
```

A substring match is crude, but it's enough to spot a gap the size of
Jackson__'s. If you use images, test them separately: that's exactly where the
gap showed up.

Two operational details from the README worth knowing before you put this behind
an internal API for a team. By default Strata answers one request at a time and
the rest wait; turning on two at once makes each answer slower on a 12 GB card.
And at start-up it loads 35-55 GB into RAM, and the machine can stop responding
for 1-3 minutes. Fine on a desk, less fine on a shared box someone else depends
on.

## What to take away

- **The speed is real.** Several people on different hardware report numbers in
  the README's range (53-94 tok/s on an RTX 5070, by the README's own count).
- **The 4090 headline is the submitter's own number,** and the README makes no
  4090 claim.
- **Accuracy is the open question.** The only independent test, one user's
  50-image pointing task, found a median miss of 154.8 px on Strata vs 46.5 px on
  llama.cpp with the same file.
- **Strata's own text check reports 97.5-99% top-token agreement** on short
  answers, lower after long prompts. That's their run, text only.
- **Run 20-50 of your own prompts with known answers** through both engines at
  temperature 0. Score accuracy first, speed second.

## Also this week

Three stories, one thread: agents and the tools around them are moving faster than the checks on them.

- [MCP Is Open. The Servers Aren't.]({{ '/ai/2026-10-07-mcp-open-servers-not.html' | relative_url }}): an open protocol, with servers that pick which agents get in.
- [The Agents Didn't Break In. They Just Kept Asking.]({{ '/sre/2026-10-07-agents-load-wikidata.html' | relative_url }}): what agent traffic did to a public service, and why sampled rate limits missed it.
