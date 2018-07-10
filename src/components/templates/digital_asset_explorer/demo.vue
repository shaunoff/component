<template lang="pug">
  .demo
    .row.m-t-1-0
      component-doc(:component="digital_asset_explorer")
</template>

<script>

import digital_asset_explorer from './index.vue'

// @vue/component
export default {
  name: 'digital_asset_explorer_demo',
  data() {
    return {
      digital_asset_explorer
    }
  }
}
</script>
