<template lang="pug">
  .demo.m-t-1-0
    component-doc(:component="content_discovery_card")

    hr
    h2 Examples
    h5 link with photo

    content_discovery_card(
      :channel_type="card_1.channel_type",
      brand_name="My Brand",
      :loading="card_1.loading",
      :type="card_1.content_type",
      :title="card_1.title"
      :description="card_1.description",
      :image_url="card_1.image_url",
      :content_created_at="card_1.content_created_at",
      :cta_text="card_1.cta_text",
      @click_cta="respond_to_click")

    h5 link without photo

    content_discovery_card(
      :channel_type="card_2.channel_type",
      :type="card_2.content_type",
      :title="card_2.title"
      :description="card_2.description",
      :content_created_at="card_2.content_created_at",
      :cta_text="card_2.cta_text")

    h5 photo only

    content_discovery_card(
      :channel_type="card_3.channel_type",
      :type="card_3.content_type",
      :message="card_3.message",
      :image_url="card_3.image_url",
      :content_created_at="card_3.content_created_at",
      :cta_text="card_3.cta_text")

    h5 external video (youtube)

    content_discovery_card(
      :channel_type="card_4.channel_type",
      :type="card_4.content_type",
      :message="card_4.message",
      :video_url="card_4.video_url",
      :content_created_at="card_4.content_created_at",
      :cta_text="card_4.cta_text")

    h5 external video (facebook)

    content_discovery_card(
      :channel_type="card_5.channel_type",
      :type="card_5.content_type",
      :message="card_5.message",
      :video_url="card_5.video_url",
      :content_created_at="card_5.content_created_at",
      :image_url="card_5.image_url",
      :cta_text="card_5.cta_text")

    h5 text only

    content_discovery_card(
      :channel_type="card_6.channel_type",
      :type="card_6.content_type",
      :message="card_6.message",
      :content_created_at="card_6.content_created_at",
      :cta_text="card_6.cta_text")

    h5 link with bad photo

    content_discovery_card(
      :channel_type="card_7.channel_type",
      brand_name="My Brand"
      :type="card_7.content_type",
      :title="card_7.title"
      :description="card_7.description",
      :image_url="card_7.image_url",
      :content_created_at="card_7.content_created_at",
      :cta_text="card_7.cta_text")
</template>

<script>

import content_discovery_card from './index.vue'

// @vue/component
export default {
  name: 'content_discovery_card_demo',
  components: {
    content_discovery_card
  },
  data() {
    return {
      content_discovery_card,
      presets: {
        options: [{
          name: 'example',
          preset: [
            {
              key: 'facebook',
              label: 'Facebook'
            },
            {
              key: 'twitter',
              label: 'Twitter'
            },
            {
              key: 'youtube',
              label: 'Youtube'
            }
          ]
        }]
      },
      card_1: {
        channel_type: 'facebook',
        content_type: 'link',
        message: 'A message from the social page',
        title: 'Thrall, son of Durotan. Slayer of Garrosh. Ex-wielder of Doomhammer.',
        description: 'Wielder of Doomhammer, weapon of Orgrim circa 2007. Farseer of the elements. Master of the shamans. http://www.battle.net',
        content_created_at: '2017-01-01',
        image_url: 'http://www.loregy.com/wp-content/uploads/thrall1.jpg',
        cta_text: 'Create Campaign',
        loading: false
      },
      card_2: {
        channel_type: 'twitter',
        content_type: 'link',
        message: 'A message from the social page',
        title: 'Thrall, son of Durotan',
        description: 'Wielder of Doomhammer, weapon of Orgrim circa 2007. Farseer of the elements. Master of the shamans. http://www.battle.net',
        content_created_at: '2018-01-01',
        cta_text: 'Select'
      },
      card_3: {
        channel_type: 'facebook',
        content_type: 'photo',
        message: 'A message from the social page',
        content_created_at: '2017-07-01',
        image_url: 'http://www.loregy.com/wp-content/uploads/thrall1.jpg',
        cta_text: 'Create Campaign'
      },
      card_4: {
        channel_type: 'youtube',
        content_type: 'video',
        message: 'A message from the social page',
        content_created_at: '2017-07-01',
        video_url: 'https://www.youtube.com/watch?v=4VROOyDaeFs',
        cta_text: 'Select'
      },
      card_5: {
        channel_type: 'facebook',
        content_type: 'video',
        message: 'A message from the social page',
        content_created_at: '2017-11-01',
        video_url: 'https://www.facebook.com/PUMA/videos/10156251052968216/',
        image_url: 'https://scontent.xx.fbcdn.net/v/t15.0-10/s720x720/27597240_1721339094555618_2479328665423314944_n.jpg?_nc_cat=0&oh=ecd53d2fbc2e090756c04fc1c26bdf5b&oe=5B29012B',
        cta_text: 'Create Campaign'
      },
      card_6: {
        channel_type: 'twitter',
        content_type: 'text',
        message: 'A message from the social page',
        content_created_at: '2017-11-01',
        cta_text: 'Create Campaign'
      },
      card_7: {
        channel_type: 'facebook',
        content_type: 'link',
        message: 'A message from the social page',
        title: 'Thrall, son of Durotan',
        description: 'Wielder of Doomhammer, weapon of Orgrim circa 2007. Farseer of the elements. Master of the shamans. http://www.battle.net',
        content_created_at: '2017-01-01',
        image_url: 'http://www.loregy.com/wp-content/uploads/thrall1_link_that_doesnt_exist_woops.jpg',
        cta_text: 'Create Campaign'
      },
    }
  },

  methods: {
    respond_to_click(event) {
      console.log('A click event happened!', event)
      this.card_1.loading = true
      setTimeout(() => {
        this.card_1.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .content_discovery_card {
    width: 400px;
  }
</style>
