---
title: "I Asked NVIDIA's World Model What a Robot Should Do Next"
author: Kirill Kuklin
date: 2026-10-16
category: ai
layout: post
tags:
  - nvidia
  - world-models
  - physical-ai
  - video-understanding
  - evaluation
excerpt: >
  NVIDIA's Cosmos world models are free to try in a hosted playground, no GPU
  and no login. A robot video, two prompts, and one client-side format gate
  that anyone shipping AI endpoints should copy.
---

I fed a two-robot-arm assembly video to NVIDIA's Cosmos nano-reasoner and asked
what the robot should do next. It reasoned through six steps and answered: move
the white object toward the cardboard box, possibly positioning it inside an air
column wrap for cushioning. That took about a minute, cost nothing, and needed
no login, no GPU, and no driver installs on my side.

My plain follow-up prompt is where it got useful. **The playground refused it
until I wrote it the model's way.** More on that below, because it is the
pattern I'd steal for my own AI endpoints.

## What Cosmos actually is

The source is [NVIDIA's Cosmos repo](https://github.com/NVIDIA/cosmos) (I
found it through the GitHub Community Telegram channel), and I checked the
README rather than trusting the channel post. Cosmos 3 shipped in May 2026 as a
family of omnimodal world models built on a unified Mixture-of-Transformers
architecture. The pitch is physical AI: robots, autonomous vehicles, smart
infrastructure.

One model family, two surfaces, per the README:

| Surface | Inputs | Outputs | For |
|---|---|---|---|
| Reasoner | text, vision | text | world understanding, task planning, embodied reasoning |
| Generator | text, vision, sound, action | vision, sound, action | world simulation, future prediction, synthetic data, policy learning |

Around the models sit three more repos: a training framework (SFT, LoRA, RL,
distillation), a data curation tool, and an output evaluator. In July 2026
NVIDIA added Cosmos3-Edge, a 4B tier for on-device real-time use, and the
README names its targets: Jetson AGX Orin, Thor, and RTX Pro 6000. Your laptop
is not on that list, unless your laptop is an RTX workstation.

## The free playground, minus the fine print

You can try the Reasoner at
[build.nvidia.com/nvidia/cosmos3-nano-reasoner](https://build.nvidia.com/nvidia/cosmos3-nano-reasoner).
No account needed for the trial. NVIDIA hosts it on DGX Cloud, the page calls
it a free endpoint, and the input form takes a video or image plus a prompt.

There is a consent wall before the first run. Read it. Your
inputs and outputs are recorded to improve NVIDIA's products, logged for
security and fraud monitoring, and shared with third-party service providers.
**A free trial endpoint is a wiretap with a checkbox. Treat every frame and
every prompt you paste there as non-confidential.** For a public demo video,
fine. For footage from your factory floor, I'd think twice, or self-host.

The budgets are small and stated: 4,000 characters for the user prompt
(recommended 400 tokens or fewer), 250 tokens for the system prompt. That
sizes it for quick probes, not working sessions.

## The format contract is enforced, not suggested

I replaced the example prompt with my own plain question, and the Run button
grayed out with this message: "When reasoning is enabled, the user prompt must
end with the required format pattern."

The contract: reasoning turns on when your prompt ends with a `<think>` block
pattern, and the UI validates that suffix client-side before letting anything
reach the model. Restore the suffix, keep your question, and the run goes
through. The full exchange from my second run, verbatim:

```text
Q: Describe the scene in exactly one sentence.
   (plus the required <think> format suffix)

reasoning: [collapsed trace, model-visible only]

A: In a static indoor setting, Robot Arm 2 picks up a white rectangular
   object from the right side of the table and lifts it above the surface
   while Robot Arm 1 remains stationary near the open cardboard box.
```

Both runs on the example video were coherent, and the next-action prediction
was specific enough to act on (move object to box, use the wraps for
cushioning). One video and two prompts make this a probe, so I make no accuracy
claims. The validation gate, though, I'd copy as is. **Refusing malformed
requests at the edge beats burning tokens on them.**

If you expose structured reasoning over an API, validate the format there,
before the request reaches a model. It turns "why is the model confused"
tickets into clean 400s.

## What this means if you run systems

Three thoughts from the operator seat. My take, not NVIDIA's.

First, video-input models are becoming a sensor class. A VLM that reads a
video and answers "what happens next" is one integration away from watching a
process camera, a datacenter aisle, or a job-site feed. The nano tier running
on Jetson-class hardware means that integration can sit next to the camera,
not in your cloud bill.

Second, the harness matters as much as the model. Cosmos's own repo ships a
training framework, a data curator, and an evaluator, because world models
without evaluation plumbing are demos. The same discipline applies at much
smaller scale: if you can't evaluate an AI feature's output, you don't have a
feature, you have a party trick.

Third, mind the hardware wall. Everything in the Cosmos cookbook stack runs
through vLLM on CUDA. On my Mac there is no local path at all, and the smallest
on-device tier still names NVIDIA silicon as its home. The hosted playground
is the cheap way to find out whether the capability matters to you before you
rent anything.

## What to take away

- Cosmos is NVIDIA's open world-model platform for physical AI: a Reasoner
  (text out) and a Generator (vision, sound, action out), plus separate
  training, curation, and evaluation repos, per the README.
- The hosted nano-reasoner playground is free, login-free, and fast to try,
  but its terms record your inputs and outputs and share them with third-party
  providers. Keep confidential footage out.
- Reasoning is enabled by a required `<think>` suffix on the prompt, and the
  playground enforces it client-side. Validate format at the edge in your own
  AI endpoints.
- Local runs need CUDA hardware (vLLM cookbooks); the 4B Edge tier targets
  Jetson and RTX Pro 6000, not Apple Silicon.
- Try the playground before renting GPUs. A one-video probe answers "is this
  relevant to me" for zero dollars.
