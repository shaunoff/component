<template lang="pug">
  .row
    .row
      .col-tn-6
        transition(name="fade")
          el-checkbox.m-t-0-9(
            v-if="show_select_all",
            v-model="select_all",
            :indeterminate="is_select_all_indeterminate",
            @change="handle_select_all"
          ) {{ selection_label }}
      .col-tn-6
        transition(name="fade")
          el-button.pull-right.extra_small(
            v-if="show_delete",
            @click.stop="delete_selected_assets"
            icon="delete"
            :loading="delete_loading"
          ) Delete Selected
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'selector',

    props: {
      digital_assets: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        _select_all: false
      }
    },

    computed: {
      selection_label() {
        return this.select_all ? 'Deselect All' : 'Select All'
      },

      show_select_all() {
        return this.digital_assets.length
      },

      show_delete() {
        return _.some(this.digital_assets, (digital_asset) => {
          return digital_asset.is_selected
        })
      },

      select_all: {
        get() {
          return _.reduce(this.digital_assets, (result, digital_asset) => {
            return result && digital_asset.is_selected
          }, true)
        },
        set(value) {
          this._select_all = value
        }
      },

      is_select_all_indeterminate() {
        return _.some(this.digital_assets, 'is_selected', true) && !_.every(this.digital_assets, 'is_selected', true)
      }
    },

    methods: {
      handle_select_all() {
        this.$emit('digital_asset_select_all_toggled', this._select_all)
      },

      delete_selected_assets() {
        this.$emit('selected_assets_deleted')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .extra_small {
    font-size: 0.8em;
  }
</style>
