<template lang="pug">
  .demo
    .row.m-t-1-0
      component-doc(:component="digital_asset_view_modal")
</template>

<script>

import digital_asset_view_modal from './index.vue'

// @vue/component
export default {
  name: 'digital_asset_view_modal_demo',
  data() {
    return {
      digital_asset_view_modal
    }
  }
}
</script>
