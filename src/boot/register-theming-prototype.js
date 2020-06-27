import { /* DARK, LIGHT, loadThemeFromStorage, */ theming } from 'theme-manager/theming'

export default ({ Vue }) => {
  Vue.prototype.$theming = theming
  // theming.darkTheme = loadThemeFromStorage(DARK)
  // theming.lightTheme = loadThemeFromStorage(LIGHT)
}
