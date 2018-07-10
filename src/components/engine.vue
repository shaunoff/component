<template lang="pug">
  .pbxxcomponent
    engine_share_setting(:share_setting="share_setting", :retailer="retailer", :brand="brand")
</template>

<script>
// @vue/component
import store from '@promoboxx/pbxxjsdata'

export default {
  name: 'engine',
  props: {
    pbxx: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    share_setting() {
      return store.add('share_setting', this.pbxx.share_setting)
    },
    retailer() {
      return this.pbxx.retailer || {}
    },
    brand() {
      return this.pbxx.retailer || {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
