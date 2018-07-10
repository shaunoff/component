<template lang="pug">
  .html_widget
    p danger danger
</template>

<script>

  // @vue/component
  export default {
    name: 'html_widget',
    components: {

    },
    props: {
      widget: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .html_widget {
  }
</style>
