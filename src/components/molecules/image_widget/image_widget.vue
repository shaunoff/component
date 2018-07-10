<template lang="pug">
  .image_widget
    img.img-responsive.center-block(
      v-if="!!src"
      :src="src"
      :style="[{ width: image_size }, image_position]")
    .image_widget-default(v-else)
      i.pbxx-icon.pbxx-icon-crop-original
      p.image_widget-default-text
        | Select an image
</template>

<script>
import cloudinary from '../../../helpers/cloudinary';
import _ from 'lodash';
// @vue/component
export default {
  name: 'image_widget',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image_size() {
      return `${this.widget.draft_content.asset_size}%`;
    },
    image_position() {
      const position = this.widget.draft_content.asset_position,
        size = this.widget.draft_content.asset_size,
        midpoint = size / 2,
        is_left_left = position <= midpoint && size < 50,
        is_left = position > midpoint && position < 50 - midpoint,
        is_left_middle = position < 50 && (size >= 50 || position >= 50 - midpoint),
        is_middle = position === 50,
        is_right_middle = position > 50 && (size >= 50 || position <= 50 + midpoint),
        is_right = position < 100 - midpoint && position > 50 + midpoint,
        is_right_right = position >= 100 - midpoint && size < 50;

        // TODO: Make switch statement

      if (is_left_left) {
        return { marginLeft: `${_.mean([0, position])}%` };
      } else if (is_left) {
        return { marginLeft: `${_.mean([position, position - midpoint])}%` };
      } else if (is_left_middle) {
        if (size < 50) {
          return { marginLeft: `${_.mean([position - midpoint, 50 - midpoint])}%` };
        }
        return { marginLeft: `${(50 - midpoint) * position / 50}%` };
      } else if (is_middle) {
        return { marginLeft: 'auto', marginRight: 'auto' };
      } else if (is_right_middle) {
        if (size < 50) {
          return { marginRight: `${_.mean([50 - midpoint, 100 - position - midpoint])}%` };
        }
        return { marginLeft: `${(50 - midpoint) * position / 50}%` };
      } else if (is_right) {
        return { marginRight: `${_.mean([100 - position - midpoint, 100 - position])}%` };
      } else if (is_right_right) {
        return { marginRight: `${_.mean([0, 100 - position])}%` };
      }
      return null;
    },
    src() {
      const x_percent = this.widget.draft_content.crop_attributes.left / 100,
        y_percent = this.widget.draft_content.crop_attributes.top / 100,
        angle = Math.round(this.widget.draft_content.crop_attributes.rotate / 100 * 360),
        radius = this.widget.draft_content.crop_attributes.round < 99 ? this.widget.draft_content.crop_attributes.round : 'max';

      let width_percent = (100 - this.widget.draft_content.crop_attributes.right - this.widget.draft_content.crop_attributes.left) / 100,
        height_percent = (100 - this.widget.draft_content.crop_attributes.bottom - this.widget.draft_content.crop_attributes.top) / 100;

      if (width_percent === 1 && height_percent === 1) {
        width_percent = null;
        height_percent = null;
      }

      if (this.widget.draft_content.asset_public_id) {
        return cloudinary.url(this.widget.draft_content.asset_public_id, {
          dpr: 'auto',
          width: width_percent,
          height: height_percent,
          x: x_percent,
          y: y_percent,
          angle,
          radius,
          fetch_format: 'auto',
          quality: 'auto',
          crop: 'crop',
          client_hints: true,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .image_widget {
    &-default {
      padding: 15px;
      text-align: center;
      color: get-color(gray);
      background: get-color(gray-lightest);
      &-text {
        margin: 5px 0 0;
      }
      i {
        font-size: 60px;
      }
    }
  }

  .full_width {
    width: 100%;
  }
</style>
