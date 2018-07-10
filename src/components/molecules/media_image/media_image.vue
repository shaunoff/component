<template lang="pug">
  span.media_image(
    :class="{ 'no-background': digital_asset.is_zip || digital_asset.is_pdf }"
  )
    slot(name="banner")
    img.cld-responsive(
      v-if="digital_asset.is_image",
      :data-src="digital_asset.responsive_image_url"
    )
    div(
      v-else-if="digital_asset.is_video"
      v-html="digital_asset.video_tag"
    )
    div.raw-icon-container(
      v-else-if="digital_asset.is_zip || digital_asset.is_pdf"
    )
      i.pbxx-icon.pbxx-icon-archive.pbxx-icon-hc-3x(v-if="digital_asset.is_zip")
      i.pbxx-icon.pbxx-icon-collection-pdf.pbxx-icon-hc-3x(v-if="digital_asset.is_pdf")
    el-progress(
      v-else type="circle",
      :percentage="digital_asset.upload_percentage"
    )
    el-popover.info_tooltip(
      trigger="hover"
      :disabled="!digital_asset.file"
    )
      .content
        span.name(:title="digital_asset.name || digital_asset.file.public_id")
          | {{digital_asset.name || digital_asset.file.public_id}}
        .bottom.clearfix(v-if="digital_asset.file")
          time.time(v-if="['image', 'video'].includes(digital_asset.file.resource_type) && digital_asset.file.format != 'pdf'")
            | Dimensions: {{digital_asset.file.width}} x {{digital_asset.file.height}}
          time.time(v-else) Size: {{format_size(digital_asset.file.bytes)}}
        span.ineligibility.red-light-font-color(v-if="ineligible")
          | *Minimum size for Facebook, Twitter
          br
          | or Instagram is 600 x 315.
      span.information.pbxx-icon-hc-fw.pbxx-icon-hc-circle(
        slot="reference"
        :class="{ineligible: ineligible}"
      )
       | i
</template>

<script>
import numeral from 'numeral';
import cloudinary_service from '../../../helpers/cloudinary';

export default {
  name: 'media_image',

  props: {
    digital_asset: {
      type: Object,
      default: () => {},
    },
  },

  mounted() {
    cloudinary_service.responsive();
  },

  updated() {
    cloudinary_service.responsive();
  },

  computed: {
    ineligible() {
      return this.digital_asset.is_selected && this.digital_asset.is_image && !this.digital_asset.image_eligible;
    },
  },

  methods: {
    format_size(bytes) {
      return numeral(bytes).format('0.00b');
    },
  },

  watch: {
    'digital_asset.responsive_image_url': function cloudinary_update() {
      cloudinary_service.responsive();
    },
  },
};
</script>

<style lang="scss">
  .media_image {
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .media_image {
    .info_tooltip {
      display: none;
    }
  }
  .has_eligibility_required_channels {  // associated with upper level component
    .media-card {
      .media_image {
        .information {
          &.ineligible {
            background-color: red;
          }
        }
      }
    }
  }
  .info_tooltip_display {
    .media_image {
      .info_tooltip {
        display: block;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../styles/variables_and_mixins";

  .media_image {
    width: 100%;
    overflow: hidden;
    //background-image: url('/assets/checker.svg');
    background-size: 10%;

    &.no-background {
      background-image: none;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: cover;
    }

    .banner {
      color: white;
      position: absolute;
      width: 100%;
      padding: 0 0.75em 0 0.75em;
      background-color: rgba(0, 0, 0, 0.5);
      height: 2.5em;
      line-height: 2.5em;
      font-size: 0.8em;
      vertical-align: middle;
      top: 0;
      .expired_banner {
        float: right;
      }
      .brand_banner {
      }
      .rep_banner {
        float: left;
      }
    }

    .information {
      position: absolute;
      bottom: 0.25em;
      right: 0.25em;
      font-size: 1em;
      color: white;
      line-height: 170%;
      background-color: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.4);
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        border: 1px solid rgba(255, 255, 255, 1);
      }
    }

    .ineligibility {
      position: absolute;
      bottom: 0.1em;
      right: 2.25em;
      font-size: 1em;
      line-height: 170%;
      color: white;
      background-color: get-color(red);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    .raw-icon-container {
      text-align: center;
      padding-top: calc(56.25%/2 - 3em/2);
    }
  }
</style>
