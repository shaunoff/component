<template lang="pug">
  .video_widget
    div(
      v-html="widget.draft_content.video_tag"
    )
</template>

<script>

  // @vue/component
  export default {
    name: 'video_widget',
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
  .video_widget {

  }
</style>
