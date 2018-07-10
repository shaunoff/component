<template lang="pug">
  .demo
    component-doc(:component="campaign_card")
    .row
      h4.col-lg-12 with retailer account
      campaign_card(v-for="campaign in campaigns", :brand="brand", :campaign="campaign", :retailer_account="retailer_account", @navigate="navigate")
    .row
      h4.col-lg-12 without retailer account
      campaign_card(v-for="campaign in campaigns", :brand="brand", :campaign="campaign", @navigate="navigate")
</template>

<script>
import campaign_card from './index.vue'
// @vue/component
export default {
  name: 'campaign_card_demo',
  components: {
    campaign_card
  },
  data() {
    return {
      campaign_card,
      campaigns: [
        {
          id: 1,
          name: "Really long campaign name that just won't fit, may we have to truncate it, especially the words after this.",
          invitation: {
            local_ad_balance: {
              local_ads_balance: 25
            }
          },
          socials: [
            {
              channel: 'facebook',
              count: 2,
              last_created_on: 'Wed Dec 27 2017 15:28:35 GMT-0500 (EST)'
            }
          ]
        },
        {
          id: 2,
          name: "Really long campaign name that just won't fit, may we have to truncate it, especially the words after this.",
          co_op_enabled: true,
          socials: [
            {
              channel: 'twitter',
              count: 2,
              last_created_on: 'Wed Dec 27 2017 15:28:35 GMT-0500 (EST)'
            },
            {
              channel: 'email',
              count: 2,
              last_created_on: 'Wed Dec 27 2017 15:28:35 GMT-0500 (EST)'
            }
          ]
        },
        {
          id: 3,
          name: "Really long campaign name that just won't fit, may we have to truncate it, especially the words after this.",
          popular: true,
          co_op_enabled: true,
          socials: [
            {
              channel: 'embed',
              count: 2,
              last_created_on: 'Wed Dec 27 2017 15:28:35 GMT-0500 (EST)'
            },
            {
              channel: 'instagram',
              count: 2,
              last_created_on: 'Wed Dec 27 2017 15:28:35 GMT-0500 (EST)'
            }
          ]
        },
        {
          id: 4,
          name: "Really long campaign name that just won't fit, may we have to truncate it, especially the words after this.",
          popular: true,
          socials: [
            {
              channel: 'asset',
              count: 2,
              last_created_on: 'Wed Dec 27 2017 15:28:35 GMT-0500 (EST)'
            }
          ]
        }
      ],
      brand: {
        id: 1,
        name: 'Really Long Brand Name'
      },
      retailer_account: {
        id: 1
      }
    }
  },
  methods: {
    navigate(data) {
      const { campaign, channel } = data
      if (channel) {
        console.log(channel) // eslint-disable-line
      } else {
        console.log(campaign) // eslint-disable-line
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .demo {
    margin-top: 1em;
  }
</style>
