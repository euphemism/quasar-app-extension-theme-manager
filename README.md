Quasar App Extension Theme Manager
===

An app extension to easily manage dynamic theming of an application&mdash;offers the following features:
* Generates a `themes.js` file in `src/theming` where custom themes can be defined.
* Supports light/dark themes.
* Themes can override the Quasar brand colors (`primary`, `secondary`, `accent`, `info`, `warning`, `positive`, `negative`, `dark`) using colors from the Quasar color palette.
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

---
## Using the theme manager extension

The extension adds a file at `src/theming/themes.js`. This is where all of the theme definitions are held. The file has a named export, `themes`, which is an array containing theme definitions. Themes are structured like the following:

```js
{
  name: 'pastels',
  isDark: true, // If set to true, this theme is only available in the dark mode
  colors: {
    primary: 'pink-2',
    secondary: 'indigo-3',
    accent: 'lime-3',
    info: 'cyan-3',
    warning: 'orange-3',
    positive: 'green-13',
    negative: 'red-3'
    // Can optionally override the 'dark' brand color as well
  }
}
```

The themes available to the extension are populated from this file on the first load of the application.
## API
_* denotes changed or new to this version_

### Components

#### ThemeCustomiziationDialog

| prop          | type    | default                 | function            |
| ------------- | ------- | ----------------------- | ------------------- |
| title         | String  | ```'Customize Theme'``` | Dialog title string |

examples:

```js
// Manually create/open a theme customization dialog:
this.$q.dialog({
    component: ThemeCustomizationDialog,
    parent: this
})

// Or using the Dialog plugin:
Dialog.create({
    component: ThemeCustomizationDialog,
    parent: this,
    title: 'custom dialog title' // Swapping out the default title for something different
})
```

---

#### ThemePicker

| prop    | type    | default       | function                                                                    |
| ------- | ------- | ------------- | --------------------------------------------------------------------------- |
| forDark | Boolean | ```false```   | If true the theme picker contents will be all of the registered dark themes |
| label   | String  | ```'Theme'``` | The label on the theme select component                                     |

```html
<theme-picker /> <!-- Shows a theme picker displaying all of the available light themes -->

<theme-picker for-dark /> <!-- Shows a theme picker displaying all of the available dark themes -->

<theme-picker label="theme selection" /> <!-- Shows a theme picker with a custom label -->
```

### Prototypes

#### $theming

The `$theming` prototype exposes a few properties and methods.

### properties

**darkTheme** - Gets/sets the active dark theme. A `String` that defaults to the first dark theme found in `src/theming/themes`.

**lightTheme** - Gets/sets the active light theme. A `String` that defaults to the first light theme found in `src/theming/themes`.

**themes** - An object that contains two arrays, `light` and `dark`, that hold the actual theme definitions.

### methods

**openThemeCustomizationDialog** \* - Opens a dialog containing the `ThemeCustomizationDialog` component.

examples:
```javascript
// Applies the theme, persists as active theme to local storage.
this.$theming.darkTheme = 'theme name'

console.log(`The active dark theme is ${this.$theming.darkTheme}.`)
// > The active dark theme is theme name.

console.log(JSON.stringify(this.$theming.themes, null, 2))
/*
 * >
 * {
 *   "light": [
 *     {
 *       "name": "sunset",
 *       "isDark": false,
 *       "colors": {
 *         "primary": "deep-purple-9",
 *         "secondary": "orange-10",
 *         "accent": "light-green-7",
 *         "info": "cyan-9",
 *         "warning": "yellow-9",
 *         "positive": "green-9",
 *         "negative": "red-10"
 *       }
 *     }
 *   ],
 *   "dark": [
 *     {
 *       "name": "pastels",
 *       "isDark": true,
 *       "colors": {
 *         "primary": "pink-2",
 *         "secondary": "indigo-3",
 *         "accent": "lime-3",
 *         "info": "cyan-3",
 *         "warning": "orange-3",
 *         "positive": "green-13",
 *         "negative": "red-3"
 *       }
 *     }
 *   ]
 * }
 */
```

Adding a button to open the theme customization dialog:

```html
<q-btn
  @click="$theming.openThemeCustomizationDialog"
  color="primary"
  icon="format_paint"
  label="Customize Theme"
/>
```

# Uninstall
```bash
quasar ext remove theme-manager
```

# Demo

http://quasar-app-extension-theme-manager.surge.sh/

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
