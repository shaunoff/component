<template lang="pug">
  .demo
    .row.m-t-1-0
      component-doc(:component="vimeo_embed_file")
</template>

<script>
import vimeo_embed_file from './index.vue'

// @vue/component
export default {
  name: 'vimeo_embed_demo',
  data() {
    return {
      vimeo_embed_file
    }
  }
}
</script>
