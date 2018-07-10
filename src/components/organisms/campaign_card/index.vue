<template lang="pug">
  .campaign.pbxx-card
    .card
      .image(:style="{backgroundImage: `url(${campaign_background})`}", @click="navigate()")
        .brand {{ brand.name }}
        .icons
          .icon(v-if="campaign.popular")
            el-tooltip(content="Popular", effect="light", placement="top")
              .pbxx-icon.pbxx-icon-flamefire.pbxx-icon-hc-circle.pbxx-icon-hc-fw(@click.stop="navigate()")
          .icon(v-if="local_ads_balance_loaded()")
            el-tooltip(content="Local Ads", effect="light", placement="top")
              .pbxx-icon.pbxx-icon-portable-wifi.pbxx-icon-hc-circle.pbxx-icon-hc-fw(@click.stop="navigate('localads')")
          .icon(v-if="campaign.co_op_enabled")
            el-tooltip(content="Add funds for reimbursement!", effect="light", placement="top")
              .pbxx-icon.pbxx-icon-badge-check.pbxx-icon-hc-circle.pbxx-icon-hc-fw(@click.stop="navigate('localads')")
      .info
        .text-center
          .name {{ truncated_campaign_name }}
          .local_ads_balance(v-if="local_ads_balance_loaded()", @click="navigate('localads')")
            span Local Ads Available: ${{ formated_local_ads_balance() }}

      socials(:content="campaign.socials", :shares="campaign.invitation && campaign.invitation.socials", @navigate="navigate")
      .footer
        .dismiss.pull-left.dismissible(v-if="dismiss_interactable()")
          el-tooltip(:content="dismissible_tooltip()", effect="light", placement="top")
            i.pbxx-icon(:class="[dismiss_state()]", @click="dismissible_action")
        a.pull-right.text-uppercase(@click="navigate()") view campaign
</template>

<script>
  const MAX_CAMPAIGN_NAME_LENGTH = 80
  const CAMPAIGN_DEFAULT_IMAGE_PATH = 'default-campaign-background.png'
  import asset_helper from '../../../helpers/assets_helper'
  import numeral from 'numeral'
  import socials from './socials.vue'

  // @vue/component
  export default {
    name: 'campaign_card',
    components: {
      socials
    },
    props: {
      brand: Object,
      campaign: Object,
      retailer_account: Object
    },
    data() {
      return {
        local_ads_balance: 0
      }
    },
    computed: {
      truncated_campaign_name() {
        return this.campaign.name.length > MAX_CAMPAIGN_NAME_LENGTH ? `${this.campaign.name.substring(0, MAX_CAMPAIGN_NAME_LENGTH)} …` : this.campaign.name
      },
      campaign_background() {
        return this.campaign.logo_url || assets_helper.image_url(CAMPAIGN_DEFAULT_IMAGE_PATH)
      }
    },
    methods: {
      local_ads_balance_loaded() {
        return this.campaign.invitation && this.campaign.invitation.local_ad_balance && this.campaign.invitation.local_ad_balance.local_ads_balance
      },
      dismiss_state() {
        return this.campaign.invitation && this.campaign.invitation.opted_out ? 'pbxx-icon-eye' : 'pbxx-icon-eye-off'
      },
      dismissible_tooltip() {
        return this.campaign.invitation && this.campaign.invitation.opted_out ? 'Return to dashboard' : 'Dismiss'
      },
      formated_local_ads_balance() {
        return this.campaign.invitation ? numeral(this.campaign.invitation.local_ad_balance.local_ads_balance / 100).format('0,0') : numeral(0).format('0,0')
      },
      dismiss_interactable() {
        return this.campaign.invitation && this.campaign.invitation.opted_out || this.dismissible() //eslint-disable-line
      },
      dismissible() {
        return this.campaign.invitation && !this.campaign.invitation.opted_out && this.campaign.invitation.state !== 'engaged' //eslint-disable-line
      },
      opt_in() {
        this.campaign.invitation.opt_in().then(() => {
          this.$parent.$emit('campaign_changed_state', this.campaign)
        }, (error) => {
          throw error
        })
      },
      opt_out() {
        this.campaign.invitation.opt_out().then(() => {
          this.$parent.$emit('campaign_changed_state', this.campaign)
        }, (error) => {
          throw error
        })
      },
      dismissible_action() {
        if (this.dismiss_interactable()) {
          if (this.campaign.invitation && this.campaign.invitation.opted_out) {
            this.opt_in()
          } else {
            this.opt_out()
          }
        }
      },
      navigate(channel) {
        this.$emit('navigate', {
          campaign: this.campaign,
          channel
        })
      }
    }
  }
</script>
