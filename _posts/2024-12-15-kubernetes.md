---
title: Readiness Probes
author: Kirill Kuklin
date: 2024-12-15
category: k8s
layout: post
cover: ../assets/k8s-probes.gif
---

# Readiness Probes

## What Are Readiness Probes and Why Do You Need Them? 🚀

When you deploy an application in Kubernetes, you want it to run smoothly without any hiccups. But sometimes, getting 
an application up and running isn't as simple as "just start it and go." Your app might need time to initialize a 
database, load dependencies, or simply ensure that it's ready to handle requests. That's where *readiness probes* 
come into play — small but incredibly useful helpers that let Kubernetes know: "Hey, is this pod actually ready?"

## Why Are Readiness Probes Important?

Here's the scenario: your application starts, but it's not ready to process requests just yet. Without a readiness 
probe, Kubernetes might immediately begin sending traffic to it. The result? Errors, unhappy users, and you scrambling 
to figure out what went wrong.

A readiness probe, however, checks your app's state and tells Kubernetes: "Hold on, not ready yet. Give me a few 
seconds to settle." Only when your application signals that it's ready does Kubernetes start routing traffic to it.

## A Simple Example 🧪

Let's say you have an application that needs to check its database connection before it can handle requests. In your pod's manifest, you'd configure a readiness probe like this:

```yaml
readinessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 3
```

### What's Happening:
- Kubernetes sends HTTP requests to http://your_pod:8080/healthz to check if the application is ready.
- `initialDelaySeconds` is the time Kubernetes waits after the pod starts before it begins checking.
- `periodSeconds` is how often Kubernetes will perform the check.

If your app returns a 200 OK response, Kubernetes knows it's ready to receive traffic.

## When Does This Save the Day?

1. **Microservices**: If one service depends on another, it's crucial to ensure traffic only flows to ready instances. For example, your API service won't work if the authentication service hasn't finished initializing.

2. **Heavy Applications**: Some apps (like Java monoliths) take a while to warm up. Readiness probes give them the breathing room they need to start properly.

3. **Deployment Chaos**: During rolling updates, readiness probes prevent a half-initialized pod from taking traffic, which could otherwise break the entire system.

## Beyond HTTP: Other Readiness Probe Types

Readiness probes aren't limited to just HTTP checks. Here are a few other ways they can verify if a pod is ready:

### TCP Socket

Checks if a port is open and accepting connections.

```yaml
readinessProbe:
  tcpSocket:
    port: 3306
  initialDelaySeconds: 10
  periodSeconds: 5
```

### Command Execution

Runs a custom script or command.

```yaml
readinessProbe:
  exec:
    command:
    - cat
    - /tmp/ready
  initialDelaySeconds: 5
  periodSeconds: 3
```

In this example, the pod is considered ready if the file `/tmp/ready` exists.

## Final Thoughts 🤔

Readiness probes are like polite gatekeepers: they only let traffic through when your application is truly ready. Use them to make your deployments more reliable, your users happier, and your own stress levels lower. After all, why deal with unnecessary chaos when you can configure it all properly? 😊

