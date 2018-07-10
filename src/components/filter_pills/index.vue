<template lang="pug">
  .filter_pill
    el-cascader.cascader(
      :options='filter_options'
      :placeholder='selector_placeholder'
      :v-model='selected_options'
      @change='handle_change'
      filterable)

    .search_selection_list
      .pill(v-for="(filter, index) in filters") {{filter.name}} #[i.el-icon-close(v-on:click='remove_filter(index)')]
</template>

<script>
  import _ from 'lodash'

  // @vue/component
  export default {
    name: 'pbxx_filter_pills',
    introduction: 'Used for connecting a cascade dropdown with a pill system that can edited and deleted. Use event catching to design filter param structure on change.',
    props: {
      filter_options: {
        type: Array,
        note: 'Data of the options.'
      },
      placeholder: {
        type: String,
        default: 'Filter by ...',
        note: 'Placeholder value when zero pills are selected.'
      }
    },
    data() {
      return {
        selected_options: [],
        filters: []
      }
    },
    computed: {
      selector_placeholder() {
        return this.placeholder || 'Filter by ...'
      }
    },
    methods: {
      handle_change(filter) {
        const new_filter = {
          name: filter[1].label,
          value: filter[1].id,
          filter_type: filter[0]
        }

        _.remove(this.filters, f => f.filter_type === new_filter.filter_type && f.value === new_filter.value)

        this.filters.push(new_filter)
        this.$emit('change', this.filters)
      },

      remove_filter(index) {
        this.filters.splice(index, 1)
        this.$emit('change', this.filters)
      }
    }
  }
</script>

<style lang='scss' scoped>

  .filter_pill {
    .search_selection_list {
      margin-top: 10px;
      width: 100%;

      .pill {
        display: inline-block;
      }
    }

    .cascader { display: block; }
  }

</style>
