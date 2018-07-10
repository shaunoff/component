<template lang="pug">
  .demo
    .row.m-t-1-0
      component-doc(:component="engine_share_setting", :presets="presets")
</template>

<script>
import store from '@promoboxx/pbxxjsdata'
import engine_share_setting from './index.vue'

// @vue/component
export default {
  name: 'engine_share_setting_demo',
  data() {
    return {
      engine_share_setting,
      presets: {
        retailer: [
          {
            name: 'Victor\'s game shop'
          },
          {
            name: 'Don\'s smoke shop'
          }
        ],
        brand: [
          {
            name: 'Corey\'s Car Brand'
          },
          {
            name: 'Michelle\'s Art Brand'
          }
        ],
        share_setting: [
          store.add('share_setting', {
            name: 'facebook photo share',
            share_type: 'facebook',
            responsive_share_image_url: 'https://res.cloudinary.com/promoboxx/image/upload/c_scale,f_auto,q_auto,w_auto/fhkfzaxx5u4m1ncjeqsl.jpg',
            share_data: {
              share_data: {
                post_format: 'photo',
                image_url: 'https://scontent.xx.fbcdn.net/v/t1.0-9/29313033_1598599120178002_794833094281788088_n.jpg?_nc_cat=0&oh=d8d09e6ba7a23d6ba2f3b5139c876815&oe=5B39F963',
                message: 'Getting ready to sell your home? Find the best flooring for resale >> https://flooringinc.com/blog/best-flooring-resale/ Pin it for later >> https://www.pinterest.com/pin/449797081515090676/',
                title: 'hey this is a title'
              }
            },
            landing_page_copy: 'The Best LANDING PAGE copy ever',
            digital_assets: [
              {
                file: {
                  resource_type: 'image',
                  public_id: 'fhkfzaxx5u4m1ncjeqsl'
                }
              }
            ]
          }),
          store.add('share_setting', {
            name: 'twitter external video share',
            share_type: 'twitter',
            responsive_image_url: '/share_images/medium/missing.png',
            share_data: {
              share_data: {
                post_format: 'link',
                body: 'Happy first day of Spring 2018! One of the best spring activities— pond skimming. Who\'s as excited as we are?',
                append_link_to_message: null,
                link_append_custom_fields: null,
                link: 'https://youtu.be/8RXrTvlEg5A',
                share_url_type: 'base'
              }
            },
            landing_page_copy: 'The Best LANDING PAGE copy ever',
            digital_assets: [
              {
                file: null,
                external_video_url: 'https://youtu.be/8RXrTvlEg5A'
              }
            ]
          }),
          store.add('share_setting', {
            name: 'facebook native video share',
            share_type: 'facebook',
            responsive_image_url: '/share_images/medium/missing.png',
            share_data: {
              share_data: {
                post_format: 'video',
                link_append_custom_fields: null,
                append_link_to_message: '0'
              }
            },
            landing_page_copy: 'The Best LANDING PAGE copy ever',
            digital_assets: [
              {
                file: {
                  public_id: 'znazjv50qfrzlzygxokn',
                  resource_type: 'video'
                }
              }
            ]
          }),
          store.add('share_setting', {
            name: 'email template share',
            share_type: 'facebook',
            responsive_image_url: 'https://res.cloudinary.com/pbxx-staging/image/upload/v1521572986/c4f7cdwnbgwtlyjwz4ai.jpg',
            share_data: {
              share_data: {
                post_format: 'template',
                subject: 'title',
                body: 'message',
                title: 'title',
                description: 'desc',
                link: 'http://dealer.fallback',
                share_url_type: 'retailer_website',
                custom_share_url_id: null,
                button_text: 'Learn More'
              }
            },
            landing_page_copy: 'The Best LANDING PAGE copy ever',
            digital_assets: [
              {
                file: {
                  public_id: 'znazjv50qfrzlzygxokn',
                  resource_type: 'video'
                }
              }
            ]
          })
        ]
      }
    }
  }
}
</script>
