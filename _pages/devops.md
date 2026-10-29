---
title: DevOps
layout: home
permalink: /devops/
is_category: true
description: DevOps best practices, methodologies, and tooling.
---

Best practices, methodologies, and tooling for modern DevOps teams.

{% assign category_posts = site.categories.devops | default: site.posts | where: "category", "devops" %}
{% if category_posts.size == 0 %}
_No posts yet in this category._
{% else %}
{% for post in category_posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
{% endif %}

[← Back to home]({{ '/' | relative_url }})
