<template lang="pug">
  .demo.m-t-1-0
    component-doc(:component="twitter_share_preview")
    twitter_share_preview.m-b-1-0(
      v-for="share_setting in twitter_share_settings"
      :link="share_setting.link",
      :body="share_setting.body",
      :image_url="share_setting.image_url",
      :external_video_url="share_setting.external_video_url",
      :video_tag="share_setting.video_tag",
      :post_format="share_setting.post_format"
    )
</template>

<script>
import twitter_share_preview from './index.vue'
// @vue/component
export default {
  name: 'twitter_share_preview_demo',
  components: {
    twitter_share_preview
  },
  data() {
    return {
      twitter_share_preview,
      twitter_share_settings: [
        {
          body: 'New Patagonia Daypacks: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ipsum nonumy eirmod tempor invidunt ut labore et.',
          post_format: 'video',
          external_video_url: 'https://vimeo.com/250356669',
          video_tag: '<iframe src="https://player.vimeo.com/video/250356669" width="450" height="191" frameborder="0" title="Ellen is Leaving" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        }
      ]
    }
  }
}
</script>
