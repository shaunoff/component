<template lang="pug">
  .pbxx-card
    .swatch.text-center(:style='{"background-color": swatch.hex,  color: is_dark ? "white" : "black"}')
      .name
        | {{ swatch.name }}
      .code
        code {{ code }}
      .hex
        | {{ swatch.hex }}
      .rgb
        | {{ rgb }}
      .hsl
        | {{ hsl }}
</template>

<script>
  import Color from 'color'

  // @vue/component
  export default {
    name: 'swatches_show',
    props: {
      swatch: Object
    },
    computed: {
      code() {
        return `get-color(${this.swatch.name})`
      },
      hsl() {
        const hsl = Color(this.swatch.hex).hsl().color
        return `${Math.round(hsl[0])}, ${Math.round(hsl[1])}, ${Math.round(hsl[2])}`
      },
      rgb() {
        const rgb = Color(this.swatch.hex).rgb().color
        return `rgb(${rgb.join(', ')})`
      },
      is_dark() {
        return Color(this.swatch.hex).dark()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .swatch {
    padding: 1em;
    margin-bottom: 1em;
    .code {
      height: 3em;
      @include vertical-align;
    }
  }
</style>
