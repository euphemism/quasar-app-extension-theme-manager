<template>
  <q-dialog ref="dialog" @hide="onDialogHide" position="bottom">
    <q-card class="dialog q-dialog-plugin">
      <q-card-section class="relative-position">
        <q-btn
          @click="hide"
          color="primary"
          icon="close"
          flat
          round
          class="absolute-top-right q-mr-sm q-mt-sm"
        />

        <div class="text-h6">
          {{ title }}
        </div>

        <div
          :class="[
            'row',
            { 'q-gutter-x-md': $q.screen.gt.xs },
          ]"
        >
          <theme-picker label="Light Theme" class="col-12 col-sm" />
          <theme-picker label="Dark Theme" for-dark class="col-12 col-sm" />
        </div>

        <div>
          <slot name="append" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ThemePicker from './ThemePicker'

export default {
  name: 'ThemeCustomizationDialog',
  props: {
    title: {
      type: String,
      default: 'Customize Theme'
    }
  },
  components: {
    ThemePicker
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="sass" scoped>
.dialog
  max-width: 100vw
  width: 40rem
</style>
