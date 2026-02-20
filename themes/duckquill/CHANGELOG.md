# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://codeberg.org/daudix/duckquill/compare/v6.3.0...main)

- Add support for GitHub-style alerts introduced in Zola 0.21.0 (#175).
- Respect `extra.nav.show_theme_switcher` setting even if `extra.default_theme` is set (#173).
- Store icons in a separate stylesheet (#171).
- Use font size defined in browser by user instead of hardcoded 16px size.

## [v6.3.0](https://codeberg.org/daudix/duckquill/compare/v6.2.0...v6.3.0) - 2025-04-19

### Added

- Add German translation (#130).

### Fixed

- Output an error message if title is not set in `config.toml` (#129).

## [v6.2.0](https://codeberg.org/daudix/duckquill/compare/v6.1.1...v6.2.0) - 2025-03-30

### Added

- Add ability to disable share preview card altogether by setting `config.extra.card` to `false` (#122).
- Add ability to turn on "go to top" button on regular pages by setting `page.extra.go_to_top` or `section.extra.go_to_top` to `true` (#115).
- Add French translation (#113).
- Provide a way to subscribe to the tag feed (#104).

### Changed

- Convert all icons to CSS variables for de-duplication and easier replacement.
- Don't use all available width for table of contents sidebar.

### Fixed

- Fix build failing if social sharing button is enabled and page is missing a description (#114).
- Fix build failing if taxonomies in config are set to anything other than "tags" (#126).

### Removed

- Remove `extra.fix_contrast` and `extra.fix_contrast_dark` config/page/section variables in favor of automatic contrast color picking (#43).

## [v6.1.1](https://codeberg.org/daudix/duckquill/compare/v6.1.0...v6.1.1) - 2024-12-01

### Fixed

- Fix translation of table of contents heading.

## [v6.1.0](https://codeberg.org/daudix/duckquill/compare/v6.0.0...v6.1.0) - 2024-12-01

### Added

- Add `toc_sidebar` page/section variable for turning table of contents to a sidebar.

### Changed

- Don't scale down article cards when clicking on tags in them.
- Improve performance of the page when navbar is hidden by using the `config.extra.nav.auto_hide` config variable.
- Improve tab title generation.
- Replace `config.extra.debug_*` config variables with variables under the `config.extra.debug` section.

### Fixed

- Fix navbar not scrolling with content on mobile (#109).

## [6.0.0](https://codeberg.org/daudix/duckquill/compare/v5.4.0...v6.0.0) - 2024-11-03

### Added

- Add `bg-overlay` CSS variable to make setting page background image easier.
- Add `classic-article-list` mod for returning the classic article list style.
- Add `config.extra.debug_no_styles` config variable for debugging.
- Add `config.extra.nav.auto_hide` config variable for making the navbar auto-hide unless hovered or keyboard-focused (#106).
- Add `config.extra.show_backlinks` config variable for showing the backlinks button for linked articles in the article's quick actions.
- Add `external` class to `https://` links in navbar/footer.
- Add `fediverse:creator` meta tag.
- Add `shadow-glow` and `text-shadow-glow` CSS variables so that it's easier to use these.
- Add `title` class for use on `<strong>`.
- Add back support for lazy async images in comments.
- Add missing translation strings for author separator and conjunctions.
- Add shortcode for Mastodon post embedding.
- Add support for blurred media in comments.
- Add support for content warnings (CWs) in comments.
- Add support for Fuse.js search (#101).
- Add support for preview cards in comments.
- Add the ability to set video attributes via shortcode.

### Changed

- **[BREAKING]** Rename `dialog-buttons` class to simply `buttons`.
- **[BREAKING]** Rename `nav-bg` CSS variable to `glass-bg`.
- **[BREAKING]** Rename `show_read_time` to `show_reading_time`.
- **[BREAKING]** Rename main content ID from `main` to `main-content`.
- **[BREAKING]** Rename the visually hidden `hidden` class to `visually-hidden`. `hidden` is now used to completely hide the elements, including from screen readers.
- **[BREAKING]** Use `main` for main content instead of `div` with a `container` class.
- Add default width/height to the `icon` class.
- Adjust navbar, main content, and footer margins.
- Improve the look of threads in comments.
- Keep images slightly rounded on hover.
- Make `emoji` class available outside of comments.
- Make the code and styling for article cards much cleaner.
- Make the shortcodes code much cleaner.
- Remove top/bottom margin from the first/last element in `<aside>`.
- Replace "Go Back" button with "Go Home" on 404.
- Rewrite JavaScript scripts to not rely on being inline, but rather function as separate files, as required by Content Security Policy.
- Tighten the default Content Security Policy.
- Use Zola's built-in reading time variable instead of the custom implementation (#102).

### Fixed

- Fix article cards missing a focus outline.
- Fix hover state of custom emojis in comments.
- Fix hover state of the "Load Comments" button.
- Fix navbar mods having broken border radius.

### Removed

- **[BREAKING]** Remove `container` class in favor of styling the `main` element directly.
- Remove `inline-button` class and instead apply button styles by default.

## [5.4.0](https://codeberg.org/daudix/duckquill/compare/v5.3.2...v5.4.0) - 2024-10-06

### Added

- Add `external` class to the "Website Source" link in footer.
- Add ability to enable inline table of contents in articles (#94 and #95).
- Add ability to make table of contents use numbered lists (#95).
- Add ability to open search by pressing the slash key.
- Add Farsi translation (#98).
- Add Simplified Chinese translation (#97).
- Add support for Content Security Policy (#90).

### Changed

- Adjust strings to make translation to specific languages possible (#100).
- Change fleuron style.
- Focus search after opening it.
- Make the entire article card clickable (#92).
- Move quick navigation buttons to the top on mobile.
- Return some `-webkit-` prefixes for wider compatibility.

## [5.3.2](https://codeberg.org/daudix/duckquill/compare/v5.3.1...v5.3.2) - 2024-10-02

### Fixed

- Fix navbar blur covering the entire page on mobile (#93).

## [5.3.1](https://codeberg.org/daudix/duckquill/compare/v5.3.0...v5.3.1) - 2024-09-30

### Changed

- Recolor list bullets in GitHub-style alerts.

### Fixed

- Fix backdrop blur of dropdowns and search container in Chrome (#77 and #91).
- Fix height of search bar in Chrome.

## [5.3.0](https://codeberg.org/daudix/duckquill/compare/v5.2.0...v5.3.0) - 2024-09-29

### Added

- Add `defer` attribute to scripts.

### Changed

- Allow enabling KaTeX per page/section.
- Improve the logic of inclusion feeds in `<head>`.
- Prevent articles in the article list from having multiple visual types at once (i.e., archived and featured badges at the same time).
- Restyle the heading anchors.

## Fixed

- Fix CRT code blocks preferring syntax highlighting color instead of an accent color.
- Fix height of "Skip to Main Content" button.
- Fix various RTL issues (broken toggles, article list arrow, unmirrored icons).

## [5.2.0](https://codeberg.org/daudix/duckquill/compare/v5.1.0...v5.2.0) - 2024-09-25

### Added

- Add `closable` class for making `details` closable when other `details` is open/outside area is clicked.
- Add Duckquill "mods" as a replacement to "tricks" (#88).
- Add post tags back to `article.html`.
- Add Spanish translation (#87).

### Changed

- Center the title in `article.html` pages.
- Change "From newest to oldest" in the article list to total amount of posts (#85).
- Convert code block header to a flexbox.
- Get rid of dashed outline on article hover in article list.
- Make comment actions slimmer.
- Make navabr menu/search open animation nicer (scale up instead of just fading from transparency).
- More visually interesting dropdown open animation.
- More visually interesting paginator.
- Move paginator from `articles.html` to `article-list.html`.
- Tweak styling of `details`.

## Fixed

- Fix spacing between article heading and description in article list if badge is present.

## [5.1.0](https://codeberg.org/daudix/duckquill/compare/v5.0.0...v5.1.0) - 2024-09-20

### Added

- Add support for [pagination](https://www.getzola.org/documentation/templates/pagination/) (#81).

### Changed

- Improve disabled checkbox/radio styling.
- Increase hover scale of aside images.
- Make the table layout automatic.
- Rotate comment actions to the opposite direction for RTL languages.
- Scale up the blurred article banner in article list on hover.
- Simplify prev/next post nav styles.
- Use decimals instead of percents (again).

## [5.0.0](https://codeberg.org/daudix/duckquill/compare/v4.8.0...v5.0.0) - 2024-09-18

### Added

- Add `--color-opacity` CSS variable for setting global color opacity.
- Add `--dim-opacity` CSS variable for setting opacity of dimmed elements.
- Add `--disabled-opacity` CSS variable for setting opacity of disabled elements.
- Add `--hover` CSS variable for setting zoom on hover.
- Add `--shadow-glass` CSS variable for setting shadow for glass-like elements.
- Add `config.extra.bundled_fonts` config variable to use custom fonts instead of system (#44).
- Add `config.extra.show_share_button` config variable for enabling share button in articles (#73).
- Add `external` class to comment timestamp.
- Add `external` class to footer's "Powered by" links (#80).
- Add `h1` with page/section title by default.
- Add ability to set accent color per page/section.
- Add ability to set default theme per page/section.
- Add ability to set favicon/emoji per page/section.
- Add ability to set metadata card per page/section.
- Add active state to footer's "Powered by" links.
- Add active state to footnotes' go back button.
- Add active state to slider thumb.
- Add Bahasa Melayu translation (#78).
- Add blurred banner to the article in list, if one is present.
- Add fading on top/bottom of the search results container.
- Add loading animation to "Load Comments" button.
- Add margin between comment author name and timestamp.
- Add missing edge highlight to active footer navbar links.
- Add open animation to `details`.
- Add special `switch` class for checkboxes (#70).
- Add spoiler styles.
- Add zoom-on-hover to custom comment emojis.
- Return the scrollbar styling.
- Show arrow after article heading in article list on hover.
- Style `details` arrow.
- Style mentions and hashtags in comments.
- Turn "Feed" button to a dropdown if multiple feeds are available (#72).

### Changed

- **[BREAKING]** Change the `--active` CSS variable to include `scale()` as well.
- **[BREAKING]** Change the way `--bg-color` CSS variable works. See [Tricks](https://duckquill.daudix.one/tricks/#background-image) page to see how to make background images work.
- **[BREAKING]** Rename `--primary-color` CSS variable to `--accent-color`.
- **[BREAKING]** Rename `config.extra.nav.links.sublinks` to `config.extra.nav.links.menu`
- **[BREAKING]** Rename `config.extra.primary_color` and `config.extra.primary_color_dark` config variables to `config.extra.accent_color` and `config.extra.accent_color_dark`.
- **[BREAKING]** Rename `config.extra.stylesheets` to `config.extra.styles`. Front matter variables are renamed as well.
- Add font size variables for consistent typography. Like [absolute sizes](https://developer.mozilla.org/en-US/docs/Web/CSS/absolute-size) but better.
- Allow enabling table of contents on all pages and sections except for the homepage.
- Allow opening original comment attachment by clicking on it.
- Allow overriding the `body` block of `base.html.
- Allow statements on all sections except for the homepage.
- Change the way 404 image is resized (#74).
- Improved CRT style, now looks a lot more like [cool-retro-term](https://github.com/Swordfish90/cool-retro-term).
- Make comment timestamp more subtle.
- Make list numbers bold.
- Make the copy button inactive after it is pressed until the animation is complete.
- Move table of contents code to a partial.
- Only allow `external` class on links.
- Reduce the target heading transition time.
- Reduce top margin of the target heading.
- Remove bottom margin of `:last-child` and not `:last-of-type`.
- Remove legacy KaTeX font variants.
- Rewrite the homepage (#75).
- Set animation/transition duration to 0s with `prefers-reduced-motion' instead of removing them altogether.
- Set socials icons as CSS variables and not inline styles.
- Show theme switcher if `config.extra.default_theme` is set, even if `config.extra.nav.show_theme_switcher` is not.
- Tweak `kbd` styling.
- Tweak margin/padding of lists.
- Tweak padding of verified instance badge.
- Use accent color for list bullets and numbers.
- Use logical inset properties instead of `top`, `right`, `bottom`, and `left`.
- Use more fitting cursors in some contexts.
- Use percents instead of decimals for color opacity.
- Use PNG instead of GIF for comments QR code to reduce download size.
- Use relative colors for `-bg` color variants.
- Use separator `div` instead of `::after` on the home button.
- Use the current text color for icons instead of explicitly setting their color.

### Removed

- Remove the `config.extra.primary_color_alpha` and `config.extra.primary_color_alpha_dark` config variables; they're now automatically generated from the accent color.

### Fixed

- `config.extra.fix_contrast_dark` should now work even if `config.extra.accent_color_dark` is not set.
- Display pointer cursor if image is wrapped in a link.
- Don't add `::before` pseudo element to color pickers.
- Fix images being covered by other images in some scenarios.
- Fix top spacing of navbar dropdowns on mobile.
- Fix videos and iframes having rounded corners and edge highlight in fullscreen.
- Load auto-menu-close script if navbar menus are present.

## [4.8.0](https://codeberg.org/daudix/duckquill/compare/v4.7.1...v4.8.0) - 2024-08-29

### Added

- Add a separator between the article description and details.
- Highlight the button of the currently selected theme in the theme switcher.
- Indicate active navbar items for footer links.
- Support optional LaTeX rendering using the KaTeX library (#65).

### Changed

- Make button hover styles consistent across all buttons.
- Make navbar modifications also affect menu buttons (#69, nice).

### Removed

- Remove GoatCounter `noscript` tracking pixel from the `<head>` section.

### Fixed

- Fix missing margin between the article card heading and its details when no description is set (#68).
- Fix tags not floating to the end of the article card.

## [4.7.1](https://codeberg.org/daudix/duckquill/compare/v4.7.0...v4.7.1) - 2024-08-28

### Changed

- Don't use `safe` on `primary_color` default variables since they don't need it.
- Make commented-out config variables easier to find.

### Fixed

- Don't wrap sentences in navbar dropdowns.

## [4.7.0](https://codeberg.org/daudix/duckquill/compare/v4.6.0...v4.7.0) - 2024-08-27

### Added

- Add `banner_pixels` front matter variable.
- Add CHANGELOG.md (#60).
- Add hot/poor article types (#58).
- Add metadata card generation from post banner if present (#51).
- Add navbar menus (#56).
- Add simple variable overrides for stylesheets (#55).
- Add Vimeo embed shortcode.
- Add YouTube embed shortcode (#57).

### Changed

- Don't duplicate icons in the resulting CSS.
- Hide CRTs from screen readers (#64).
- Move article list to a partial.
- Reduce nesting depth in `_footer.scss`
- Refreshed look of articles in the article list.
- Rewrite `_nav.scss`.
- Use flex for post heading/badge (#53).
- Use modern RGB format (#54).
- Use page/section description instead of config if available (#50).

### Fixed

- Close all other navbar dropdowns when different one opens (#59).
- New active navbar item indication that doesn't escape navbar on mobile (#62).
- Prevent navbar from obfuscating post banner on mobile (#61).

## [4.6.0](https://codeberg.org/daudix/duckquill/compare/v4.5.0...v4.6.0) - 2024-08-23

### Added

- Add missing "By $AUTHOR" string to i18n files (#52).
- Add missing edge highlight to home button.
- Utilize flex power for navbar adaptivity.

### Changed

- Change theme switcher icon depending on currently selected mode (#48).
- Update "Tricks" page to reflect the recent navabr changes.

### Fixed

- Fix the Feed button in multilingual sites (https://codeberg.org/muelsyse/pages/issues/12).
- Remove left/right margins from `<figure>`.

## [4.5.0](https://codeberg.org/daudix/duckquill/compare/v4.4.0...v4.5.0) - 2024-08-18

### Added

- Add manual light/dark mode switcher (#5).

### Changed

- Improve adaptivity of footer on mobile.

## [4.4.0](https://codeberg.org/daudix/duckquill/compare/v4.3.0...v4.4.0) - 2024-08-17

### Added

- Add home icon to the home button.
- Add top/bottom margin to inline images on mobile (#46).
- Add unique active style for home button.

### Changed

- Greatly optimize and simplify CRT styles.
- Improve adaptivity of navbar on mobile.
- Use `--contrast-color` for footer's "Powered by" links.

## [4.3.0](https://codeberg.org/daudix/duckquill/compare/v4.2.1...v4.3.0) - 2024-08-15

### Added

- Add styling for the color picker element.
- Add styling for the slider element.
- Add temporary `extra.fix_contrast` and `extra.fix_contrast_dark` config variables for cases where default white color doesn't provide enough contrast, e.g. in text selection and checkboxes (#43).
- Show status when there are no comments to load.

### Changed

- Allow custom styles to override primary color.
- Increase fleuron size.
- Make post tags wrap properly on mobile.

### Fixed

- Fix `full_bleed` image/video shortcode variable.
- Fix line height in footer.
- Fix text color in search bar using User Agent color.

## [4.2.1](https://codeberg.org/daudix/duckquill/compare/v4.2.0...v4.2.1) - 2024-08-06

### Fixed

- Fix phantom search bar causing spaces on the sides of short navbars, even when search is disabled.

## [4.2.0](https://codeberg.org/daudix/duckquill/compare/v4.1.0...v4.2.0) - 2024-08-06

### Added

- Add fallback styling for code blocks if no syntax highlighting theme is specified.
- Add support for Zola's `config.markdown.bottom_footnotes` config variable.
- Add support for Zola's `external_links_target_blank`, `external_links_no_follow`, and `external_links_no_referrer` config variables.
- Add support for Zola's `lazy_async_image` config variable.
- Add title to "Copy code" button.
- Add title to comments QR code.
- Add titles to buttons without visible text.

### Changed

- Allow archiving pages without reasoning.
- Allow external link icon to grow past the default size.
- Change default primary color to slate.
- Change padding of various elements to be pixel-perfect.
- Don't set background on horizontal rule's fleuron.
- Give comment author's instance badge some space to breathe.
- Increase spacing between comment timestamp and its contents.
- Make checkbox animation smoother.
- Remove bottom margin from the last element inside `<details>`
- Replace language-specific pages with symlinks (only affects Duckquill demo).
- Use checkmark icon for verified instance badge instead of a Unicode glyph.
- Use RTL-friendly border radius properties.

### Removed

- Remove focused heading animation, since it was rather distracting.

### Fixed

- Fix broken line height in Arabic.
- Fix height of previous/next post navigation buttons.
- Fix search bar getting stuck in the disabled state after reloading page with it being open.
- Replace leftover tabi paths with Duckquill.

## [4.1.0](https://codeberg.org/daudix/duckquill/compare/v4.0.0...v4.1.0) - 2024-07-22

### Added

- Add "Tricks" page with some useful tips and tricks (#28).
- Add estimated read time counter to articles (#36).
- Allow setting different primary color for dark mode.
- Support image/video/gif/audio attachments in comments.

### Changed

- Reduce top margin of headings.
- Replace weird `unset` CSS keyword with values that make more sense.

### Removed

- Remove tags from the article.

### Fixed

- Fix code blocks with complex settings.

## [4.0.0](https://codeberg.org/daudix/duckquill/compare/v3.2.1...v4.0.0) - 2024-07-20

### Added

- Add comments reloading.
- Add GitHub-style alerts.
- Add localization to comments QR code alt text.
- Add minimal size for separator between home button and other links in navabr.
- Add post banners.
- Style more HTML elements.

### Changed

- **[BREAKING]** Remove description variable from `article_list.html`; simply copy-paste it outside of front matter.
- **[BREAKING]** Some CSS variables were renamed.
- **[BREAKING]** Some translation strings were renamed.
- Allow all statements on regular pages; not just archive.
- Allow navbar/footer to grow past container width.
- Change default locale to `en_US`.
- Countless minor style tweaks.
- Decrease margin between icon and statement heading.
- Display all post authors and not only first one.
- Float tags to the right in the post card and post itself.
- Make margins/paddings RTL-friendly.
- Make search bar visually part of the navbar.
- Rename some color variables.
- Revamp copy button; instead of putting it on top of the code block, use a header with code language and copy button. It also has a nice copy animation.
- Revamp the next/previous post nav.
- Rewrite the demo (#27).
- Update icons.
- Use `:root` instead of `html` in CSS.
- Use margins instead of untrimmed spaces.
- Vertically center custom emojis in comments.

### Fixed

- Disable search input until it's open; prevents ability to write inside it while it's closed.
- Fix height of instance badge in comments.
- Fix shadow on hover with transparent images.
- Fix variety of a11y issues.
- Improve compatibility with WebKit (Safari, Epiphany).
- Make Duckquill more XHTML5 compliant (in theory).
- Trim whitespace in more places.
- Use button element instead of anchors, fixes keyboard navigation and other issues.

## [3.2.1](https://codeberg.org/daudix/duckquill/compare/v3.2.0...v3.2.1) - 2024-06-30

### Changed

- Make search bar pill shaped and same size as navbar.
- Make statement headings use normal line height.
- Omit old-style type attributes (`type="text/css"`).
- Replace Django VSCode extension with Tera in "Tools Used".

### Fixed

- Add missing translation keys for search.

## [3.2.0](https://codeberg.org/daudix/duckquill/compare/v3.1.0...v3.2.0) - 2024-06-30

### Added

- Add search functionality (#26).
- Allow floating images to the start/end of a paragraph.
- Allow making images full-bleed, useful for article banners.
- Make accordion slimmer.
- Make headings slimmer.

### Changed

- **[BREAKING]** Raise the minimal Zola version to v0.19.0.
- Make link underlines consistent across browsers.
- Replace all `px` values with `rem` for better responsiveness. E.g the whole UI can be scaled by just changing HTML font size.
- Tone down the inline code element and checkbox outline.

## [3.1.0](https://codeberg.org/daudix/duckquill/compare/v3.0.0...v3.1.0) - 2024-06-27

### Added

- **[BREAKING]** Add support for multiple feeds introduced in Zola v0.19 (breaks support with Zola v0.18 and lower).
- Add language meta tag.
- Allow making posts featured.
- Support Markdown in copyright text.
- Support Zola's `updated` front matter variable.

### Changed

- Add edge highlight to `details`.
- Don't use `span` for post edit time.
- Improve favicon and scripts loading logic.
- Make inline code smaller to better match height of regular text.
- Recolor headings of drafted and archived posts in posts list.
- Recolor links in the statements.
- Simplify design of drafted posts.
- Use default line height for headings.

### Removed

- **[BREAKING]** Get rid of the `config.extra.animated_favicon` variable in favor of APNG animated favicon if needed.

### Fixed

- Prevent previous/next post buttons' text being too close to each other.

## [3.0.0](https://codeberg.org/daudix/duckquill/compare/v2.1.0...v3.0.0) - 2024-06-20

### Added

- Add "open post" button to comments.
- Add external link icon to buttons that lead to external sites.
- Add i18n support (#24).
- Add language switcher menu in the navbar (enabled automatically if site is available in more than one language).
- Allow adding per-page/section stylesheets via the `extra.stylesheets` variable.
- Allow setting custom copyright text via the new `config.extra.footer.copyright` config variable.
- Button-like style for footer's "Powered by" links.
- Smart syntax highlighting theme loading.

### Changed

- Change the look and structure of footer links.
- Make dialog buttons use `div` element instead of `p`.
- Make footer background-less.
- Make styles more consistent and adaptive (replace some pixel-based values with rem).
- Make styles work with RTL languages.
- Rewrite additional stylesheets loading logic.
- Simplify some unnecessarily complex styles.
- Transition properties have been simplified. The previous approach didn't have any benefits but did cause pain.
- Tweak padding and spacing of elements; now everything should be pixel-perfect and more well-spaced.

### Removed

- **[BREAKING]** Get rid of `config.extra.date_format` and `config.extra.comments.locale` and replace it
- Remove some leftover code.
with `date_format` and `date_locale` inside translation files.

### Fixed

- Add missing labels to some elements.
- Fix images with `transparent` class having shadow on hover.
- Fix the anchor link not being keyboard-accessible.

## [2.1.0](https://codeberg.org/daudix/duckquill/compare/v2.0.0...v2.1.0) - 2024-06-13

### Added

- Add active navbar link indicator.
- Add background color to tables.
- Add custom focus indicator.
- Add pretty text wrap.
- Add section pointing out to Duckquill assets source.
- Add section with tools used to create Duckquill.
- Style checkboxes and radios.

### Changed

- **[BREAKING]** Decouple `--primary-color` tint from `--bg-color`.
- **[BREAKING]** Drop support for johnvertisements as it's out of scope and can be added back easily.
- Improve a11y and keyboard navigation.
- Make `source_url` and `issues_url` config variables optional and adapt content if they're not set.
- Make active header animation less annoying (don't animate to bold).
- Make blockquotes rounded again.
- Update the metadata card.
- Use `article` element in `article.html`.
- Use CSS masks instead of putting SVGs directly into templates.

### Fixed

- Fix "Skip to main content" button preventing clicking on the navbar items on mobile.
- Fix active state transition for footer socials.
- Fix the verified checkmark in comments render as emoji.

## [2.0.0](https://codeberg.org/daudix/duckquill/compare/v1.1.0...v2.0.0) - 2024-05-20

### Added

- Add [EditorConfig](https://editorconfig.org) (again).
- Add ability to style images via the URL.
- Add default value for the comments locale setting.
- Add emoji "font" and use it on body.
- Add optional copy code button.
- Add optional Goatcounter analytics support.
- Add proper support for heading anchors.
- Add support for links and socials in footer.
- Add top margin to [Johnvertisement](https://john.citrons.xyz).

### Changed

- **[BREAKING]** Initial Sass refactoring.
- **[BREAKING]** Remove the unused `--transition-bezier` CSS variable.
- **[BREAKING]** Rename `--content-width` CSS variable to `--container-width`.
- **[BREAKING]** Rename `blog.html` and `blog_list.html` templates to `article.html` and `article_list.html` respectively.
- Adjust line height of headings.
- Change disclaimer heading from plural to singular.
- Fancier horizontal rule.
- Improve the look of drafted post entries.
- Make more elements respect root `font-size`.
- Make the navbar non-mandatory (useful for single-page websites).
- More fail-proof "reduced motion" setting.
- Move `prefers-reduced-motion` media query outside of the `:root`.
- Only target needed elements for transitioning.
- Provide all fonts from [Modern Font Stacks](https://modernfontstacks.com) (don't worry, these are just system font names).
- Simplify `bg-color` variable.
- Tweak active header animation.
- Tweak heading sizes.

### Removed

- **[BREAKING]** Get rid of page/site links and replace with `external` class.

### Fixed

- Fix long post title sneaking under the archived/drafted post badge (#23).
- Fix the image shortcode having the source link not working.

## [1.1.0](https://codeberg.org/daudix/duckquill/compare/v1.0.1...v1.1.0) - 2024-04-29

### Added

- Add drafted and archived badges in the blog list.
- Add Duckquill version to the stylesheet.
- Add some bare-bones configuration in `theme.toml` (fixes failing build with empty user config).
- Introduce a new configuration variable, `extra.comments.locale`; used for defining comment timestamp locale.

### Changed

- Change archived icon from warning to archive.
- Change trigger warning/disclaimer warning icon to bigger, filled one.
- Get rid of transparency and roundness in apple-touch-icon (as recommended by Apple).
- Improve code comments in the config.
- Remove ellipsis form the "Load Comments" button in the comments section.
- Update copyright year.
- Update project logo, favicon and metadata card.
- Use [normalize.css](https://github.com/csstools/normalize.css) by csstools.
- Use `get_url` for code highlighting stylesheets.

### Removed

- **[BREAKING]** Remove support for per-page/section emoji favicon.

### Fixed

- Fix code block `mark` element having an edge highlight.
- Fix code blocks having every other line being darker in some complex cases.
- Fix emoji favicon being cut-off.

## [1.0.1](https://codeberg.org/daudix/duckquill/compare/v1.0.0...v1.0.1) - 2024-04-05

### Changed

- Improve comment interactions animation and color (now same as in [Tuba](https://tuba.geopjr.dev)).
- Make blockquote corners sharp.
- Rewrite README; based on [libreivan's one](https://codeberg.org/libreivan/libreivan.com/src/branch/main/README.md)
- Switch from milliseconds to seconds for transitions and animations.
- Use button style for issue reporting link on 404.
- Use warning icon for statements instead of Unicode glyph, this should make it look better no matter what font the system uses (archived, trigger warning, disclaimer).

### Fixed

- Fix capitalization of buttons.
- Revert 2006d69bd4 since it broke "Go to Top" among others.

## [1.0.0](https://codeberg.org/daudix/duckquill/compare/940c84f4ee...v1.0.0) - 2024-04-03

Initial release.
