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

[extra.comments]
host = "social.floss.uz"
user = "orzklv"
id = "114683093625327778"
+++

## Dockerʼni ishlatish yo ishlatmaslik

Agar siz bu postni o'qiyotgan bo'lsangiz, katta ehtimol bilan docker nima ekanligini bilishingiz va uni real ilovalaringizda, shaxsiy loyihalaringizda yoki hatto statik veb-saytni docker konteynerida host qilish kabi oddiy narsalarni bajarishda foydalanayotgan boʻlishingiz mumkin. Insonlar dockerʼni virtualizatsiyaga solishtirib yengil deb aytishadi, lekin u baribir konteynerizatsiya asosidagi virtualizatsiyani ishlatmoqda, bu esa baʼzi nuqtalarda virtualizatsiya hisoblanadi. Docker konteynerlaridan foydalanish uchun, siz konteyneringiz uchun asos sifatida maʼlum bir linux distro bilan borishingiz kerak, shunda siz oxirgi natijangizni biror narsaga asoslangan holda joʻnata olasiz. Biroq, bu har doim **ubuntu** yoki **debian** kabi distroʼlar bilan ishlatish anʼanasiga aylana boshladi, bu koʻpincha keraksiz ortiqchaliklarni oʻz ichiga oladi. Qiziq tomoni shundaki, kun oxirida sizda 500mb qiymatidagi tasvir qoladi, holbuki sizning statik veb-saytingiz faqat 5mb atrofida va “caddy” proksisi ustida yana bitta “nginx” ishlatish gʻalati fikrga o'xshaydi. 

## Mening “docker” bilan muammom

It happened in Septemer, 2024, when I was pushing image of kolyma website to github registry. You see, I had a CI which took my static website repo and then stored it inside nginx docker container which would later be pushed to registry. The issue was that, when I push arm64 image to registry after x86_64, the x86_64 image gets to be deleted. I tried many workaround solutions and eventually gave up on using docker. Fortunately, I had NixOS running on all my servers with their config being exposed on GitHub for public use at [kolyma-labs/instances](https://github.com/kolyma-labs/instances). So, I said: "Why not ship flake instead of docker container".

Bu 2024-yil sentyabrda, men kolyma veb-saytining rasmini github registriga yuklashga harakat qilayotganimda boʻldi. Qarangki, mendagi statik veb-sayt repoʼni olib, keyin uni “nginx”, “docker” konteynerida saqlaydigan “CI” bor edi, keyinchalik esa registrʼga yuborilardi. Masala shundaki, men arm64 tasvirini x86_64 dan keyin registrga yuborganda, x86_64 tasviri oʻchiriladi. Men kp'plab muqobil yechimlarni sinab koʻrdim va oxir-oqibat dockerʼdan foydalanishni toʻxtatdim. Yaxshiyamki, barcha serverlarimda NixOS oʻrnatilgan edi va ularning konfiguratsiyasi jamoatchilik foydalanishi uchun GitHubʼda [kolyma-labs/instances](https://github.com/kolyma-labs/instances) manzilida ochiq holda mavjud edi. Shunday qilib, men dedim: "Nima uchun Docker konteyneridan “flake” ga oʻtmaymiz?"

## Keling “flake” qilaylik

Bu qoʻllanmada biz tajriba zonamiz boʻlgan Kolymaʼning statik saytini “flake” qilishni oʻrganamiz: [kolyma-labs/gate](https://github.com/kolyma-labs/gate). Boshlash uchun, bizda Nix paket menejeri oʻrnatilganligiga ishonch hosil qilishimiz kerak.
