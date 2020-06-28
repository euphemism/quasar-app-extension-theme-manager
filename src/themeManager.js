import Vue from 'vue'

import { colors, LocalStorage, Dark, Dialog } from 'quasar'

import ThemeCustomizationDialog from 'theme-manager/components/ThemeCustomizationDialog'
import { DARK, LIGHT, FIRST_THEME } from 'theme-manager/constants'
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
  let matches = themes.filter(theme => theme.isDark === mode)

  if (themeName !== FIRST_THEME) {
    matches = matches.filter(theme => theme.name === themeName)
  }

  if (matches.length === 0) {
    return getTheme(FIRST_THEME, mode)
  }

  return matches[0]
}

// First valid theme of each mode becomes the "default"
const DEFAULT_LIGHT_THEME = getTheme(FIRST_THEME, LIGHT).name
const DEFAULT_DARK_THEME = getTheme(FIRST_THEME, DARK).name

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
    return isDark ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME
  }

  const themeStorage = LocalStorage.getItem(LOCAL_STORAGE_KEY)
  const mode = isDark ? 'dark' : 'light'

  return themeStorage[ACTIVE_THEMES_KEY][mode]
}

export const theming = new Vue({
  data () {
    return {
      activeDarkTheme: null,
      activeLightTheme: null
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
    openThemeCustomizationDialog () {
      Dialog.create({
        component: ThemeCustomizationDialog,
        parent: this
      })
    },
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
    this.activeDarkTheme = getTheme(loadThemeFromStorage(DARK), DARK).name
    this.activeLightTheme = getTheme(loadThemeFromStorage(LIGHT), LIGHT).name

    applyTheme(getTheme(this.isDark ? this.activeDarkTheme : this.activeLightTheme))
  },
  watch: {
    isDark: function (newValue) {
      const themeName = newValue ? this.activeDarkTheme : this.activeLightTheme
      applyTheme(getTheme(themeName, newValue))
    }
  }
})
