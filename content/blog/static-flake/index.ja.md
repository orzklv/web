+++
authors = ["Orzklv"]
title = "Static website via flake"
description = "Using docker for hosting static website is overkill, so why not give nix flake a chance?"
date = 2024-09-27
updated = "2024-09-27"
draft = true

[taxonomies]
tags = ["Nix", "Flake", "DevOps"]

[extra]
banner = "banner.webp"
toc = true
+++

## To docker, or not to docker

If you are reading this post, the chances are high that you know what is docker and already using it in your production applications, personal projects or just even doing basic things like, hosting static website in docker container. People say docker is lightweight comparing it to virtualization, but still it's using containerization based virtualization which is still at some point virtualization. Even though, to make use of docker containers, you need to go with certain linux distribution as a base for your container, so you can ship your final image based on something. However, it became a sort of tradition to go with something like **ubuntu** or **debian** which most of the times contain unnecessary bloats. The interesting part is, at the end of the day, you end up with a 500mb worth of image whereas your static website weighs only around 5mb and running another nginx on top of caddy proxy reverse seemed to be crazy ass idea.

## My problem with docker

It happened in Septemer, 2024, when I was pushing image of kolyma website to github registry. You see, I had a CI which took my static website repo and then stored it inside nginx docker container which would later be pushed to registry. The issue was that, when I push arm64 image to registry after x86_64, the x86_64 image gets to be deleted. I tried many workaround solutions and eventually gave up on using docker. Fortunately, I had NixOS running on all my servers with their config being exposed on GitHub for public use at [kolyma-labs/instances](https://github.com/kolyma-labs/instances). So, I said: "Why not ship flake instead of docker container".

## Let's flake

In this tutorial, we will be flaking my experimental zone, Kolyma's static website at [kolyma-labs/gate](https://github.com/kolyma-labs/gate). To get started, we have to make sure that we have Nix package manager installed
