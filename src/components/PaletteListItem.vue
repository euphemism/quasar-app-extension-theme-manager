<template>
    <q-item v-bind="$attrs" v-on="$listeners">
        <q-item-section avatar>
            <div class="row">
                <div
                v-for="color in displayColors"
                :key="color"
                :class="`bg-${color} color-block`"
                />
            </div>
        </q-item-section>

        <q-item-section>
            {{ palette.name }}
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
    displayColors () {
      if (!this.palette.colors || this.palette.colors.length === 0) {
        return []
      }

      return ['primary', 'secondary', 'accent']
        .filter(brand => brand in this.palette.colors)
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
