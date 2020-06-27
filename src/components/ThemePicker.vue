<template>
  <palette-select v-model="activeTheme" :palettes="palettes" :label="label" />
</template>

<script>
// import { ref, onMounted } from '@vue/composition-api'
import { getTheme, theming } from 'theme-manager/theming'
import { themes } from 'src/theming/themes'
import PaletteSelect from './PaletteSelect'

export default {
  name: 'ThemePicker',
  components: {
    PaletteSelect
  },
  props: {
    forDark: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Theme'
    }
  },
  data () {
    return {
      palettes: themes.filter(theme => theme.isDark === this.forDark)
    }
  },
  computed: {
    activeTheme: {
      set (theme) {
        theming[this.forDark ? 'darkTheme' : 'lightTheme'] = theme.name
      },
      get () {
        return getTheme(theming[this.forDark ? 'darkTheme' : 'lightTheme'], this.forDark)
      }
    }
  }
}
</script>
