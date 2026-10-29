---
title: Job Interviews
layout: home
permalink: /job-interviews/
is_category: true
description: Interviews I've taken plus prep notes for SRE, DevOps, AI, and platform roles.
---

First-person interview write-ups and prep notes for SRE, DevOps, AI, and platform engineering roles.

{% assign category_posts = site.categories.job-interviews | default: site.posts | where: "category", "job-interviews" %}
{% if category_posts.size == 0 %}
_No posts yet in this category._
{% else %}
{% for post in category_posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
{% endif %}

[← Back to home]({{ '/' | relative_url }})
