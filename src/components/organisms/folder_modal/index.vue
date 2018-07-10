<template lang="pug">
  el-dialog(
    :title="modal_title"
    :visible.sync="visible"
    :modal-append-to-body="false"
    @close="close()"
  )
    .form_item(v-if="updated_folder")
      el-input(v-model='updated_folder.name' placeholder="Folder Name")
      .form_error
    label(v-else) Sorry! No folder found

    span.dialog-footer.clearfix(
        slot="footer"
    )
      el-button.pull-left(
        v-if="digital_asset_folder.id"
        type="text"
        @click="delete_folder()"
      ) Delete
      el-button(
        type="default"
        @click="close()"
      ) Close
      el-button.m-l-15(
        v-if="digital_asset_folder"
        @click="submit()",
        type="info"
        :disabled="has_errors"
      ) {{ folder_save_text }}
</template>

<script>

  export default {
    name: 'folder_modal',
    props: {
      is_visible: {
        type: Boolean,
        default: false
      },
      digital_asset_folder: {
        type: Object,
        default: () => {}
      }
    },

    data() {
      return {
        visible: false,
        updated_folder: Object.assign({}, this.digital_asset_folder)
      }
    },

    computed: {
      has_errors() {
        return !this.updated_folder.name || !this.updated_folder.name.trim() || this.updated_folder.name === this.digital_asset_folder.name
      },

      folder_save_text() {
        return this.digital_asset_folder.id ? 'Save' : 'Create folder'
      },

      modal_title() {
        return this.digital_asset_folder.id ? 'Name the folder' : 'New Folder'
      }
    },

    watch: {
      is_visible(val) {
        this.visible = val
      },
      digital_asset_folder(digital_asset_folder) {
        this.updated_folder = Object.assign({}, digital_asset_folder)
      }
    },

    methods: {
      close() {
        this.visible = false
        this.$emit('folder_modal_closed')
      },

      submit() {
        this.updated_folder.name = this.updated_folder.name.trim()
        this.$emit('folder_modal_change', this.updated_folder)
        this.close()
        // loading until completion or error message
      },

      delete_folder() {
        this.$emit('folder_delete', this.digital_asset_folder)
        this.close()
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "../../../styles/variables_and_mixins";

  .el-input {
    width: 100%;
  }

  .pre_wrap {
    white-space: pre-wrap;
  }

</style>
