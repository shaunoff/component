<template lang="pug">
  .empty_content_panel.m-t-4-0
    .row
      .col-sm-2.col-sm-offset-2.hidden-xs
        .img.text-center
          img(:src="empty_image_path")
      .col-sm-4.col-tn-12
        .text-center
          .content.txt {{ empty_text }}
          el-button(
            @click="empty_click()",
            v-if="empty_link_label"
            type="info"
          ) {{ empty_link_label }}
      .col-sm-2
</template>

<script>
  import asset_helper from '../../../helpers/assets_helper'

  // @vue/component
  export default {
    name: 'empty_content_panel',
    props: {
      empty_image_path: {
        type: String,
        default: ''
      },
      empty_text: {
        type: String,
        default: ''
      },
      empty_link_label: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      empty_click() {
        this.$emit('empty_click')
      }
    }
  }

</script>

<style lang='scss'>
  @import "compass-mixins/lib/compass";
  @import "../../../styles/variables_and_mixins.scss";

  .empty_content_panel {

    $viewport_height: 42vh;

    height: $viewport_height;

    img {
      height: $viewport_height;
      @media (max-width: 576px) {
      }
    }
    .content {
      margin-top: 30%;
      font-size: 2.5vh;

      .txt {
        color: get-color(gray-darkest);
      }
    }
  }
</style>
