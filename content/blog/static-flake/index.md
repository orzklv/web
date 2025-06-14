+++
title = "Static website via flake"
description = "Using docker for hosting static website is overkill, so why not give nix flake a chance?"
authors = ["Orzklv"]
date = 2024-09-27
updated = "2025-06-14"
draft = false

[taxonomies]
tags = ["Nix", "Flake", "DevOps"]

[extra]
banner = "banner.webp"
toc = true

disclaimer = """
- This tutorial expects from reader to have some experience on NixOS.
"""

[extra.comments]
host = "social.floss.uz"
user = "orzklv"
id = "114683093625327778"
+++

## To docker, or not to docker

If you are reading this post, the chances are high that you know what is docker and already using it in your production applications, personal projects or just even doing basic things like, hosting static website in docker container. People say docker is lightweight compared to virtualization, but still it's using containerization based virtualization which is still at some point virtualization, but a bit lighter. Even though, to make use of docker containers, you need to go with certain linux distribution as a base for your container, so you can ship your final image based on something. However, it became a sort of tradition to go with something like **ubuntu** or **debian** which most of the times contain unnecessary bloats. The interesting part is, at the end of the day, you end up with a 500mb worth of image whereas your static website weighs only around 5mbs and running another nginx on top of caddy proxy reverse seemed to be crazy ass idea.

## My problem with docker

It happened in Septemer, 2024, when I was pushing image of kolyma website to github registry. You see, I had a CI which took my static website repo and then stored it inside nginx docker container which would later be pushed to registry. The issue was that, when I push arm64 image to registry after x86_64, the x86_64 image gets to be deleted. I tried many workaround solutions and eventually gave up on using docker. Not only because of this, but updating docker images and doing lots of things manually by myself was also getting to my nerves. Fortunately, I had NixOS running on all my servers with their config being exposed on GitHub for public use at [kolyma-labs/instances](https://github.com/kolyma-labs/instances). So, I said: "Why not ship flake instead of docker container and plug nginx to it".

## Let's flake

In this tutorial, we will be flaking my experimental zone, Kolyma's static website at [kolyma-labs/gate](https://github.com/kolyma-labs/gate). To get started, we have to make sure that we have Nix package manager installed in our machine, so we can get to intereact and write our own configurations via Nix.

Assuming that you have a project at somewhere which looks like this:

```
.
└── src
    ├── assets
    │   └── favicon
    ├── index.html
    ├── libs
    │   └── something
    │       └── *.js
    └── styles
        └── *.css

```

In order to serve this static website bare-metal using nginx, we need to put `root` as the path of `src` directory and nginx will gladly serve our website. At NixOS, we will be following the same logic, but we need to package the project, so nginx root path will be set to packaged version of our project.

### Packaging

We need to start with initializing a flake by executing this command:

```bash
nix flake init
```

This will generate flake.nix at the root of our project. If we open it, we will see:

```nix
{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: {

    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;

    packages.x86_64-linux.default = self.packages.x86_64-linux.hello;

  };
}
```

As you can see, nix generated for us an entry flake.nix which will be used to refer to this project's reproducible environments and packages. At the moment, `inputs` includes the latest channel of `nixpkgs` which makes sure that we will be enjoying latest and greatest software published at `nixpkgs` whereas `outputs` is just a reference to 2 other existing pacakges. What we will do, is the following...

### Flake Utils

We will be using a helpful library named `flake-utils` which will make our code have less boilerplate. The easiest way to mention it is, if you look at the current packages list, you may see something like `x86_64-linux` which means only `x86_64-linux` machines can build and run this package. However, we don't want such limitations as static page isn't something platform bounded or repetetively declare packages for every type of platform. Thefefore, we will be making use of specific helpful functions delivered in `flake-utils` for such things.

First, we need to add `flake-utils` repository to inputs as following:

```nix
{
  description = "Our packaged website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    # Here we go
    flake-utils.url = "github:numtide/flake-utils";
  };

  ...
}
```

Afterwards, we need to change contents of `outputs` to this:

```nix
outputs =
  { nixpkgs
  , flake-utils
  , ...
  }: flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = nixpkgs.legacyPackages.${system};
  in
  {
    # Output packages
    packages.default = pkgs.callPackage ./. { };
  });
```

Here, we are using `eachDefaultSystem` delivered from `flake-utils` to generate `default` package for every defaulted package. If we fire up `nix repl` and check out what it has done, we will see something like this:

```
$ nix repl
Nix 2.28.3
Type :? for help.

nix-repl> :lf . # loads flake from current working directory
Added 15 variables.

nix-repl> outputs.packages
{
  aarch64-darwin = { ... };
  aarch64-linux = { ... };
  x86_64-darwin = { ... };
  x86_64-linux = { ... };
}

nix-repl>
```

I know, you expected to see only `default` because in `flake.nix`, we declared our package as `packages.default`, but we ended up getting things like `aarch64-darwin` or `x86_64-linux`. The thing is, `default` is there, just right after each of these platform declaration. Remember the default `x86_64-linux` only package references? Well, `eachDefaultSystem` took `packages.default` and inserted every default platform following this template `packages.<arch>.default` and now, we don't have to write default package reference for every platform manually.

Announcement of our package is done, and now, let's proceed to actual packaging process.

### Packaging

All we need to do here, is to explain nix to take whatever inside `src` and copy somewhere else. So this new place will be `package` itself. This is what we will be doing here in this process. If we refer to `flake.nix`, we have `pkgs.callPackage ./. { }` which means:

- Lookup for a file named `default.nix`.
- Refer to it as a `package` that has instructions to build it inside.
- Execute this `build` instructions and present the package.

So, as you may have guessed, we need to create a file at the root of our project named `default.nix`. Afterwards, we need to declare whatever about our package. You see, nix is a functional language and is all about declarativeness, so, our package is a function which will produce an set of attributions (think of it as object or json). Our function follows this sample syntax:

```nix
{ arg1, arg2 ? "defaulted-value" }:
let
  # Whatever temporary should be here
  computated-value = "${arg1.name} ${arg2}";
in
{
  # You can't write temporary values here
  # This is where you should return only results
  full-name = computated-value;
}
```

I very very hope you get the idea of it. And now, we will start writing our package, so first, we need to declare what kind of parameters we need:

```nix, hl_lines=1-3
{
  pkgs ? import <nixpkgs> {}, ...
}:
```

This translates to: "expect an argument named `pkgs` passed to this function that's registry of packages which holds all packages and helpful other functions, in case this parameter is missing or not passed, use system's package registry by default". We will need functions delivered inside package's registry while packaging. So, next step is to say that our function will return a `package` as a result which is translated to:

```nix, hl_lines=4-5
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
}
```

Now, nix knows that this function returns a package, but package's properties are missing and it doesn't still know tha name, version or build steps of this package. We will start right off by stating package's name and version like this:

```nix, hl_lines=5-6
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";
}
```

Alright, looks good! Now, let's say to Nix where it should locate all source codes of our static website. Well, as I've shown you before above, I got my website inside `src` folder at the root of our project. So, this will be my source code location for nix package:

```nix, hl_lines=8
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";

  src = ./src;
}
```

Now, nix knows where to get the source code, but still it has no idea what to do with them. Therefore, the next thing is going to be explaining what to do with them:

```nix, hl_lines=10-13
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";

  src = ./src;

  installPhase = ''
    mkdir -p $out
    mv ./* $out
  '';
}
```

If you have some experience on packaging for nix, you may have expected me to define `buildPhase`, but I straight proceeded to `installPhase`. Our website is static and doesn't need to be built. We only need to say nix to take all source code and place it inside package. `$out` in install phase refers to path where our package is initiated, we don't know exact location as nix decides it, so we will refer to it via `$out` variable and move all contents of our website to inside package. Phases are merely bash scripts with necessary values passed as envrionmental variables, not some magic voo-doo.

Noooow, let's attempt to build our package! Just call build command of nix for this and wait till it finished:

```bash
nix build .#default
# "." means -> refer to flake.nix at current working directory
# "#default" means -> refer to `default` value in `packages`

# or, simply

nix build
# both are default values, so no need to indicate it
```

Upon finishing it, a new directory will popup at the root path of our project namely `result` and if you open it, you'll see content of your website. Yay, buuuut it took some very long time to do it... Why?!

### Optimizing tricks

The thing is, `pkgs.stdenv.mkDerivation` loads whole c/c++ toolchain by default which weighs quite a lot just for building a package, in order to tell nix not to do that, we need to use another specific function which doesn't load `cc` toolchain which is `pkgs.stdenvNoCC.mkDerivation`.

```nix, hl_lines=4
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenvNoCC.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";

  src = ./src;

  installPhase = ''
    mkdir -p $out
    mv ./* $out
  '';
}
```

Build it again and it will finish very fast!

## Usage

As this tutorial expects you to have some experience on NixOS and a production NixOS configuration used by a server, you may want to go through [Nginx wiki page](https://nixos.wiki/wiki/Nginx) at [nixos.wiki](https://nixos.wiki) to get more idea on hosting websites on NixOS via Nginx.

First, we need to add our static website repository to the inputs section of our working nixos configurations. Remember adding `flake-utils` to inputs? The process is pretty same, but we need to change link to the repo here:

```nix
{
  description = "My NixOS configuration";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";

    # Yup, just like that
    our-website.url = "github:someone/ourweb";
  };

  ...
}
```

Assuming you have a working NixOS machine with some nginx config in it, we want to tell nginx to host our static website under a certain domain name, so basic template for this would be like this **(borrowed from nixos.wiki)**:

```nix
services.nginx.virtualHosts."myhost.org" = {
  addSSL = true;
  enableACME = true;
  root = "/var/www/myhost.org";
};
```

So, now we need to change domain of our website to something else, like `myblog.com` and tell nix that `root` is packaged version of our website that looks something like this:

```nix
# Assuming you have `pkgs` and `inputs` exposed in this part of configuration
services.nginx.virtualHosts."myblog.com" = {
  addSSL = true;
  enableACME = true;
  root = inputs.our-website.packages.${pkgs.stdenv.hostPlatform.system}.default;
};
```

This will build our package and store contents inside `/nix/store/blablasomehashsum-ourweb-0.1.0` and then nix will point root for our `myblog.com` website to the very same location automatically.

Next, we apply the configuration, you may mention nix generating `acme-myblog.com.service` like services as nixos automatically handles all certification generation by itself and make sure everything works just as expected without having to touch anything. Upon completion, open your browser with `myblog.com` address and you'll see your website.

## Conclusion

This tutorial also includes very basics of packaging on nix, so I can assure you that you got fundamentals after completing this tutorial. I'll write more of these posts as soon as I'll have more time. Writing a post is quite fun and not a problem for me, its just I have hard time translating every post to 2 other languages after finishing it which ends up taking waaaaay lotta time. If only I had someone to help with that, I could have published more posts as soon as possible.

With that being said, I wish you all good luck in your NixOS journey and hopefully this guide will become beginning of your great packaging journey!
