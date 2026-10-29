---
layout: home
title: "BeOps: shipping AI that stays up. Evaluation, cost and reliability, from an SRE's notebook"
permalink: /
---

Welcome to BeOps, your comprehensive resource for DevOps best practices, Kubernetes deep dives, Site Reliability Engineering (SRE) principles, and applied AI for operations.

## 📝 All posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url | relative_url }}) <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
{% endfor %}

## 🔗 Quick Links

- [RSS Feed]({{ '/feed.xml' | relative_url }}): subscribe to updates
