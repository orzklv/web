+++
insert_anchor_links = "right"
title = "Home"
+++

{% crt() %}
```
      _          _          _          _          _
    >(')____,  >(')____,  >(')____,  >(')____,  >(') ___,
      (` =~~/    (` =~~/    (` =~~/    (` =~~/    (` =~~/
jgs~^~^`---'~^~^~^`---'~^~^~^`---'~^~^~^`---'~^~^~^`---'~^~^~
```
{% end %}

# Duckquill

Duckquill is a modern, pretty, and clean (and opinionated) [Zola](https://www.getzola.org) theme that has the purpose of greatly simplifying the process of rolling up your blog. It aims to provide all the needed options for comfortable writing, keeping the balance of it being simple.

Edit a bit of metadata and tweak some of the included graphics and have a blog up in minutes!

- Pretty, yet lightweight. No JavaScript is used (except for comments, heh).
- Colors are tinted with the user-selected primary color for a pleasant look.
- ~90kB in size; take that, 12MB Medium!
- Uses system fonts for blazingly fast loading.
- Mobile friendly, with a proper dark variant.
- Proper favicon for modern browsers and Apple device icons.
- Twitter, Mastodon and other social media meta cards for easy sharing. Try [Share Preview](https://apps.gnome.org/SharePreview/) to test.
- [Mastodon-powered comments](https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/); comment using compatible ActivityPub server by replying to a Mastodon post.

{% alert(note=true) %}
Duckquill is made based on needs of [my website](https://daudix.one), if you need some feature/configuration that doesn't exist feel free to open an issue or better yet, pull request!
{% end %}

## Installation

First, download this theme to your `themes` directory:

```sh
git clone https://codeberg.org/daudix/duckquill.git themes/duckquill
```

...or add as submodule for easy updating (recommended if you already have git setup on site):

```sh
git submodule init
git submodule add https://codeberg.org/daudix/duckquill.git themes/duckquill
```

{% alert(important=true) %}
It is highly recommended to switch from the `main` branch to the latest release:
{% end %}

```sh
cd themes/duckquill
git checkout tags/v3.2.1
```

To update the submodule, simply switch to a new tag:

{% alert(tip=true) %}
Check the changelog for all versions that came after the one you are using, there might be breaking changes that may need manual involvement.
{% end %}

```sh
git submodule update --remote --merge
git tag --list
git checkout tags/v3.2.1
```

Then, enable it in your `config.toml`:

```toml
theme = "duckquill"
```

## Options

Duckquill offers some configuration options to make it fit you better; most options have pretty descriptive comments, so it should be easy to understand what they do.

### Localization

Duckquill ships with a localization system based on one used in [tabi](https://github.com/welpo/tabi), it's very easy to use and quite flexible at the same time.

To add a translation, simply create a file in your site's `i18n` directory called `[lang-code].toml`, e.g `fr.toml`. The language code should be [ISO 639-1](https://localizely.com/iso-639-1-list/) or [BCP 47](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).

Inside that file, copy-paste one of the existing translations from Duckquill and adapt it to your needs. You can also check [tabi](https://github.com/welpo/tabi/tree/main/i18n) translation files for reference.

Additionally to translating Duckquill, you can also override the English stings by copy-pasting `en.toml` from Duckquill to the `i18n` directory of your website and adjusting the values to your liking.

### Custom Stylesheets

To add your own or override existing styles, create a custom stylesheet and add it in the `config.toml`:

```toml
[extra]
stylesheets = [
  "YOUR_STYLE.css"
]
```

Additional stylesheets are expected it to be in the `static` directory. If you are using Sass they will be compiled there by default.

If for some reason overridden style is not respected, try using `!important` (don't use it unless needed ). You can import styles from Duckquill using:

```scss
@use "../themes/duckquill/sass/NEEDED_FILE.scss";
```

You can also load stylesheets per page/section by setting them inside page's front matter:

```toml
[extra]
stylesheets = [
  "YOUR_STYLE.css",
  "ALSO_YOUR_STYLE.css"
]
```

### Primary Color

Duckquill respects chosen primary color everywhere, simply change the primary color in `config.toml`:

```toml
[extra]
primary_color = "COLOR_CODE"
primary_color_alpha = "COLOR_CODE"
```

### Favicon

Files named `favicon.png` and `apple-touch-icon.png` are used as favicon and apple touch icon respectively. For animated favicon you can use APNG with `png` file extension.

## Test Pages

- [Demo page](@/demo/index.md)
- [Cake Party!](@/demo/page.md)
- [ActivityPub/​Fediverse comments demo](@/demo/comments.md)
- [Code block demo (needs Zola v0.18.0 and higher)](@/demo/code.md)

## In the Wild

<details>
  <summary>This list is starting to get long, so click on it to expand it.</summary>

- [agustinramirodiaz.github.io](https://agustinramirodiaz.github.io)
- [alavi.me](https://alavi.me)
- [bano.dev](https://bano.dev)
- [blog.pansi21.xyz](https://blog.pansi21.xyz)
- [daudix.one](https://daudix.one) <small>(obviously)</small>
- [daveparr.info](https://www.daveparr.info)
- [digital-horror.com](https://digital-horror.com)
- [enriquekesslerm.com](https://enriquekesslerm.com)
- [gregorni.gitlab.io](https://gregorni.gitlab.io)
- [jzbor.de](https://jzbor.de)
- [licu.dev](https://licu.dev)
- [luciengheerbrant.com](https://luciengheerbrant.com)
- [lukoktonos.com](http://www.lukoktonos.com)
- [malloc.garden](https://malloc.garden)
- [mourelask.xyz](https://mourelask.xyz)
- [nbenedek.me](https://nbenedek.me)
- [notaplace.com](https://notaplace.com)
- [pyter.at](https://pyter.at)
- [rbd.gg](https://www.rbd.gg)
- [rerere.unlogic.co.uk](https://rerere.unlogic.co.uk)
- [siddharthsabron.in](https://siddharthsabron.in)
- [skaven.org](https://skaven.org)
- [sorcery.nexus](https://sorcery.nexus)
- [sorg.codeberg.page](https://sorg.codeberg.page)
- [sungsphinx.codeberg.page](https://sungsphinx.codeberg.page)
- [treeniks.github.io](https://treeniks.github.io)
- [vikramxd.github.io](https://vikramxd.github.io)
- [zorrn.net](https://www.zorrn.net)
- Yours? <small>(feel free to [contact me](https://daudix.one/find/#contacts) or send a pull request)</small>

</details>

## In Credits

- [andreatitolo.com](https://www.andreatitolo.com/credits)
- [aplos.gxbs.me](https://aplos.gxbs.me)
- [archaeoramblings.com](https://www.archaeoramblings.com/credits)
- [oomfie.town](https://oomfie.town/credits)
- [veeronniecaw.space](https://veeronniecaw.space)

## Assets Sources

All sources for Duckquill's assets are available [here](https://codeberg.org/daudix/archive/src/branch/main/duckquill/src) and licensed under CC BY-SA 4.0. The reason for not putting the sources in the same repo as Duckquill itself is simple: I want it to be as small as possible, so that repo cloning is fast and doesn't make the site significantly heavier; this is also why the demo uses remote images instead of local copies.

## Credits

- [Quill image used in the metadata card](https://commons.wikimedia.org/wiki/File:3quills.jpg)

## Tools Used

- [VSCodium](https://vscodium.com) - Free/Libre Open Source Software Binaries of VS Code
  - [Capitalize](https://marketplace.visualstudio.com/items?itemName=viablelab.capitalize) - Title capitalization without random websites.
  - [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml) - For `config.toml` basically.
  - [Monokai Pro](https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode) - Awfully pretty theme.
  - [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss) - Not sure if it actually works. ¯\\\_(ツ)_/¯
  - [Sort CSS](https://marketplace.visualstudio.com/items?itemName=piyushsarkar.sort-css-properties) - A lifesaver for long CSS properties.
  - [Tera](https://marketplace.visualstudio.com/items?itemName=karunamurti.tera) - Tera template engine (the one Zola uses) support.
- [Firefox developer tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools) - Best of its kind.

As for the code formatter I use built-in VSCodium one. Prettier is good but I don't like how it tries to make code fit in a very narrow column, this can be changed of course, but built-in formatter does it's job so I don't bother doing so.

## Thanks To

- [Jakub Steiner](https://jimmac.eu) for the [OS Component Website](https://jimmac.github.io/os-component-website), which served as a starting point and inspiration.
- [Carl Schwan](https://carlschwan.eu) for the [Mastodon-powered Comments](https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/).
- [Jonathan Neal](https://jonneal.dev) for the [normalize.css](https://csstools.github.io/normalize.css/).
- [Modern Font Stacks](https://modernfontstacks.com) for the system font stack.
- Everyone who supported me and said good stuff <3
