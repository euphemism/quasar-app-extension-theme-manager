import Vue from 'vue'

import { colors, LocalStorage, Dark } from 'quasar'

import { DARK, DEFAULT_THEME_NAME, LIGHT } from 'theme-manager/constants'
import { themes } from 'src/theming/themes'

const LOCAL_STORAGE_KEY = 'quasar-theme-manager'
const ACTIVE_THEMES_KEY = 'activeThemes'

const BRAND_COLORS = [
  'primary',
  'secondary',
  'accent',
  'dark',
  'info',
  'warning',
  'positive',
  'negative'
]

const DEFAULT_COLORS = Object.fromEntries(BRAND_COLORS.map(brand => [brand, colors.getBrand(brand)]))

export const getTheme = (themeName, dark) => {
  const mode = dark == null ? Dark.isActive : dark
  const matches = themes
    .filter(theme => theme.name === themeName)
    .filter(theme => theme.isDark === mode)

  if (matches.length === 0) {
    return getTheme(DEFAULT_THEME_NAME, mode)
  }

  return matches[0]
}

const getColor = (color) => {
  return BRAND_COLORS.indexOf(color) > -1
    ? colors.getBrand(color)
    : colors.getPaletteColor(color)
}

export const applyTheme = theme => {
  const mergedColors = { ...DEFAULT_COLORS, ...theme.colors }

  Object.keys(mergedColors).forEach(brand => {
    const color = mergedColors[brand].startsWith('#')
      ? mergedColors[brand]
      : getColor(mergedColors[brand])

    if (color == null) {
      return
    }

    colors.setBrand(brand, color)
  })
}

export const loadThemeFromStorage = (isDark) => {
  if (!LocalStorage.has(LOCAL_STORAGE_KEY)) {
    return DEFAULT_THEME_NAME
  }

  const themeStorage = LocalStorage.getItem(LOCAL_STORAGE_KEY)
  const mode = isDark ? 'dark' : 'light'

  return themeStorage[ACTIVE_THEMES_KEY][mode]
}

export const theming = new Vue({
  data () {
    return {
      activeDarkTheme: DEFAULT_THEME_NAME,
      activeLightTheme: DEFAULT_THEME_NAME
    }
  },
  computed: {
    darkTheme: {
      get () {
        return this.activeDarkTheme
      },
      set (themeName) {
        this.saveAndApplyTheme(themeName, DARK)
      }
    },
    isDark () {
      return Dark.isActive
    },
    lightTheme: {
      get () {
        return this.activeLightTheme
      },
      set (themeName) {
        this.saveAndApplyTheme(themeName, LIGHT)
      }
    },
    themes () {
      return {
        light: themes.filter(theme => theme.isDark === false),
        dark: themes.filter(theme => theme.isDark === true)
      }
    },
    themeSettings () {
      return {
        [ACTIVE_THEMES_KEY]: {
          dark: this.activeDarkTheme,
          light: this.activeLightTheme
        }
      }
    }
  },
  methods: {
    persistThemeSettingsToStorage () {
      LocalStorage.set(LOCAL_STORAGE_KEY, this.themeSettings)
    },
    saveAndApplyTheme (themeName, isDark) {
      const activeTheme = isDark ? this.activeDarkTheme : this.activeLightTheme

      const theme = getTheme(themeName, isDark)

      if (activeTheme.name === theme.name) {
        return
      }

      if (theme.isDark) {
        this.activeDarkTheme = theme.name
      } else {
        this.activeLightTheme = theme.name
      }

      if (this.isDark === isDark) {
        applyTheme(theme)
      }

      this.persistThemeSettingsToStorage()
    }
  },
  created () {
    this.activeDarkTheme = loadThemeFromStorage(DARK)
    this.activeLightTheme = loadThemeFromStorage(LIGHT)

    applyTheme(getTheme(this.isDark ? this.activeDarkTheme : this.activeLightTheme))
  },
  watch: {
    isDark: function (newValue) {
      const themeName = newValue ? this.activeDarkTheme : this.activeLightTheme
      applyTheme(getTheme(themeName, newValue))
    }
  }
})

/*
export const saveSiteSettingsToLocalStorage = state => {
  LocalStorage.set('theme-manager-persistence', state)
}

export const setActiveTheme = (state, themeInfo) => {
  if (themeInfo.isDark) {
    state.settings.activeDarkTheme = themeInfo.theme
  } else {
    state.settings.activeLightTheme = themeInfo.theme
  }

  if (themeInfo.isDark === Dark.isActive) {
    applyTheme(themeInfo.theme)
  }

  saveSiteSettingsToLocalStorage(state)
}

export const setDarkMode = (state, mode) => {
  Dark.set(mode)

  // Also toggle the theme between light and dark
  const theme = Dark.isActive
    ? state.settings.activeDarkTheme
    : state.settings.activeLightTheme

  applyTheme(theme)
}

export const setDarkModeEnabled = (state, enabled) => {
  state.settings.enableDarkMode = enabled

  setDarkMode(state, enabled)

  saveSiteSettingsToLocalStorage(state)
}

export const setRespectBrowserThemeSettings = (state, respect) => {
  state.settings.setRespectBrowserThemeSettings = respect

  setDarkMode(state, respect ? 'auto' : state.settings.enableDarkMode)

  saveSiteSettingsToLocalStorage(state)
}
*/
