---
title: AI
layout: home
permalink: /ai/
is_category: true
description: AI engineering, LLM operations, and applied AI for platform teams.
---

AI engineering, LLM operations, and applied AI for platform & operations teams.

{% assign category_posts = site.categories.ai | default: site.posts | where: "category", "ai" %}
{% if category_posts.size == 0 %}
_No posts yet in this category._
{% else %}
{% for post in category_posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
{% endif %}

[← Back to home]({{ '/' | relative_url }})
