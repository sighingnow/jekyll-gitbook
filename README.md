---
layout: home
title: Human built  with mostly AI, some real world experience
permalink: /
---

I'm Jeff Kantarek, Rubyist and Elixir dev with a flare for F1, comics, cooking and showing up every day for my family. My main hobby is having hobbies.  My current obsession is remodeling my home that was originally built in 1892!

You can find me in [Wicker Park](https://maps.app.goo.gl/MgoNS4vy9iRwtg7k9) if you're on planet earth. You can also find me on [linkedin.com/in/jkantarek](https://linkedin.com/in/jkantarek) or see what I'm coding up on [github.com/jkantarek](https://github.com/jkantarek). I'm trying to get better at writing and communicating my ideas, if you care about that you're in the right place.

{% for post in site.posts %}
## [{{ post.title }}]({{ post.url | absolute_url }})
{{ post.excerpt }}
{% endfor %}