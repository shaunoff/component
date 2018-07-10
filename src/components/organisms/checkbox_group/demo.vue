<template lang="pug">
  .demo.m-t-1-0
    component-doc(:component="checkbox_group", :presets="presets")
</template>

<script>
import checkbox_group from './index.vue'
// @vue/component
export default {
  name: 'checkbox_group_demo',
  components: {
    checkbox_group
  },
  data() {
    return {
      checkbox_group,
      presets: {
        options: [{
          name: 'example',
          preset: [
            {
              key: 'facebook',
              label: 'Facebook'
            },
            {
              key: 'twitter',
              label: 'Twitter'
            },
            {
              key: 'youtube',
              label: 'Youtube'
            }
          ]
        }, {
          name: 'example 2',
          preset: [
            {
              key: 'facebook',
              label: 'Facebook'
            },
            {
              key: 'instagram',
              label: 'Instagram'
            }
          ]
        }]
      }
    }
  }
}
</script>
