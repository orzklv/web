<header>
<img src="https://www.katsuki.moe/favicons/pinned.svg" alt="logo" height="100" align="left">
<h1 style="display: inline">Website</h1>

My own website where I share my blog posts and media contents.

[![GitHub top language](https://img.shields.io/github/languages/top/katsuki-yuri/website?style=flat-square&logo=github)](https://github.com/katsuki-yuri/website)
[![Channel](https://img.shields.io/badge/Chat-grey?style=flat-square&logo=telegram)](https://t.me/yurionblog)
[![Test CI](https://github.com/katsuki-yuri/website/actions/workflows/test.yml/badge.svg)](https://github.com/katsuki-yuri/website/actions/workflows/test.yml)

</header>

## About

The Website runs on top of the latest version of Next.js and Node.js. Pretty nothing special. Just a website built with React components and css.

> I host all contents statically, so you may correct me up by sending a pull request.

## Features

- Markdown content renders
- Minecraft server status api
- Additional contents (like my favorite musics)
- Spotify live integration
- Docker image for easy deployment

## Development

In order to run the website, just install the latest LTS version of Node.js (it's 18.x.x at the moment) and make sure you have pnpm installed globally. Then run
the following commands:

```bash
pnpm install
pnpm run dev
```

## Docker

Also, you may actually run the docker image hosted on GitHub Container Registry:

```bash
docker run -p 3000:3000 ghcr.io/katsuki-yuri/website:latest
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
