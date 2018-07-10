<template lang="pug">
  .modifier
    .swatch_picker_wrap.row
      swatch_picker.col-lg-4.col-md-6.col-sm-12(@change="border_color_change")
      h4 Border
    .swatch_picker_wrap.row
      swatch_picker.col-lg-4.col-md-6.col-sm-12(@change="background_color_change", default_color="white")
      h4 Background
    .swatch_picker_wrap.row
      swatch_picker.col-lg-4.col-md-6.col-sm-12(@change="font_color_change")
      h4 Font
    .row.swatches
      .col-tn-12
        code {{ classes | pug_format }}
      .pbxx-card(v-for="number in [1,2,3,4]")
        .swatch(:class="classes") Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
</template>

<script>
  import swatch_picker from '../swatches/picker.vue'

  // @vue/component
  export default {
    name: 'swatches_modifier',
    components: {
      swatch_picker
    },
    filters: {
      pug_format(value) {
        return `.${value.join('.')}`
      }
    },
    data() {
      return {
        border_color: 'black',
        background_color: 'white',
        font_color: 'black'
      }
    },
    computed: {
      classes() {
        return [
          `${this.background_color}-background-color`,
          `${this.font_color}-font-color`,
          `${this.border_color}-border-color`
        ]
      }
    },
    methods: {
      border_color_change(color) {
        this.border_color = color.name
      },
      background_color_change(color) {
        this.background_color = color.name
      },
      font_color_change(color) {
        this.font_color = color.name
      }
    }
  }
</script>

<style lang="sass" scoped>
  .modifier {
    margin-top: 1em;
    .swatches {
      margin-top: 1em;
      code {
        margin-bottom: 1em;
      }
    }
    .swatch_picker_wrap {
      margin-bottom: 0.5em;
    }
    .swatch {
      height: 5em;
      border-style: solid;
      border-width: 5px;
    }
  }
</style>
