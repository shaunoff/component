<template lang="pug">
  .demo.m-t-1-0
    facebook_share_preview.m-b-1-0(
      v-for="share_setting in facebook_share_settings"
      :avatar="share_setting.avatar"
      :link="share_setting.link"
      :title="share_setting.title"
      :post_format="share_setting.post_format"
      :description="share_setting.description"
      :image_url="share_setting.image_url"
      :external_video_url="share_setting.external_video_url"
      :video_tag="share_setting.video_tag"
      :suggested_copy="share_setting.suggeseted_copy"
      :asset_type="share_setting.asset_type"
    )
</template>

<script>
import facebook_share_preview from './index.vue'
// @vue/component
export default {
  name: 'facebook_share_preview_demo',
  components: {
    facebook_share_preview
  },
  data () {
    return {
      facebook_share_settings: [
        {
          avatar: 'http://www.car-brand-names.com/wp-content/uploads/2015/08/Chevrolet-emblem.jpg',
          date: new Date(),
          post_format: 'photo',
          text: '#Daypacked — built to handle a little bit of spontaneity. Live day: packed. Since this is a test I am going to make this much longer, in fact so much longer because I am pushing the boundaries of content & all that is good in the world with this awful run on sentence that I want to make sure never ends until now ok bai. Actually PSYCHE i am just short of 500 characters and I really want to make sure i get there for the sake of argument so now i am just killing time or letters or both. ok 11 more',
          image_url: 'http://www.billboard.com/files/styles/900_wide/public/media/taylor-swift-press-photo-2016-billboard-1548.jpg',
          link: 'http://pbxx.it/SqCySv',
          title: 'New Patagonia Daypacks: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ipsum nonumy eirmod tempor invidunt ut labore et.',
          description: 'Patagonia Daypacks are born organizers—tough, direct, designed for the unexpected and comfortable under pressure. Now with even more recycled materials, an updated fit and comfort improvements across the board lorem ipsum posem.',
          asset_type: 'image',
          suggested_copy: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ipsum nonumy eirmod tempor invidunt ut labore et.'
        },
        {
          date: new Date(),
          post_format: 'photo',
          text: '#Daypacked — built to handle a little bit of spontaneity. Live day: packed. Since this is a test I am going to make this much longer, in fact so much longer because I am pushing the boundaries of content & all that is good in the world with this awful run on sentence that I want to make sure never ends until now ok bai. Actually PSYCHE i am just short of 500 characters and I really want to make sure i get there for the sake of argument so now i am just killing time or letters or both. ok 11 more',
          image_url: 'http://www.billboard.com/files/styles/900_wide/public/media/taylor-swift-press-photo-2016-billboard-1548.jpg',
          link: 'http://pbxx.it/SqCySv',
          title: 'New Patagonia Daypacks: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ipsum nonumy eirmod tempor invidunt ut labore et.',
          description: 'Patagonia Daypacks are born organizers—tough, direct, designed for the unexpected and comfortable under pressure. Now with even more recycled materials, an updated fit and comfort improvements across the board lorem ipsum posem.',
          asset_type: 'image',
          suggested_copy: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ipsum nonumy eirmod tempor invidunt ut labore et.'
        },
        {
          date: new Date(),
          post_format: 'video',
          text: '#Daypacked — built to handle a little bit of spontaneity. Live day: packed. Since this is a test I am going to make this much longer, in fact so much longer because I am pushing the boundaries of content & all that is good in the world with this awful run on sentence that I want to make sure never ends until now ok bai. Actually PSYCHE i am just short of 500 characters and I really want to make sure i get there for the sake of argument so now i am just killing time or letters or both. ok 11 more',
          link: 'http://pbxx.it/SqCySv',
          title: 'New Patagonia Daypacks: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ipsum nonumy eirmod tempor invidunt ut labore et.',
          description: 'Patagonia Daypacks are born organizers—tough, direct, designed for the unexpected and comfortable under pressure. Now with even more recycled materials, an updated fit and comfort improvements across the board lorem ipsum posem.',
          asset_type: 'video',
          suggested_copy: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ipsum nonumy eirmod tempor invidunt ut labore et.',
          external_video_url: 'https://vimeo.com/250356669',
          video_tag: '<iframe src="https://player.vimeo.com/video/250356669" width="450" height="191" frameborder="0" title="Ellen is Leaving" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        }
      ]
    }
  }
}
</script>
