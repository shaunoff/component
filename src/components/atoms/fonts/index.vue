<template lang="pug">
  .fonts
    .row
      font_component(v-for="font in fonts", :font="font", :ref="fonts")
</template>

<script>
  import font_component from './show.vue'
  import swatch_picker from '../swatches/picker.vue'
  import { fonts } from './fonts.json'
  const FONTS = fonts

  // @vue/component
  export default {
    name: 'fonts_index',
    components: {
      swatch_picker,
      font_component
    },
    data() {
      return {
        fonts: FONTS
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fonts {
    margin-top: 1em;
  }
  .swatch_picker_wrap {
    margin-bottom: 2em;
  }
</style>
