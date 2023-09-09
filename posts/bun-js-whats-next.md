---
title: First stable release of Bun.js! What's next?
description: My thoughts on the first stable release of Bun.js and what's next.
slug: bun-js-whats-next
date: September 9, 2023
---

Bun recently has released the first stable version of Bun.js. This is a big
milestone for the project. It's been a long time coming, and I'm excited to see
where it goes from here.

I've been using Bun.js for a while now for my experiments. It's been a great
tool for me to speed up my applications and create "sorta" blazing fast web
apps.

Seeing the first stable release of Bun.js has me thinking about what's next for
the project. After doing some thinking and research, I made a list of things
that would likely happen with Bun.js in the future.

## Vercel?

Vercel updates their platform to support latest version of Node.js and maintain
stable versions of Node.js. However, I've been thinking whether will Vercel
support Bun.js in the future. If you saw the video where Bun.js authors
announced the first stable release of Bun.js, you might have noticed that
[they mentioned](https://youtu.be/BsnCpESUEqM?si=gIDK1yfMJ4msx_y-&t=516) that
they are going to create a solution to deploy Bun.js apps which actually hints
that they are going to create their own hosting platform for Bun.js apps.
Because of this, Vercel would not support Bun.js and stick with Node.js OR
cooperate with Bun.js authors to support Bun.js. I'm not sure what will happen,
but I'm excited to see what will happen.

## What's gonna happen with Deno?

Deno is a JavaScript/Typescript runtime created by Ryan Dahl, the creator of
Node.js. Deno is a great runtime, but it's not as popular as Node.js amongst
companies and startups. Deno.land team is trying their best to make Deno more
popular by adding more APIs and integrating platforms to their runtime like Deno
KV and others. However, due to Deno's lack of support for many of Node.js'es
popular frameworks like Next.js, Svelte or Vue, Deno is not getting much
attention. Deno has its own framework called Fresh but the framework lacks of
community support and modules that Node.js has. I think, Deno will be popular
amongst serverless solutions like Cloudflare Workers, or serverless
infrastructures whereas Bun.js will be popular amongst companies and startups
which will continue maintaining projects written in Node.js.

> I love Deno's binary compilation and whether how they are portable. However, I
> can't use it at work which leaves me only one option to use Deno for my
> personal projects.

## Early days of shiny Bun.js

Bun.js is a new shiny framework and it's still just getting started. It's
just getting popular amongst developers. I think, it will take some time until
Bun.js will become popular amongst companies and startups and people will start
using it at work, like, solid 2-3 years will be spent to become at least some
part of mainstream. Until so, I would love to see Bun.js getting more
improvements and features.
