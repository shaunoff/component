<template lang="pug">
  .image_caption_widget
    div(v-if="reverse_order")
      image_widget(:widget="widget"
      :class="`image_caption_widget-image${is_empty ? '--border' : ''}`")
      text_widget.image_caption_widget-text(:widget="widget")
    div(v-else)
      text_widget(:widget="widget"
      :class="`image_caption_widget-text${is_empty ? '--border' : ''}`")
      image_widget.image_caption_widget-image(:widget="widget")
</template>

<script>
import image_widget from '../image_widget';
import text_widget from '../text_widget';
// @vue/component
export default {
  name: 'image_text_widget',
  components: {
    image_widget,
    text_widget,
  },
  props: {
    // Image/Text Props
    widget: {
      type: Object,
      required: true,
    },
  },
  computed: {
    is_empty() {
      return this.widget.draft_content.html === '' && this.widget.draft_content.asset_public_id === '';
    },
    reverse_order() {
      return this.widget.draft_content.reverse_order;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .image_caption_widget {
      &-image,
      &-text {
        &,
        &--border {
          display: inline-block;
          width: 50%;
          vertical-align: top;
        }
        &--border {
          border-right: 2px dashed get-color(gray);
        }
      }
      &-image {
        background: get-color(gray-lightest);
      }
  }
</style>
