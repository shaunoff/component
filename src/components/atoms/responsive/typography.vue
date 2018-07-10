<template lang="pug">
  .responsive_typography.row
    .pbxx-card(v-for="number in [1,2,3,4,5,6]")
      h1
        span.red-font-color h1
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h2
        span.red-font-color h2
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h3
        span.red-font-color h3
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h4
        span.red-font-color h4
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h5
        span.red-font-color h5
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      h6
        span.red-font-color h6
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
      p
        span.red-font-color p
        | &nbsp;Lorem ipsum dolor amet you probably haven't heard of them cray wolf narwhal coloring book portland.
</template>

<script>
  // @vue/component
  export default {
    name: 'responsive_typography',
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .responsive_typography {
    margin-top: 1em;
  }
</style>
