---
title: Developer roadmapping - Clarity and Urgency
author: Jeff Kantarek
date: 2024-03-04
layout: post
mermaid: true
---

<div class="row">
  <div class="column" markdown="1" style="flex:30%">
  ![](assets/images/dev-in-a-forest.webp)
  </div>

  <div class="column" markdown="1" style="flex:70%">
  I've worked with a whole bunch of developers in my career. From bootcamp devs to staff ICs. I've tried to distill down what I think makes for a highly productive and effective individual contributor and what it takes to make software development a real career instead of just a hobby. There are a few things that makes the most productive devs stand out: They have a clear vision for what they are doing, they understand their tools, and they never stop investing in themselves.
  </div>
</div>

## Developing Clarity of Thought

Developing clarity of thought as a software developer, is understanding what and where you're building in a given moment. You are able to clearly articulate how your code ripples through the system you're building. How you present that code to others is equally clear. While that may seem like an overwhelming ask, especially as a junior developer, it is possible to do. The best way to start is take the time to break your tasks or features or whatever into 1 to 2 days of work.

<div class="row">
  <div class="column" markdown="1" style="flex:30%">
And I don't mean 1 to 2 days to get a PR up for someone to approve. **1 to 2 days _to production_**. If you can't break your work down that granularly, you likely don't understand a fundamental part of what you're building or how it fits in the system. Here's roughly the framework I use when breaking down work:
  </div>

  <div class="column" markdown="1" style="flex:70%">
![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmxrZTR6ZzZ5OHBmbmRhejJuNmxobm42eGUyNXlibm85YnozdHJ4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yv1ggi3Cbase05a8iS/giphy-downsized.gif)
  </div>
</div>

* **3rd Party API** - do I need to build or update an API client to get the data I need. This includes building any relevant mocks/fixtures to use for later testing.
* **Database Changes** - Adding new tables and/or columns to the database. Most devs want to package this with other work but end up burning time with deployment issues where app code is disjointed in a meaningful way from the database. Do yourself a favor and just deploy these separately. It will also force you to build your migrations _safely_ since you won't have app code to fall back on. See [pg_ha_migrations](https://github.com/braintree/pg_ha_migrations) if you're in the ruby world. But really these patterns are common for anyone working with a database and an ORM.
* **Model Changes** - Exposing your new column or table in your ORM or adding a new/uniq query to a model. Adding in relevant fixtures/datacases. This does _not_ include adding business logic to a model file, that is [Fat Model territory](https://medium.com/marmolabs/skinny-models-skinny-controllers-fat-services-e04cfe2d6ae).
* **Business Logic Changes** - The code that combines together multiple queries from the model layer and defines a public interface for your new shiny piece of data.
* **API Changes** - These are the changes that start to make your work useable by other parts of the system. This should include graphQL types/interfaces, API serializers, protobuf definitions, router layers whatever gets your data into and out of the system.
* **UI Changes** - Using and potentially editing your new data in the frontend.

There are a few other critical parts to this framework:
1. You should be adding valid unit tests every step of the way.
2. Each step should make the next step easier to write.
3. If you find testing your current step is hard, you likely have logic that needs to be extracted out somewhere.
4. If you are adding very disconnected ideas at a given stage you likely are trying to jam multiple _releases_ together.
5. It's _ok to release dark code_ eg code that nothing touches.

### Make it easy to always be done with _something_

A huge part of my life is wrapped up in the maker movement from the late 2000s. One of the most important things I realized is that it's more important to finish _something_ than to keep trying to figure out what to do next. The idea of this is distilled (at least for me) by the [Done Manifesto by Bre Pettis](https://medium.com/@bre/the-cult-of-done-manifesto-724ca1c2ff13) and [JFDI from Chicago's Pumping Station: One](https://wiki.pumpingstationone.org/wiki/Just_Fucking_Do_It). The done manifesto is worth reading in its entirety:

> **The Cult of Done Manifesto**
> 
> There are three states of being. Not knowing, action and completion.
> 
> Accept that everything is a draft. It helps to get it done.
> 
> There is no editing stage.
> 
> Pretending you know what you’re doing is almost the same as knowing what you are doing, so just accept that you know what you’re doing even if you don’t and do it.
> 
> Banish procrastination. If you wait more than a week to get an idea done, abandon it.
> 
> The point of being done is not to finish but to get other things done.
> 
> Once you’re done you can throw it away.
> 
> Laugh at perfection. It’s boring and keeps you from being done.
> 
> People without dirty hands are wrong. Doing something makes you right.
> 
> Failure counts as done. So do mistakes.
> 
> Destruction is a variant of done.
> 
> If you have an idea and publish it on the internet, that counts as a ghost of done.
> 
> Done is the engine of more.

<div class="row">
  <div class="column" markdown="1" style="flex:30%">
<a data-flickr-embed="true" href="https://www.flickr.com/photos/opacity/4012567553/in/album-72157623230988760/" title="psone--no longer kid-safe"><img src="https://live.staticflickr.com/2621/4012567553_17589d2f7d_3k.jpg" alt="psone--no longer kid-safe"/></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
 </div>

  <div class="column" markdown="1" style="flex:70%">
JFDI (Just Fucking Do It) is, surprisingly, a little more nuanced because...power tools. The other way to frame it is "Instead of complaining, fix the problem."  Start-up culture is largely realizing that everything isn't built, won't all get built today, and might not be worth building.  If you have a straight forward, reversible change, make the change. It's almost always ok to fix a crappy piece of code if you're running into it while you're adding functionality. If you have the right testing in place making that kind of change should be easy right? What isn't ok is spending 3+ weeks in a corner fixing something that annoys just you.
</div>
</div>

**You are responsible for getting your code to production.** If you're stuck, say something, ask in a public channel so your team can help unblock you. You should feel uncomfortable when your work gets stalled out.  The whole idea of this is typically talked about as **Urgency**.  Some organizations use manufactured urgency to try and increase productivity, deadlines, demands of all nighters ([🧠 need sleep](https://www.npr.org/2024/02/26/1233900923/charan-ranganath-biden-memory-what-we-remember)), etc.  Having your own sense of urgency is important.  If you're able to be clear with shaping out your work, when you reasonably expect each piece to be done it's clear and obvious for everyone around you what is going on _without having to check in_. It also provides a fantastic tool of pushing back on scope creep. Smaller code changes are easier to review, approve and merge and will typically carry less risk. Sandi Metz has so much amazing content on writing high quality code. I'll leave you with two of my favorites:

Small sensible "rules" to write better code:
<iframe width="560" height="315" src="https://www.youtube.com/embed/npOGOmkxuio?si=VbnBRV3IeabiA09a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Code smells and refactoring:
<iframe width="560" height="315" src="https://www.youtube.com/embed/PJjHfa5yxlU?si=q9v7r_G0BXEyIfhE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>