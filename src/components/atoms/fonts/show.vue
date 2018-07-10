<template lang="pug">
  .demo
    .col-lg-12
      h4 {{font.name}}
        span.weight_selector
          el-radio(
            v-for="weight in font.weights"
            v-model="font_weight", :label="weight"
          ) {{weight}}
        code .{{font.abbreviation}}.w-{{font_weight}}
    .col-lg-12.m-b-3-0(:class="font.abbreviation")
      h1(:class="`w-${font_weight}`")
        span.red-font-color h1
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h2(:class="`w-${font_weight}`")
        span.red-font-color h2
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h3(:class="`w-${font_weight}`")
        span.red-font-color h3
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h4(:class="`w-${font_weight}`")
        span.red-font-color h4
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h5(:class="`w-${font_weight}`")
        span.red-font-color h5
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h6(:class="`w-${font_weight}`")
        span.red-font-color h6
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      p(:class="`w-${font_weight}`")
        span.red-font-color p
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
</template>

<script>
  // @vue/component
  export default {
    name: 'fonts_show',
    props: {
      font: Object
    },
    data() {
      return {
        font_weight: 500
      }
    }
  }
</script>

<style lang="scss" scoped>
  .weight_selector {
    margin: 0 2em;
  }
</style>
