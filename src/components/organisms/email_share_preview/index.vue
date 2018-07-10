<template lang="pug">
  article.email-share-preview
    h4 {{ subject }}
    hr
    span.util-float-right {{ date }}

    div(v-if="!is_full_html")
      .text-center
        span {{ title }}

      .text-center(v-if="digital_asset_url")
        img(:src="digital_asset_url", class="asset-preview")

      .text-center(v-html="body")

      .text-center.m-b-1-0
        el-button(type="primary") {{ button_text }}

    div(v-if="is_full_html", v-html="body")

</template>

<script>
  import moment from 'moment'

  // @vue/component
  export default {
    name: 'pbxx_email_share_preview',
    introduction: 'Renders a generic email preview containing subject, who the email is from and the message.',
    props: {
      from: {
        type: String,
        required: true,
        default: 'Promoboxx'
      },
      subject: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: null,
        required: false
      },
      button_text: {
        type: String,
        required: true
      },
      body: {
        type: String,
        default: null,
        required: false
      },
      email_type: {
        type: String,
        required: true
      },
      digital_asset_url: {
        type: String,
        default: null,
        required: false
      }
    },
    data() {
      return {
        date: ''
      }
    },
    computed: {
      is_full_html() {
        return this.email_type === 'full_html'
      }
    },
    mounted() {
      this.date = moment().format('MMM D')
    }
  }
</script>

<style lang="scss" scoped>
.email-share-preview {
  width: 100%;
  max-width: 650px;
  border: 1px solid #f0f0f0;
  padding: 10px;
  padding-bottom: 0;

  .util-float-right {
    float: right;
  }

  .util-float-right:after {
    clear: both;
  }

  .text-center {
    margin-top: 20px;
    text-align: center;
  }

  .asset-preview {
    width: 100%;
    max-width: 500px;
  }

  iframe {
    border: 0px solid #f0f0f0;
    width: 100%;
    min-height: 500px;
    margin-top: 10px;
  }
}
</style>
