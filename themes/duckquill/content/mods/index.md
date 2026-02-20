+++
title = "Mods"
[extra]
toc = true
toc_sidebar = true
+++

Mods enhance/change some Duckquill visuals. They are updated alongside Duckquill to ensure that you don't need to manually update them every release.

To enable these mods, you need to paste provided Sass to [appropriate file](@/_index.md#custom-styles), e.g `sass/mods.scss` under your website, then enable it in `config.toml`:

```toml
[extra]
styles = ["mods.css"]
```

## Background Image

Want to set some nice image as a background? We got you covered:

![background image](https://files.catbox.moe/no8vfc.png)

```scss
body {
    background-image: var(--bg-overlay), url("https://images.unsplash.com/photo-1523712999610-f77fbcfc3843");
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}
```

Most of the time contrast should be okay, but what if it's not? Simply adjust the opacity of `--bg-overlay` based on your needs:

```scss
@import "../themes/duckquill/sass/_variables.scss";

@include theme-variables using ($theme) {
    @if $theme == "dark" {
        --bg-overlay: linear-gradient(rgb(0 0 0 / 0.9), rgb(0 0 0 / 0.9));
    }

    @else {
        --bg-overlay: linear-gradient(rgb(255 255 255 / 0.8), rgb(255 255 255 / 0.8));
    }
}
```

## Classic Article List

Prefer the less fancy look of the article list used in Duckquill some time ago (to some extent)? It can be done with the `classic-article-list` mod:

![classic article list](https://files.catbox.moe/yf5feo.png)

```scss
@use "../themes/duckquill/sass/mods/classic-article-list";
```

## Classic Navbar

You can make navbar have more traditional look by using the `classic-nav` mod:

![classic navabr](https://files.catbox.moe/ga4dmv.png)

```scss
@use "../themes/duckquill/sass/mods/classic-nav";
```

Or you can make it sticked to top but not full-width with the `sticked-nav` mod:

{% alert(note=true) %}
Not compatible with the `classic-nav` mod.
{% end %}

![sticked navabr](https://files.catbox.moe/bfu3p7.png)

```scss
@use "../themes/duckquill/sass/mods/sticked-nav";
```

## Classic Strikethrough

The default strikethrough style is too much? It can be fixed using the `classic-del` mod:

![plain strikethrough](https://files.catbox.moe/y2tbwm.png)

```scss
@use "../themes/duckquill/sass/mods/classic-del";
```

## Modern Headings

Default headings might not fit your taste, that's understandable. They can be ~~made boring~~ fixed with the `modern-headings` mod:

![boring headings](https://files.catbox.moe/6ok740.png)

```scss
@use "../themes/duckquill/sass/mods/modern-headings";
```

## Modern Horizontal Rule

Don't like that fancy horizontal rule? Make it more modern with the `modern-hr` mod:

![modern horizontal rule](https://files.catbox.moe/qyqzoy.png)

```scss
@use "../themes/duckquill/sass/mods/modern-hr";
```

## No Edge Highlight

Hate the skeuomorphic edge highlight on all semi-transparent elements? Let's get rid of it using the `no-edge-highlight` mod:

```scss
@use "../themes/duckquill/sass/mods/no-edge-highlight";
```
