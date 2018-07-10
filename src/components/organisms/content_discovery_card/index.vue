<template lang="pug">
  .content_discovery_card(v-if='!disabled')
    el-card(:body-style="{ padding: '0px' }", v-loading="loading")
      .card-header(class="clearfix")
        .header-content
          .social-icon
            i.pbxx-icon(:class="channel_icon()")
          .brand(v-if="brand_name") {{ brand_name }}
          .created_time(v-if='!brand_name && content_created_at') {{ time_since(parse_content_created_at()) }}
      .card-content
        .card-media
          img(v-if='image_url && !parse_video_url()', :src="image_url", width="100%" @error='handle_image_error', @click="on_click")
          .video(v-if='parse_video_url()')
            .youtube(v-if="is_channel_type('youtube')")
              youtube_embed_file(:video_url="parse_video_url()", video_height="284px")
            .facebook(v-else-if="is_channel_type('facebook')")
              img(:src="image_url", width="100%" @error='handle_image_error', @click="on_click")
              .pbxx-icon.pbxx-icon-play-circle
            .other(v-else) Unsupported video format
        .card-body
          .link(v-if='is_type("link")')
            h4.title {{ title | truncate(50, '...')}}
            .description {{ description }}
          .description(v-else) {{ message }}
        .card-footer(v-if='cta_text')
          el-button(@click="on_click") {{ cta_text }}
</template>

<script>
import moment from 'moment';

import facebook_embed_file from '../../molecules/facebook_embed_file';
import youtube_embed_file from '../../molecules/youtube_embed_file';

// @vue/component
export default {
  name: 'content_discovery_card',
  components: {
    facebook_embed_file,
    youtube_embed_file,
  },
  props: {
    item_key: {
      type: String,
      required: false,
      default: null,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    brand_name: {
      type: String,
      required: false,
      default: null,
    },
    channel_type: {
      type: String,
      required: true,
    },
    cta_text: {
      type: String,
      required: false,
      default: null,
    },
    image_url: {
      type: String,
      required: false,
      default: null,
    },
    url: {
      type: String,
      required: false,
      default: null,
    },
    video_url: {
      type: String,
      required: false,
      default: null,
    },
    video_type: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    message: {
      type: String,
      required: false,
      default: null,
    },
    content_created_at: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    is_type(type) {
      return this.type === type;
    },

    handle_image_error(err) {
      console.log('Error loading image', err, this.item_key);
      this.disabled = true;
    },

    parse_content_created_at() {
      if (this.content_created_at) {
        return new Date(this.content_created_at);
      }

      return new Date(this.created_at);
    },

    time_since(date) {
      return moment().to(date);
    },

    on_click() {
      this.$emit('click_cta', this.item_key);
    },

    channel_icon() {
      return `pbxx-icon-${this.channel_type}`;
    },

    is_channel_type(channel_type) {
      return this.channel_type === channel_type;
    },

    link_matches_video(link) {
      if (link) {
        return link.indexOf('youtube.com') > -1 || link.indexOf('/videos/') > -1;
      }

      return false;
    },

    parse_video_url() {
      if (this.type === 'video') {
        return this.video_url;
      }

      return null;
    },
  },
};

</script>

<style lang='scss'>
  @import "compass-mixins/lib/compass";
  @import "../../../styles/variables_and_mixins.scss";
  .content_discovery_card {
    .el-card {
      border-radius: 0;
    }

    iframe {
      width: 100%;
      height: 100%;
    }

    .pbxx-icon {
      color: white;
      border-radius: 2px;
      margin: 0 0 0 0.25em;
    }

    .card-media {
      position: relative;
      top: -31px;
      height: 284px;

      .pbxx-icon {
        color: white;
        position: absolute;
        text-align: center;
        font-size: 5em;
        width: 100%;
        margin: 0;
        top: 39%;
        text-shadow: black 0 0 2px;
        pointer-events: none;
      }

      .video, .facebook, .youtube {
        height: 100%;

        span {
          height: 100% !important;
        }
      }

      img {
        cursor: pointer;
        height: 100%;
        display: block;
        object-fit: cover;
        overflow: hidden;
        object-position: top;
      }
    }

    .card-body {
      margin-top: -30px;
      padding: 23px 26px;
      height: 150px;

      .title {
        margin: 0;
      }

      .description {
        padding: 5px 0;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-height: 1.5;
      }
    }

    .card-footer {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      text-align: center;

      .el-button {
        width: 100%;
        border: none;
        color: get-color(blue-brand-darker);
        padding: 10px 16px;
        text-transform: uppercase;
      }
    }

    .card-header {
      padding: 7px 0px;
      border-bottom: 1px solid #ebeef5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;

      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;

      z-index: 1;
      position: relative;

      .social-icon {
        padding: 3px 0 0 8px;
      }

      .created_time, .brand {
        margin-left: 10px;
      }

      div {
        display: inline;
      }
    }
  }
</style>
