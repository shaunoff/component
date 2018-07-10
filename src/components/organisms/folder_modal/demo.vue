<template lang="pug">
  .demo
    el-button(@click="dialogVisible = true") Open this puppy
    el-dialog(
      title="Modal Title"
      :visible.sync="dialogVisible"
      @close="close()"
    )
      p this is the body of the modal

      span.dialog-footer.clearfix(
          slot="footer"
      )
        el-button(
          type="default"
          @click="close()"
        ) Close
        el-button.m-l-15(
          type="info"
        ) Save
</template>

<script>

  export default {
    name: 'folder_modal_demo',
    data() {
      return {
         dialogVisible: false
      }
    }
  }

</script>
<style lang="scss" scoped>

  .pre_wrap {
    white-space: pre-wrap;
  }

</style>
