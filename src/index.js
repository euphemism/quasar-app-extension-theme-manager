/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */
const path = require('path')

module.exports = function (api) {
  const chainWebpack = (ctx, chain) => {
    chain.resolve.alias.set('theme-manager', path.resolve(__dirname, './'))
  }

  api.chainWebpack((chain) => chainWebpack(api.ctx, chain))

  api.extendQuasarConf(conf => {
    conf.boot.push('~quasar-app-extension-theme-manager/src/boot/register-theming-prototype.js')
    conf.framework.plugins.push('Dialog')
    conf.framework.plugins.push('LocalStorage')

    // make sure boot file transpiles
    conf.build.transpileDependencies.push(/quasar-app-extension-theme-manager[\\/]src/)

    if (api.prompts.autoStyleDarkWidgetColor) {
      conf.css.push('~quasar-app-extension-theme-manager/src/css/auto-color-widgets.sass')
    }

    if (api.prompts.autoStyleLinks) {
      conf.css.push('~quasar-app-extension-theme-manager/src/css/auto-color-links.sass')
    }
  })
}
