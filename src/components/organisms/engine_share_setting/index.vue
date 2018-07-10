<template lang="pug">
  .engine_share_setting
    .stack
      .media
        embed_file(v-if="external_video_url", :video_url="external_video_url")
        img.cld-responsive(v-else-if="responsive_image_url", :data-src="responsive_image_url")
        span(v-if="video_tag", v-html="video_tag")
      .text
        strong.title.m-b-0-5(v-if="title") {{ title }}
    .landing_page_copy(v-if="share_setting.landing_page_copy") {{ landing_page_copy }}
</template>

<script>
// @vue/component
import _ from 'lodash';
import cloudinary_service from '../../../helpers/cloudinary';
import variable_renderer from '../../molecules/variable_renderer';
import embed_file from '../embed_file/index.vue';

export default {
  name: 'engine_share_setting',
  introduction: 'Renders an embeded video from a video link input',
  props: {
    share_setting: {
      type: Object,
      default: () => ({}),
    },
    retailer: {
      type: Object,
      default: () => ({}),
    },
    brand: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    embed_file,
    variable_renderer,
  },
  computed: {
    post_format() {
      return _.get(this.share_setting, 'share_data.share_data.post_format');
    },
    title() {
      return _.get(this.share_setting, 'share_data.share_data.title');
    },
    responsive_image_url() {
      const digital_asset = _.get(this.share_setting, 'digital_assets[0]');
      if (digital_asset && digital_asset.is_image) {
        return _.get(this.share_setting, 'responsive_share_image_url');
      }
      return false;
    },
    video_tag() {
      const digital_asset = _.get(this.share_setting, 'digital_assets[0]');
      if (digital_asset && digital_asset.is_video) {
        return digital_asset.video_tag;
      }
      return false;
    },
    external_video_url() {
      return _.get(this.share_setting, 'digital_assets[0].external_video_url');
    },
    landing_page_copy() {
      return _.get(this.share_setting, 'landing_page_copy');
    },
  },
  data() {
    return {
    };
  },
  mounted() {
    cloudinary_service.responsive();
  },
  updated() {
    cloudinary_service.responsive();
  },
};
</script>

<style lang="scss">
  .engine_share_setting {
    .stack {
      .media {
        img, iframe, video {
          background-color: black;
          width: 100%;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../styles/variables_and_mixins.scss";
  .engine_share_setting {
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    max-width: 960px;
    .stack {
      .text {
        padding-top: 20px;
        .title {
          font-size:1.3em;
          display:inline-block;
        }
      }
    }
    .landing_page_copy {
      padding: 20px 0;
      clear: both;
    }
  }
</style>
