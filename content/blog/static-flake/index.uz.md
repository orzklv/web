+++
title = "Flake orqali statik veb-sayt"
description = “Statik veb-saytlarni host qilish uchun dockerʼdan foydalanish ortiqcha ish, shu sababdan, nix flakeʼga imkon berib koʻrmaymizmi?”
authors = ["Orzklv"]
date = 2024-09-27
updated = "2024-09-27"
draft = false

[taxonomies]
tags = ["Nix", "Flake", "DevOps"]

[extra]
banner = "banner.webp"
toc = true

disclaimer = """
- Ushbu qoʻllanma oʻquvchidan NixOS-da biroz tajribaga ega boʻlishini kutadi.
- """

[extra.comments]
host = "social.floss.uz"
user = "orzklv"
id = "114683093625327778"
+++

## Dockerʼni ishlatish yo ishlatmaslik

Agar siz bu postni o'qiyotgan bo'lsangiz, katta ehtimol bilan docker nima ekanligini bilishingiz va uni real ilovalaringizda, shaxsiy loyihalaringizda yoki hatto statik veb-saytni docker konteynerida host qilish kabi oddiy narsalarni bajarishda foydalanayotgan boʻlishingiz mumkin. Insonlar dockerʼni virtualizatsiyaga solishtirib yengil deb aytishadi, lekin u baribir konteynerizatsiya asosidagi virtualizatsiyani ishlatmoqda, bu esa baʼzi nuqtalarda virtualizatsiya hisoblanadi. Docker konteynerlaridan foydalanish uchun, siz konteyneringiz uchun asos sifatida maʼlum bir linux distro bilan borishingiz kerak, shunda siz oxirgi natijangizni biror narsaga asoslangan holda joʻnata olasiz. Biroq, bu har doim **ubuntu** yoki **debian** kabi distroʼlar bilan ishlatish anʼanasiga aylana boshladi, bu koʻpincha keraksiz ortiqchaliklarni oʻz ichiga oladi. Qiziq tomoni shundaki, kun oxirida sizda 500mb qiymatidagi tasvir qoladi, holbuki sizning statik veb-saytingiz faqat 5mb atrofida va “caddy” proksisi ustida yana bitta “nginx” ishlatish gʻalati fikrga o'xshaydi. 

## Mening “docker” bilan muammom

Bu 2024-yil sentyabrda, men kolyma veb-saytining rasmini github registriga yuklashga harakat qilayotganimda boʻldi. Qarangki, mendagi statik veb-sayt repoʼni olib, keyin uni “nginx”, “docker” konteynerida saqlaydigan “CI” bor edi, keyinchalik esa registrʼga yuborilardi. Masala shundaki, men arm64 tasvirini x86_64 dan keyin registrga yuborganda, x86_64 tasviri oʻchiriladi. Men kp'plab muqobil yechimlarni sinab koʻrdim va oxir-oqibat dockerʼdan foydalanishni toʻxtatdim. Yaxshiyamki, barcha serverlarimda NixOS oʻrnatilgan edi va ularning konfiguratsiyasi jamoatchilik foydalanishi uchun GitHubʼda [kolyma-labs/instances](https://github.com/kolyma-labs/instances) manzilida ochiq holda mavjud edi. Shunday qilib, men dedim: “Nima uchun “flake” ga “nginx” ulab ishlatishni oʻrniga “docker” konteyner ishlatish kerak?“

## Keling “flake” qilaylik

Bu qoʻllanmada biz tajriba zonamiz boʻlgan Kolymaʼning statik saytini “flake” qilishni oʻrganamiz: [kolyma-labs/gate](https://github.com/kolyma-labs/gate). Boshlash uchun, bizda Nix paket menejeri oʻrnatilganligiga ishonch hosil qilishimiz kerak.

Agar sizda biror joyda shunday ko'rinadigan loyihangiz bor deb faraz qilsangiz:

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

Ushbu statik veb-saytga nginx yordamida xizmat koʻrsatish uchun biz “root"ni “src” katalogiga qoʻyishimiz kerak va nginx bizning veb-saytimizga mamnuniyat bilan xizmat qiladi. NixOS-da biz bir xil mantiqqa amal qilamiz, lekin biz loyihani paketlashimiz kerak, shuning uchun nginx “root” yoʻli loyihamizning paketlangan versiyasiga o'rnatiladi.

### Paketlash

Biz ushbu buyruqni bajarish orqali flakeʼni boshlashimiz kerak:

```bash
nix flake init
```

Bu bizning loyihamizning asosiy papkasida flake.nix faylini yaratadi. Agar biz uni ochsak, biz quyidagilarni koʻramiz :

```nix
{
  description = "Juda oddiy flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: {

    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;

    packages.x86_64-linux.default = self.packages.x86_64-linux.hello;

  };
}
```

Koʻrayotganingizdek, nix biz uchun flake.nix nomli yozuvni yaratdi, bu loyiha uchun takrorlanadigan muhitlar va paketlarni koʻrsatish uchun ishlatiladi. Hozirda, `inputs` `nixpkgs`-ning eng soʻnggi kanali­ni oʻz ichiga oladi, bu esa bizga `nixpkgs`da chiqarilgan eng soʻnggi va eng aʼlo dasturlardan bahramand boʻlish imkonini beradi, `outputs` esa faqat 2 ta boshqa mavjud paketga havoladir. Biz qiladigan narsalarimiz shunday…

### Flake Utils

`flake-utils` nomli foydali kutubxonadan foydalanamiz, bu bizning kodimizning boilerplate qismini kamaytirishga yordam beradi. Buni aytishning eng oson yoʻli shundaki, agar siz hozirgi paketlar roʻyxatiga qarasangiz, `x86_64-linux` kabi biror narsani ko'rishingiz mumkin, bu esa faqat `x86_64-linux` mashinalari ushbu paketi qurish va ishga tushirishlari mumkinligini anglatadi. Biroq, biz bunday cheklovlarni xohlamaymiz, chunki statik sahifa platforma bilan bogʻliq emas yoki har bir turdagi platforma uchun takroran paketlarni eʼlon qilish emas. Shuning uchun biz bunday narsalar uchun `flake-utils` tomonidan taqdim etilgan maxsus foydali funksiyalardan foydalanamiz.

Birinchidan, biz `flake-utils` repositoriyasini quyidagicha `inputs`-ga qo'shishimiz kerak:
```nix
{
  description = "Bizning vebsaytimiz";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    # Qani boshladik
    flake-utils.url = "github:numtide/flake-utils";
  };

  ...
}
```

Keyin, biz `outputs` chiqishini quyidagi holatga oʻzgartirishimiz kerak:

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
    # Chiqarish paketlari
    packages.default = pkgs.callPackage ./. { };
  });
```

Bu yerda, har bir standartlashtirilgan platforma uchun `default` paketini ishlab chiqarish uchun `flake-utils` dan taqdim etilgan `eachDefaultSystem`-dan foydalanamiz. Agar biz `nix repl`-ni ishga tushirsak va uning nima qilganini tekshirsak, bunday narsani koʻramiz:

```
$ nix repl
Nix 2.28.3
Type :? for help.

nix-repl> :lf . # hozirgi ish papkasidan flake yuklaydi
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

So, as you may have guessed, we need to create a file at the root of our project named `default.nix`. Afterwards, we need to declare whatever about our package. You see, nix is a functional language and is all about declarativeness, so, our package is a function which will produce a set of attributions (think of it as an object or json). Our function follows this sample syntax:

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

This translates to: "expect an argument named `pkgs` passed to this function that's a registry of packages which holds all packages and helpful functions, in case this parameter is missing or not passed, use system's package registry by default". We will need functions delivered inside package's registry while packaging. So, next step is to say that our function will return a `package` as a result which is translated to:

```nix, hl_lines=4-5
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
}
```

Now, nix knows that this function returns a package, but package's properties are missing and it doesn't still know the name, version or build steps of this package. We will start right off by stating package's name and version like this:

```nix, hl_lines=5-6
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";
}
```

Alright, looks good! Now, let's say to Nix where it should locate all source code of our static website. Well, as I've shown you before, I got my website inside `src` folder at the root of our project. So, this will be my path for source code:

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

Now, nix knows where to get the source code from, but still it has no idea what to do with it. Therefore, the next thing is going to be explaining what to do with it:

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

If you have some experience on packaging for nix, you may have expected me to define `buildPhase`, but I straight proceeded to `installPhase`. Our website is static and doesn't need to be built. We only need to say nix to take all source code and place it inside package. `$out` in install phase refers to path where our package will be initiated by nix, we don't know exact location as nix decides it, so we will refer to it via `$out` variable and move all contents of our website to inside package. Phases are merely bash scripts with necessary values passed as envrionmental variables, not some magic voo-doo.

Noooow, let's attempt to build our package! Just call build command of nix for this and wait till it finishes:

```bash
nix build .#default
# "." means -> refer to flake.nix at current working directory
# "#default" means -> refer to `default` value in `packages`

# or, simply

nix build
# both are default values, so no need to indicate it
```

Upon finishing it, a new directory will popup at the root path of our project namely `result` and if you open it, you'll see contents of your website. Yay, buuuut it took some very long time to do it... Why?!

### Optimizing tricks

The thing is, `pkgs.stdenv.mkDerivation` loads whole c/c++ toolchain by default which weighs quite a lot just for building a static website package, in order to tell nix not to do that, we need to use another specific function which doesn't load `cc` toolchain which is `pkgs.stdenvNoCC.mkDerivation`.

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

So, now we need to change domain name of our future website to something else, let's say `myblog.com` and tell nix that `root` is packaged version of our website that looks something like this:

```nix
# Assuming you have `pkgs` and `inputs` exposed in this part of configuration
services.nginx.virtualHosts."myblog.com" = {
  addSSL = true;
  enableACME = true;
  root = inputs.our-website.packages.${pkgs.stdenv.hostPlatform.system}.default;
};
```

This will build our package and store contents at `/nix/store/blablasomehashsum-ourweb-0.1.0` and then nix will point root for our `myblog.com` website to the very same location automatically.

Next, we apply the configuration, you may mention nix generating `acme-myblog.com.service` like services as nixos automatically handles all certification generation by itself and make sure everything works just as expected without having to touch anything. Upon completion, open your browser with `myblog.com` address and you'll see your website.

I have my own working production at [kolyma.uz](https://kolyma.uz) if you want to check out.

## Conclusion

This tutorial also includes very basics of packaging on nix, so I can assure you that you got fundamentals after completing this tutorial. I'll write more of these posts as soon as I'll have more time. Writing a post is quite fun and not a problem for me, its just I have hard times translating every post to 2 other languages after finishing it which ends up taking waaaaay lotta time, not to mention re-reading it to fix typos later. If only I had someone to help with that, I could have published more posts.

With that being said, I wish you all good luck in your NixOS voyage and hopefully this guide will become beginning of your great packaging journey!

