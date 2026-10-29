---
title: SRE
layout: home
permalink: /sre/
is_category: true
description: Site Reliability Engineering principles and practices.
---

Site Reliability Engineering: SLOs, incident response, and reliability patterns.

{% assign category_posts = site.categories.sre | default: site.posts | where: "category", "sre" %}
{% if category_posts.size == 0 %}
_No posts yet in this category._
{% else %}
{% for post in category_posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
{% endif %}

[← Back to home]({{ '/' | relative_url }})
