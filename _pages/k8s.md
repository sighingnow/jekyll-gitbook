---
title: Kubernetes
layout: home
permalink: /k8s/
is_category: true
description: Kubernetes deep dives, patterns, and operations.
---

Container orchestration, cluster operations, and Kubernetes patterns.

{% assign category_posts = site.categories.k8s | default: site.posts | where: "category", "k8s" %}
{% if category_posts.size == 0 %}
_No posts yet in this category._
{% else %}
{% for post in category_posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
{% endif %}

[← Back to home]({{ '/' | relative_url }})
