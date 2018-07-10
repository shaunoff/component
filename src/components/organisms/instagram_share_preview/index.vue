<template lang="pug">
  .instagram-share-preview
    header
      i.pbxx-icon.pbxx-icon-instagramnew
      span.username {{profile_name}}
    .img
      image_cropping(
        :image_url="photo_url",
        :responsive_image_url="responsive_image_url",
        :aspect_width="aspect_width",
        :aspect_height_min="aspect_height_min",
        :aspect_height_max="aspect_height_max",
        :crop_attributes="crop_attributes",
        :enable_crop="enable_crop",
        ref="image_cropping"
      )
    footer
      .actions
        i.pbxx-icon.pbxx-icon-favorite-outline
        i.pbxx-icon.pbxx-icon-comment-outline
      p.text
        span.username {{profile_name}}
        span.caption(v-html="short_html_text")

      .date {{formatted_date}}
</template>

<script>
  import moment from 'moment'
  import image_cropping from '../image_cropping/index.vue'

  // @vue/component
  export default {
    name: 'pbxx_instagram_share_preview',
    introduction: 'Renders Instagram share preview.',
    components: {
      image_cropping
    },
    props: {
      username: {
        type: String,
        default: 'sampleinstagram'
      },
      photo_url: {
        type: String,
        required: true
      },
      responsive_image_url: {
        type: String,
        required: false
      },
      text: {
        type: String
      },
      post_date: {
        type: [Date, String]
      },
      crop_attributes: {
        type: Object
      },
      enable_crop: {
        type: Boolean
      }
    },
    data() {
      return {
        aspect_width: 320,
        aspect_height_min: 167,
        aspect_height_max: 400
      }
    },
    computed: {
      profile_name() {
        const name = this.username ? this.username.trim() || 'sampleinstagram' : 'sampleinstagram'
        return name
      },

      short_html_text() {
        let short_text = this.shorten_text()

        if (short_text && short_text.length) {
          short_text = short_text.split(' ')
            .map((token) => {
              if (token.length && token[0] === '@') {
                return `<span class="mention">${token}</span>`
              } else if (token.length && token[0] === '#') {
                return `<span class="hashtag">${token}</span>`
              }
                return token
            })
            .join(' ')

          short_text = this.text.length > 125 ? `${short_text}<span class="more">more</span>` : short_text
        }

        return short_text
      },

      formatted_date() {
        return moment(this.post_date).format('MMM D')
      }
    },

    mounted() {
      this.$on('update_crop_attributes', (crop_attributes) => {
        this.$parent.$emit('update_crop_attributes', crop_attributes)
      })
    },

    methods: {
      shorten_text() {
        if (!this.text) {
          return ''
        }

        const text = this.text.length > 125 ? this.text.substring(0, 125) : this.text

        return text
      },
      resize() {
        if (this.$refs.image_cropping && this.$refs.image_cropping.image_meet_aspect_minimum) {
          this.$refs.image_cropping.resize_boundary()
        }
      }
    }
  }
</script>

<style lang="scss">
.instagram-share-preview {
  .hashtag,
  .mention {
    color: #003569;
  }
  .more {
    color: #999;
    margin-left: 5px;
  }
}
</style>
<style lang="scss" scoped>
  @import "compass-mixins/lib/compass";

  .instagram-share-preview {
    @include user-select(none);
    display: flex;
    flex-direction: column;
    max-width: 400px;
    border: 1px solid #E6E6E6;
    background-color: #FFF;
    border-radius: 3px;

    .username {
      font-weight: 600;
      color: #262626;
    }

    i.pbxx-icon {
      color: #000;
      font-size: 25px;
      margin-left: 0;
    }

    header {
      padding: 16px;
      border-bottom: 1px solid #E6E6E6;
      display: flex;

      i {
        margin-right: 10px;
      }
    }

    .img {
      width: 100%;
    }

    footer {
      padding: 0 16px;
      display: flex;
      flex-direction: column;

      .actions {
        margin-top: 8px;
        margin-bottom: 5px;

        i.pbxx-icon {
          margin-right: 20px;
        }
      }

      .text {
        margin-bottom: 5px;

        .username {
          margin-right: 5px;
        }
      }

      .date {
        font-size: 10px;
        line-height: 18px;
        letter-spacing: .2px;
        text-transform: uppercase;
        color: #999;
        margin-bottom: 4px;
      }
    }

  }
</style>
