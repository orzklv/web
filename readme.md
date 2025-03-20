<p align="center">
    <img src=".github/assets/header.png" alt="Orzklv's {Website}">
</p>

<p align="center">
    <h3 align="center">My personal website via Zola and Duckquill.</h3>
</p>

<p align="center">
    <img align="center" src="https://img.shields.io/github/languages/top/orzklv/web?style=flat&logo=nixos&logoColor=ffffff&labelColor=242424&color=242424" alt="Top Used Language">
    <a href="https://github.com/orzklv/web/actions/workflows/deploy.yml"><img align="center" src="https://img.shields.io/github/actions/workflow/status/orzklv/web/deploy.yml?style=flat&logo=github&logoColor=ffffff&labelColor=242424&color=242424" alt="Deploy CI"></a>
</p>

## About

This is my personal website where I write my own thoughts on whatever comes to my mind, whatever I see, whatever makes me emotional on a certain thing. This is, the world in which you can see things from my point of view!

## Development

This project has a submodule (or maybe more in the future), so in order to unnecessary commands, just clone my repository with its submodules from the beginning:

```shell
git clone --recurse-submodules git://github.com/orzklv/web.git
```

or, if you cloned, but no submodules, let's fetch'em all, shall we?

```shell
cd web
git submodule update --init
```

Afterwards, you need nix to open development environment via flakes:

```shell
nix develop -c $SHELL
```

## Build

I've spent some time to write a flake package which you can use to build my website instantly. All you need to do is:

```shell
# params necessary, blame
# nix submodule problem
nix build ".?submodules=1#" -L
```

## Thanks

- [Zola](https://www.getzola.org/) for making my life easier and not suffer with frontend hell.
- [Duckquill](https://duckquill.daudix.one/) & [daudix](https://daudix.one/) for this website’s theme and inspiration.

## License

This project is licensed under the CC-BY-4.0 License - see the [LICENSE](license) file for details.

<p align="center">
    <img src=".github/assets/footer.png" alt="Orzklv's {Website}">
</p>
