<!-- glyph is a reserved namespace for html -->

<template lang="pug">
  .glyphs
    .swatch_picker_wrap.row
      swatch_picker.col-lg-4.col-md-6.col-sm-12(@change="color_change")
      el-switch.col-lg-4.col-md-6.col-sm-12(
        v-model="background_color"
        active-text="Background Color"
        inactive-text="Font Color"
      )
    .row
      glyph_component(v-for="glyph in glyphs", :ref="glyphs", :glyph="glyph", :color="color", :background_color="background_color")
</template>

<script>
  import _ from 'lodash'
  import swatch_picker from '../swatches/picker.vue'
  import glyph_component from './show.vue'
  import icons from '@promoboxx/pbxxfont/dist/promoboxx-icon-regular.json'

  // @vue/component
  export default {
    name: 'glyphs_index',
    components: {
      swatch_picker,
      glyph_component
    },
    data() {
      return {
        glyphs: _.reverse(icons),
        color: '#000000',
        background_color: false
      }
    },
    methods: {
      color_change(color) {
        this.color = color.hex
      }
    }
  }
</script>

<style lang="scss" scoped>
  .glyphs {
    margin-top: 1em;
  }
  .swatch_picker_wrap {
    margin-bottom: 2em;
  }
</style>
