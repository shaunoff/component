<template lang='pug'>
    .checkbox-group
      el-checkbox-group(
        v-model='channel_group'
        @change='change'
      )
        el-checkbox(
          v-for='option in options'
          :key='option.key'
          :label='option.key') {{option.label}}
</template>

<script>

  export default {
    name: 'checkbox-group',
    props: {
      options: {
        type: Array,
        required: true
      },
      default_selected: {
        type: Array,
        default: () => [],
        required: false
      }
    },
    data() {
      return {
        channel_group: []
      }
    },
    created() {
      if (this.default_selected.length) {
        this.channel_group = this.default_selected
      }
    },
    methods: {
      change() {
        this.$emit('change', this.channel_group)
      }
    }
  }

</script>
