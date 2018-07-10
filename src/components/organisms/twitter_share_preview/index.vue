<template lang="pug">
  .twitter-share-preview
    img.profile-avatar(:src="avatar")
    article
      header
        span.fullname {{profile_name}}
        span.twitter-handler @
          span {{twitter_handle}}
        span.post-date {{formatted_date}}
      p.text(v-html="html_text")
      .photo-container(v-if="should_show_photo")
        .img
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

      .video(v-if="video_tag" v-html="video_tag")

      footer
        i.pbxx-icon.pbxx-icon-comment-outline
        i.pbxx-icon.pbxx-icon-share
        i.pbxx-icon.pbxx-icon-favorite-outline
        i.pbxx-icon.pbxx-icon-email-open
</template>

<script>
/*
   * TODO
   * - implement character limits
   * - implement link share
   */
import twitter from 'twitter-text';
import moment from 'moment';
import image_cropping from '../image_cropping/index.vue';

  const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(?![^{\s*]*})/g // eslint-disable-line
const default_account_name = 'My Account';
const default_twitter_handle = 'myaccount';

// @vue/component
export default {
  name: 'pbxx_twitter_share_preview',

  introduction: 'Renders Twitter share preview for link share, photo share and Youtube video share.',

  components: {
    image_cropping,
  },

  props: {
    avatar: {
      type: String,
    },
    name: {
      type: String,
      default: 'My Account',
    },
    username: {
      type: String,
      default: 'myaccount',
    },
    post_date: {
      type: [Date, String],
    },
    enable_crop: {
      type: Boolean,
    },
    crop_attributes: {
      type: Object,
    },
    body: {
      type: String,
      required: true,
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
  },

  data() {
    return {
      aspect_width: 440,
      aspect_height_min: 220,
      aspect_height_max: 440,
    };
  },

  computed: {
    profile_name() {
      return this.name ? this.name.trim() || default_account_name : default_account_name;
    },

    twitter_handle() {
      return this.username ? this.username.trim() || default_twitter_handle : default_twitter_handle;
    },

    formatted_date() {
      return moment(this.post_date).format('MMM D');
    },

    should_show_photo() {
      return this.is_photo_share || !!this.image_url;
    },

    is_photo_share() {
      return this.post_format === 'photo';
    },

    is_link_share() {
      return this.post_format === 'link';
    },

    is_external_video() {
      return !!this.external_video_url;
    },

    html_text() {
      let html = '';

      if (this.body) {
        html = twitter.autoLink(twitter.htmlEscape(this.body));
        if (this.is_link_share) {
          html += ` <a class="link" href="${this.link}">${this.shorten_display_link(this.link)}</a>`;
        }
      }
      return html;
    },

    link_domain() {
      if (this.external_video_url) {
        const anchor_el = document.createElement('a');
        anchor_el.href = this.external_video_url;

        return anchor_el.hostname.replace('www.', '');
      }
      return '';
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
    /*
       * @description Format links the same way Twitter formats link
       * Strip the protocol and www
       * Pathname should be 14 max characters long otherwise clip with ellipsis
       */
    shorten_display_link(url) {
      const anchor_el = document.createElement('a');
      anchor_el.href = url;

      let link = anchor_el.hostname.substring(0, 4) === 'www.'
        ? anchor_el.hostname.substring(4, anchor_el.hostname.length)
        : anchor_el.hostname;

      if (anchor_el.pathname.length > 15) {
        link = `${link}${anchor_el.pathname.substring(0, 15)}...`;
      } else {
        link = `${link}${anchor_el.pathname}`;
      }

      return link;
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
$twitter_primary: #1DA1F2;
.twitter-share-preview {
  p.text {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    white-space: pre-wrap;
    word-wrap: break-word;

    .hashtag,
    .mention,
    a.link,
    a.link:hover,
    a.link:focus,
    a.link:active {
      color: $twitter_primary;
    }
  }
}
</style>

<style lang="scss">
  .twitter-share-preview {
    .video {
      iframe {
        width: 100%;
      }
    }
  }
</style>

<style lang="scss" scoped>
$twitter_primary: #1DA1F2;
$twitter_secondary: #14171A;
$twitter_dark_gray: #657786;

.twitter-share-preview {
  padding: 9px 12px;
  border: 1px solid #E6ECF0;
  background-color: #FFF;
  max-width: 588px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  p {
    margin: 0
  }

  .profile-avatar {
    float: left;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin-right: 10px;

    background-image: url('https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png');
    background-size: contain;
  }

  article {
    overflow: hidden;

    header {
      .fullname {
        color: $twitter_secondary;
        font-size: 14px;
        font-weight: bold;
        margin-right: 5px;
      }

      .twitter-handler,
      .post-date {
        font-weight: normal;
        color: $twitter_dark_gray;
      }

      .post-date {
        &:before {
          content: '\00b7  ';
        }
      }
    }

    .photo-container {
      width: 100%;
      border-radius: 3px;
      margin-top: 10px;
      .img {
        width: 100%;
      }
    }

    .video-container {
      margin-top: 10px;

      iframe {
        width: 100%;
        height: 284px;
      }

      .video-metadata {
        padding: 14px;
        padding-bottom: 0;
        border: 1px solid #E6ECF0;
        border-top: 0;
        max-width: 504px;

        .title {
          color: $twitter_secondary;
          font-size: 14px;
          font-weight: bold;
        }

        .title,
        .description {
          margin-bottom: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .source {
          color: $twitter_dark_gray;
        }
      }
    }

    footer {
      margin-top: 12px;

      i {
        color: $twitter_dark_gray;
        font-size: 18px;
        line-height: 18px;
        margin-right: 35px;
      }
    }
  }
}
</style>
