Quasar App Extension Theme Manager
===

An app extension to easily manage dynamic theming of an application&mdash;offers the following features:
* Generates a `themes.js` file in `src/theming` where custom themes can be defined.
* Supports light/dark themes.
* Themes can override of the Quasar brand colors (primary, secondary, accent, info, warning, positive, negative, dark) using colors from the Quasar color palette.
* Custom colors can be defined in CSS (`--q-color-<color>`) in your app to be used with the extension.
* Persists the user's applied light/dark themes to local storage.
* Automatically pulls persisted theme choices on page load and applies them.
* Exposes a `ThemePicker` component that lists the available themes for a given mode (light/dark) and applies the selected theme.
* Exposes a `ThemeCustomizationDialog` component that upon opening shows a dialog with a theme picker for both light and dark themes.

For best results, try to follow the [WCAG 2.0](https://www.w3.org/TR/WCAG20/) guidelines for minimum color contrast ratios.

# Install
```bash
quasar ext add theme-manager
```
Quasar CLI will retrieve it from NPM and install the extension.

## Prompts

#### Automatically set badge, button, and toggle text/icons to dark brand color in dark mode?

This setting makes the assumption that you choose dark theme colors that have an appropriate amount of contrast against the dark background. A contrast checking tool can be found [here](https://webaim.org/resources/contrastchecker/). Working with that assumption, the default white text color applied to badges, buttons, and toggle icons will most likely not meet the minimum contrast requirements and as such needs to be swapped out for the `dark` brand color to be more legible.

#### Apply theme to links (`<a>` elements)?

By default links are unstyled and thus the colors will not match any given theme. This option applies the active theme colors to links.

# Uninstall
```bash
quasar ext remove theme-manager
```

# Demo

http://quasar-app-extension-theme-manager.surge.sh/

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
