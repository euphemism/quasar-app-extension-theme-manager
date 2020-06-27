import { DEFAULT_THEME_NAME } from 'theme-manager/theming'

/*
 * Themes are specific to either light or dark mode.
 * There is a default "light" theme and a default "dark" theme
 * included below. Duplicate and change these as necessary to
 * build out your own custom collection of themes.
 */
export const themes = [
  {
    name: DEFAULT_THEME_NAME,
    isDark: true,
    colors: {
    }
  },
  {
    name: DEFAULT_THEME_NAME,
    isDark: false,
    colors: {
    }
  },
  {
    name: 'darkFoobar',
    isDark: true,
    colors: {
      primary: 'red-3',
      secondary: 'indigo-3',
      accent: 'yellow-3'
    }
  },
  {
    name: 'lightFoobar',
    isDark: false,
    colors: {
      primary: 'deep-purple-9',
      secondary: 'orange-10',
      accent: 'light-green-9'
    }
  }
]
