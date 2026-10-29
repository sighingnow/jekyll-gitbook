---
title: Ingress Controllers
author: Kirill Kuklin
date: 2024-12-17
category: k8s
layout: post
#cover: ../assets/k8s-probes.gif
---
# Demystifying Kubernetes Ingress Controllers: Gatekeepers of the Cloud

Welcome to the mystical and magical world of Kubernetes, where pods, nodes, and services dance in harmony – unless, of course, you need to expose your services to the outside world. Enter the unsung hero of Kubernetes networking – the **Ingress Controller**. Think of it as the friendly gatekeeper at the front door of your cluster, ensuring traffic gets to the right party without wandering into the wrong crowd.

## What Exactly is an Ingress Controller?

Before we jump into the nitty-gritty, imagine this scenario: You’ve built a trendy new coffee shop in a bustling city. You have all your brewing gadgets (services) set up and ready inside, but customers outside your shop can’t figure out how to get in. That’s where the ingress controller comes in. It's your shop's cheerful receptionist, standing at the entrance, giving directions to customers based on their orders – "Oh, you want the cappuccino? Please go to barista pod A!"

Ingress controllers are responsible for routing external HTTP and HTTPS traffic to the appropriate services running within your Kubernetes cluster. They work based on **Ingress resources** you define, which are like a set of instructions explaining how the traffic should be handled. Without an ingress controller, Kubernetes services would be stuck talking only amongst themselves, like a secret club with no way to invite new members.

Here, we'll provide practical examples of how to configure and use an ingress resource in Kubernetes.

## Code Examples

### Setting Up a Basic Ingress Resource

A basic ingress resource maps external traffic to one or more services based on a hostname or path.

**Example Code for Basic Configuration**:
Here, we're setting up ingress for a service called `my-service` running on port 80.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: basic-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: my-app.example.com # External hostname for the service
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-service # Name of the service
            port:
              number: 80
```

**Explanation**:
- The `host` field specifies the domain name users will use to access the service.
- The `http.paths` section defines where traffic should be routed based on the path (in this case, `/`).
- The backend includes the `service` name and port to route traffic to.

### Configuring Path-Based Routing

Use path-based routing to route requests to multiple services based on URL paths, such as `/shop`, `/blog`, etc.

**Example Code for Path-Based Routing**:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: path-routing-ingress
spec:
  rules:
  - host: my-app.example.com # Single domain for all routes
    http:
      paths:
      - path: /shop
        pathType: Prefix
        backend:
          service:
            name: shop-service # Routes requests with /shop to shop-service
            port:
              number: 80
      - path: /blog
        pathType: Prefix
        backend:
          service:
            name: blog-service # Routes requests with /blog to blog-service
            port:
              number: 80
```

**Explanation**:
- Requests with `/shop` go to `shop-service`, and `/blog` goes to `blog-service`.
- The `pathType` ensures matching all possible paths starting with `/shop` or `/blog`.

### Enabling TLS Termination

Ingress can terminate SSL/TLS connections, which means it handles HTTPS for you, forwarding decrypted traffic to the service.

**TLS Termination Example**:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tls-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  tls:
  - hosts:
    - my-app.example.com
    secretName: my-app-tls-secret # Secret containing TLS certificate and key
  rules:
  - host: my-app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-service
            port:
              number: 80
```

**Explanation**:
- The `tls` field lists the domain(s) secured with SSL/TLS.
- `secretName` refers to the Kubernetes secret that contains the TLS certificate and private key.
- Traffic to `https://my-app.example.com` will be terminated by the ingress and decrypted before reaching the backend.

**Creating A TLS Secret**:
To create the TLS secret, use this Kubernetes command:

```
kubectl create secret tls my-app-tls-secret --key tls.key --cert tls.crt
```

Provide your certificate (`tls.crt`) and private key (`tls.key`) file paths.

## The Marvelous Use Cases of an Ingress Controller

### 1. **Path-Based Routing**
Routing requests based on the URL paths is a powerful feature, as shown in the path-based routing example above. It ensures that different parts of your application are seamlessly accessible without needing additional load balancers.

### 2. **TLS Termination**
Securing traffic using HTTPS is a critical use case. You can manage multiple domains using ingress, each protected with distinct SSL/TLS certificates.

### 3. **Load Balancing**
Ingress controllers, by default, distribute traffic intelligently among backend pods. They integrate with Kubernetes' built-in service mechanisms for balanced distribution.

### 4. **Custom Rules and Rewrites**
Ingress annotations allow you to implement custom behavior, such as URL rewrites, header-based routing, or request blocking.

For example, add a custom rewrite annotation to the metadata:

```
annotations:
  nginx.ingress.kubernetes.io/rewrite-target: /
```

### 5. **Multiple Domains, One Cluster**
You can configure ingress for multiple domains, such as `store.example.com` and `api.example.com`, consolidating infrastructure and reducing complexity.

**Example** for multiple domains:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: multiple-hosts-ingress
spec:
  rules:
  - host: store.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: store-service
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
```

## Wrapping Up

Ingress controllers are the unsung MVPs of Kubernetes, quietly working behind the scenes to ensure your apps are accessible, organized, and secure. With step-by-step examples for basic configurations, path-based routing, and TLS termination, you can confidently deploy and manage external traffic within your Kubernetes cluster!

I've added some code extracts to your document, demonstrating how to use Kubernetes Ingress for basic configurations, path-based routing, and TLS termination. Let me know if there's anything else you need!