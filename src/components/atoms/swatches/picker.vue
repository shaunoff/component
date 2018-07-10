<template lang="pug">
  .swatch_picker
    el-autocomplete(
      v-model="swatch_name"
      :fetch-suggestions="fetch_suggestions"
      placeholder="search for a color"
      @select="select"
    )
      i.el-icon-search.el-input__icon(slot="suffix", :style="{backgroundColor: swatch.hex}")
      template(slot-scope="props")
        div
          span.name {{props.item.value}}
          span.preview.pull-right(:style="{backgroundColor: props.item.hex}")
</template>

<script>
  import _ from 'lodash'
  import { swatch_groups } from './swatch_groups.json'

  // @vue/component
  export default {
    name: 'swatch_picker',
    props: {
      default_color: String
    },
    data() {
      const swatches = []
      swatch_groups.forEach((swatch_group) => {
        swatches.push(...swatch_group.colors)
      })
      swatches.forEach((swatch) => {
        swatch.value = swatch.name
      })
      const default_swatch = _.find(swatches, { name: this.default_color || 'black' })

      return {
        swatches,
        swatch: default_swatch,
        swatch_name: default_swatch.name
      }
    },
    methods: {
      fetch_suggestions(query_string, callback) {
        callback(this.filter_suggestions(query_string))  // eslint-disable-line
      },
      filter_suggestions(query_string) {
        const regex = new RegExp(query_string, 'i')
        return _.filter(this.swatches, swatch => swatch.name.match(regex))
      },
      select(item) {
        this.swatch = item
        this.$emit('change', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  span.preview, span.name {
    display: inline-block;
  }
  span.preview {
    width: 30px;
    height: 36px;
  }
</style>

<style lang="scss">
  .el-autocomplete {
    width: 100%;
  }
</style>
