<template>
  <q-select
    v-on="$attrs"
    v-bind="$listeners"
    :value="value"
    @input="$emit('input', $event)"
    :options="palettes"
    :label="label"
    color="primary"
    options-selected-class="text-primary"
  >
    <template #option="scope">
      <palette-list-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
        :palette="scope.opt"
      />
    </template>

    <template #selected>
      <palette-list-item :palette="value" />
    </template>
  </q-select>
</template>

<script>
import PaletteListItem from './PaletteListItem'

export default {
  name: 'PaletteSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    palettes: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  components: { PaletteListItem }
}
</script>
