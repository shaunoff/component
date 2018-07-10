<template lang="pug">
  .demo
    .row.m-t-1-0
      component-doc(:component="rich_text_editor")
</template>

<script>
import rich_text_editor from './index.vue'
// @vue/component
export default {
  name: 'campaign_card_demo',
  components: {
    rich_text_editor
  },
  data() {
    return {
      rich_text_editor,
      text1: '',
      text2: ''
    }
  }
}
</script>
