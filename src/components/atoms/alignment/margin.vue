<template lang="pug">
  .margins.row.m-t-1-0
    .col-tn-6.col-xs-6.m-b-1-0
      h4 Top
      el-input-number(v-model="top", :min="0", :max="9.9", :step="0.1")
    .col-tn-6.col-xs-6.m-b-1-0
      h4 Right
      el-input-number(v-model="right", :min="0", :max="9.9", :step="0.1")
    .col-tn-6.col-xs-6.m-b-1-0
      h4 Bottom
      el-input-number(v-model="bottom", :min="0", :max="9.9", :step="0.1")
    .col-tn-6.col-xs-6.m-b-1-0
      h4 Left
      el-input-number(v-model="left", :min="0", :max="9.9", :step="0.1")
    .col-tn-12.m-b-1-0.m-t-1-0
      code {{ classes | pug_format }}
    .pbxx-card
      .block.black-border-color
        .inner.red-background-color.top-left(:class="classes")
    .pbxx-card
      .block.black-border-color
        .inner.red-background-color.bottom-right(:class="classes")
</template>

<script>
  // @vue/component
  export default {
    name: 'alignment_margin',
    filters: {
      pug_format(value) {
        return `.${value.join('.')}`
      }
    },
    data() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    computed: {
      classes() {
        return [
          `m-t-${this.convert_float_to_string(this.top)}`,
          `m-b-${this.convert_float_to_string(this.bottom)}`,
          `m-l-${this.convert_float_to_string(this.left)}`,
          `m-r-${this.convert_float_to_string(this.right)}`
        ]
      }
    },
    methods: {
      convert_float_to_string(number) {
        const integer = Math.floor(number)
        const float = Math.round((number - integer) * 10)
        return `${integer}-${float}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .block {
    height: 30em;
    border-width: 1px;
    border-style: solid;
    position: relative;
    .inner {
      position: absolute;
      height: 10em;
      width: 10em;
      &.top-left {
        top: 0;
        left: 0;
      }
      &.bottom-right {
        bottom: 0;
        right: 0;
      }
    }
  }
</style>
