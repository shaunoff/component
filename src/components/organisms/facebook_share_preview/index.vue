<template lang="pug">
  .facebook-share-preview
    header
      img(v-if="avatar", :src="avatar")
      i.pbxx-icon.pbxx-icon-local-store.pbxx-icon-hc-fw.pbxx-icon-hc-circle.gray-lightest-background-color.text-center(v-else)
      article
        .fb-page-name {{fb_name}}
        span.date {{formatted_date}}
        i.pbxx-icon.pbxx-icon-globe
    p.text(v-html="html_text")

    .media-card
      .image(v-if="is_image")
        image_cropping(
          :image_url="image_url",
          :responsive_image_url="responsive_image_url",
          :aspect_width="aspect_width",
          :aspect_height_min="aspect_height_min",
          :aspect_height_max="aspect_height_max",
          :crop_attributes="crop_attributes",
          :enable_crop="enable_crop",
          ref="image_cropping"
        )

      .metadata(v-if="is_link_share")
        .title {{title}}
        p.description {{description}}
        p.source {{link_domain}}

      div.video(v-if="is_video" v-html="video_tag")

    footer
      .action
        i.pbxx-icon.pbxx-icon-thumb-up
        span Like
      .action
        i.pbxx-icon.pbxx-icon-comment-alt
        span Comment
      .action
        i.pbxx-icon.pbxx-icon-forward
        span Share
</template>

<script>
/*
   * TODO:
   * - link share, handle img height if image not loaded properly.
   * - upload appropriate share icon
   */
import moment from 'moment';
import image_cropping from '../image_cropping/index.vue';

  const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(?![^{]*})/g // eslint-disable-line

// @vue/component
export default {
  name: 'pbxx_facebook_share_preview',

  introduction: 'Renders Facebook share preview for link share, photo share, Youtube/Vimeo video share, Facebook video reshare and Facebook native video share.',

  components: {
    image_cropping,
  },

  props: {
    avatar: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    post_date: {
      type: [Date, String],
    },
    enable_crop: {
      type: Boolean,
      default: true,
    },
    asset_type: {
      type: String,
      required: false,
    },
    crop_attributes: {
      type: Object,
    },
    image_url: {
      type: String,
      required: false,
    },
    responsive_image_url: {
      type: String,
      required: false,
    },
    external_video_url: {
      type: String,
      required: false,
    },
    video_tag: {
      type: String,
      required: false,
    },
    post_format: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    suggested_copy: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      error: null,
    };
  },

  computed: {
    aspect_width() {
      return this.is_link_share ? 600 : 470;
    },

    aspect_height_min() {
      return this.is_link_share ? 315 : 246;
    },

    aspect_height_max() {
      return this.is_link_share ? 315 : 470;
    },

    is_image() {
      return this.asset_type === 'image';
    },

    is_video() {
      return this.asset_type === 'video' || this.external_video_url;
    },

    is_link_share() {
      return this.post_format === 'link' && !this.external_video_url;
    },

    formatted_date() {
      return moment(this.post_date).format('MMMM D, YYYY');
    },

    fb_name() {
      return this.name || 'Sample Account';
    },

    link_domain() {
      const { link } = this;
      if (link) {
        const anchor_el = document.createElement('a');
        anchor_el.href = link;
        return anchor_el.hostname.replace('www.', '');
      }
      return null;
    },

    html_text() {
      if (!this.suggested_copy) {
        return;
      }

      let char_count = 0;

      let html = this.suggested_copy.split(' ')
        .filter((token) => {
          let count = 0;

          if (urlRegex.exec(token)) {
            count += token.length > 60 ? 60 : token.length;
          } else {
            count += token.length;
          }

          count += 1; // count the space

          if (char_count < 350) {
            char_count += count;
            return true;
          }
          char_count += count;
          return false;
        })
        .map((token) => {
          if (token[0] === '@') {
            return `<span class="mention">${token}</span>`;
          } else if (token[0] === '#') {
            return `<span class="hashtag">${token}</span>`;
          } else if (urlRegex.exec(token)) {
            return `<a class="link" href="${token}">${this.shorten_display_link(token)}</a>`;
          }
          return token;
        })
        .join(' ');

      if (char_count > 350) {
        html += '... <a class="link">See more</a>';
      }

      return html;
    },

  },

  mounted() {
    this.$on('update_crop_attributes', (crop_attributes) => {
      this.$parent.$emit('update_crop_attributes', crop_attributes);
    });

    if (this.is_external_video && this.link_domain === 'facebook.com') {
      window.FB.XFBML.parse();
    }
  },

  methods: {
    truncate_text(text, max_len) {
      if (!text) {
        return;
      }
      text = text.trim();
      text = text.length > max_len ? `${text.substring(0, max_len)}...` : text;
      return text;
    },

    shorten_display_link(url) {
      return url.substring(0, 60);
    },

    resize() {
      if (this.$refs.image_cropping && this.$refs.image_cropping.image_meet_aspect_minimum) {
        this.$refs.image_cropping.resize_boundary();
      }
    },
  },
};
</script>

<style lang="scss">
.facebook-share-preview {
  p.text {
    font-size: 14px;
    line-height: 1.38;
    margin: 0;
    word-break: break-word;

    .mention,
    .hashtag,
    .link {
      color: #365899;
    }
  }
}
</style>

<style lang="scss">
  .facebook-share-preview {
    .video {
      iframe {
        width: 100%;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "compass-mixins/lib/compass";

  .facebook-share-preview {
    @include user-select(none);
    display: flex;
    max-width: 475px;
    padding: 12px 12px 5px 12px;
    font-family: SF Optimized, system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
    letter-spacing: -0.01em;
    flex-direction: column;
    border: 1px solid;
    border-color: #e5e6e9 #dfe0e4 #d0d1d5;
    border-radius: 4px;

    header {
      display: flex;
      margin-bottom: 11px;

      img {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        @include border-radius(50%);
      }

      i.pbxx-icon.pbxx-icon-local-store {
        display: block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        margin-right: 8px;
      }

      article {
        color: #90949c;
        font-size: 12px;
        line-height: 1.34;

        .fb-page-name {
          color: #365899;
          font-weight: bold;
          font-size: 14px;
          line-height: 1.38;
          margin-bottom: 2px;
        }

        .date {
          &:after {
            content: ' \00b7 ';
          }
        }

        .pbxx-icon {
          color: #90949c;
        }
      }
    }

    .media-card {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      .image,
      .video {
        width: 100%;
      }

      .video {
        background-color: black;
      }

      .metadata {
        padding: 12px;
        padding-top: 10px;
        max-width: 504px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, .15) inset, 0 1px 4px rgba(0, 0, 0, .1);
        top: -1px;
        position: relative;

        .title {
          color: #1D2129;
          font-size: 18px;
          line-height: 22px;
          font-weight: 500;
          font-family: Georgia, serif;
        }

        .description {
          font-family: Helvetica, Arial, sans-serif;
          font-size: 12px;
          line-height: 16px;
        }

        .title,
        .description {
          word-wrap: break-word;
          margin-bottom: 9px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .source {
          font-size: 11px;
          line-height: 11px;
          text-transform: uppercase;
          color: #90949c;
          margin: 0;
        }
      }
    }

    footer {
      padding-top: 4px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      flex-direction: row;
      margin-top: 12px;

      .action {
        color: #4b4f56;
        font-size: 12px;
        font-weight: bold;
        line-height: 14px;
        padding: 4px 4px 4px 0;
        margin-right: 20px;

        i.pbxx-icon {
          color: #4b4f56;
          font-size: 14px;
          margin: 0;
          margin-right: 6px;
        }
      }

    }
  }
</style>
