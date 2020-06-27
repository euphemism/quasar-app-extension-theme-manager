<template>
    <q-item v-bind="$attrs" v-on="$listeners">
        <q-item-section>
          <div class="row items-center justify-start q-gutter-x-sm">
            <div class="row">
              <div
                v-for="color in colors"
                :key="color"
                :class="`bg-${color} color-block`"
              />
            </div>

            <div>
              {{ palette.name }}
            </div>
          </div>
        </q-item-section>
    </q-item>
</template>

<script>
export default {
  name: 'PaletteListItem',
  props: {
    palette: {
      type: Object,
      required: true
    }
  },
  computed: {
    colors () {
      return this.getColors(['primary', 'secondary', 'accent', 'info', 'warning', 'positive', 'negative'])
    }
  },
  methods: {
    getColors (colors) {
      if (!this.palette.colors || this.palette.colors.length === 0) {
        return []
      }

      return colors.filter(brand => brand in this.palette.colors)
        .map(brand => this.palette.colors[brand])
    }
  }
}
</script>

<style lang="sass" scoped>
.color-block
  width: 1rem
  height: 1rem
</style>
