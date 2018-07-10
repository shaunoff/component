<template lang="pug">
  .swatches
    .swatch_group.row(v-for="swatch_group in swatch_groups", :ref="swatches")
      .name.col-lg-12
        strong.text-capitalize {{ swatch_group.name }}
      swatch_component(v-for="swatch in swatch_group.colors", :swatch="swatch")
</template>

<script>
  import swatch_component from './show.vue'
  import { swatch_groups } from './swatch_groups.json'

  // @vue/component
  export default {
    name: 'swatches_index',
    components: {
      swatch_component
    },
    data() {
      return {
        swatch_groups
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swatches {
    margin-top: 1em;
  }
  .name {
    margin-bottom: 1em;
  }
</style>
