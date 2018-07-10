<template lang="pug">
  .demo
    .row.m-t-1-0
      component-doc(:component="embed_file")
</template>

<script>

import embed_file from './index.vue'

// @vue/component
export default {
  name: 'embed_demo',
  data() {
    return {
      embed_file
    }
  }
}
</script>
