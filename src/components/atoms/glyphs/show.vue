<template lang="pug">
  .pbxx-card
    .glyph.text-center(:style="glyph_style")
      .icon
        i.pbxx-icon.pbxx-icon-hc-5x(:class="[icon_class]")
      .name {{glyph.name}}
      .code
        code {{ code }}
      .unicode {{unicode_string}}
</template>

<script>
  import Color from 'color'

  // @vue/component
  export default {
    name: 'glyphs_show',
    props: {
      glyph: Object,
      color: {
        type: String,
        default: '#000000'
      },
      background_color: Boolean
    },
    computed: {
      code() {
        return `.pbxx-icon.pbxx-icon-${this.glyph.name}`
      },
      icon_class() {
        return `pbxx-icon-${this.glyph.name}`
      },
      unicode_string() {
        return this.glyph.unicode.toString(16)
      },
      glyph_style() {
        if (this.background_color) {
          const is_dark = Color(this.color).dark()
          return {
            backgroundColor: this.color,
            color: is_dark ? 'white' : 'black'
          }
        }
        return { color: this.color }
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../styles/variables_and_mixins';
  .glyph {
    padding: 1em;
    margin-bottom: 2em;
    .code {
      height: 3em;
      @include vertical-align;
    };
    .icon {
      height: 5em;
    }
  }
</style>
