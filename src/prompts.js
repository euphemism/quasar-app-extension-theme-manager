module.exports = function () {
  return [
    {
      name: 'autoStyleDarkWidgetColor',
      type: 'confirm',
      message: 'Automatically set button and toggle text / icons to dark brand color in dark mode?',
      default: true
    },
    {
      name: 'autoStyleLinks',
      type: 'confirm',
      message: 'Automatically style links?',
      default: true
    }
  ]
}
