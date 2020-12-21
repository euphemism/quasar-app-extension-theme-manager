module.exports = function () {
  return [
    {
      name: 'autoStyleDarkWidgetColor',
      type: 'confirm',
      message: 'Automatically set badge, button, notification text, and toggle text/icons to dark brand color in dark mode?',
      default: true
    },
    {
      name: 'autoStyleLinks',
      type: 'confirm',
      message: 'Apply theme to links (<a> elements)?',
      default: true
    }
  ]
}
