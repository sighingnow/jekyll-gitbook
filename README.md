---
layout: home
title: Human built  with mostly AI, some real world experience
permalink: /
---

Rubyist and Elixir dev with a flare for F1, comics, cooking and showing up every day for my family. My main hobby is having hobbies.  My current obsession is remodeling my home that was originally built in 1892!

{% for post in site.posts %}
## [{{ post.title }}]({{ post.url | absolute_url }})
{{ post.excerpt }}
{% endfor %}