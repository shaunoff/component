<template lang="pug">
  .demo.m-t-1-0
    component-doc(:component="instagram_share_preview")
</template>

<script>
import instagram_share_preview from './index.vue'
// @vue/component
export default {
  name: 'instagram_share_preview_demo',
  components: {
    instagram_share_preview
  },
  data () {
    return {
      instagram_share_preview
    }
  }
}
</script>
