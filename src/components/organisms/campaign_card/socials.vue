<template lang="pug">
  .socials.text-right
    el-popover(trigger="hover", placement="top")
      .text-center
        strong
          | {{ top_message('embed') }}
        br
        | {{ bottom_message('embed') }}
      .pbxx-icon.pbxx-icon-banners.pbxx-icon-hc-circle.pbxx-icon-hc-fw(v-if="latest_embed_content", :class="{new_shares: new_embed_content}", @click="navigate('banner')", slot="reference")
    el-popover(trigger="hover", placement="top")
      .text-center
        strong
          | {{ top_message('email') }}
        br
        | {{ bottom_message('email') }}
      .pbxx-icon.pbxx-icon-local-post-office.pbxx-icon-hc-circle.pbxx-icon-hc-fw(v-if="latest_email_content", :class="{new_shares: new_email_content}", @click="navigate('email')", slot="reference")
    el-popover(trigger="hover", placement="top")
      .text-center
        strong
          | {{ top_message('asset') }}
        br
        | {{ bottom_message('asset') }}
      .pbxx-icon.pbxx-icon-download.pbxx-icon-hc-circle.pbxx-icon-hc-fw(v-if="latest_asset_content", :class="{new_shares: new_asset_content}", @click="navigate('downloadables')", slot="reference")
    el-popover(trigger="hover", placement="top")
      .text-center
        strong
          | {{ top_message('twitter') }}
        br
        | {{ bottom_message('twitter') }}
      .pbxx-icon.pbxx-icon-twitter.pbxx-icon-hc-circle.pbxx-icon-hc-fw(v-if="latest_twitter_content", :class="{new_shares: new_twitter_content}", @click="navigate('twitter')", slot="reference")
    el-popover(trigger="hover", placement="top")
      .text-center
        strong
          | {{ top_message('facebook') }}
        br
        | {{ bottom_message('facebook') }}
      .pbxx-icon.pbxx-icon-facebook.pbxx-icon-hc-circle.pbxx-icon-hc-fw(v-if="latest_facebook_content", :class="{new_shares: new_facebook_content}", @click="navigate('facebook')", slot="reference")
    el-popover(trigger="hover", placement="top")
      .text-center
        strong
          | {{ top_message('instagram') }}
        br
        | {{ bottom_message('instagram') }}
      .pbxx-icon.pbxx-icon-instagramnew.pbxx-icon-hc-circle.pbxx-icon-hc-fw.instagram-background-color(v-if="latest_instagram_content", :class="{new_shares: new_instagram_content}", @click="navigate('instagram')", slot="reference")
</template>

<script>
  const social_channels = ['instagram', 'facebook', 'twitter', 'asset', 'email', 'embed']
  const social_channel_humanized_terms = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter',
    asset: 'Downloadables',
    email: 'Email',
    embed: 'Web Banners'
  }
  import _ from 'lodash'
  import inflection from 'inflection'
  import moment from 'moment'

  const component = {
    name: 'socials',
    props: {
      content: Array,
      shares: Array
    },
    computed: {},
    methods: {
      latest_social_content(channel) {
        const latest = _.find(this.content, { channel })
        return latest
      },
      latest_social_share(channel) {
        const latest = _.find(this.shares, { channel })
        return latest
      },
      new_social_content(channel) {
        const latest_social_content = this[`latest_${channel}_content`]
        const latest_social_share = this[`latest_${channel}_share`]
        if (latest_social_content) {
          if (latest_social_share) {
            if (moment(latest_social_content.last_created_on).isBefore(moment(latest_social_share.last_shared_on))) {
              return false
            }
              return true
          }
            return true
        }
          return false
      },
      social_count_message(channel) {
        if (this[`new_${channel}_content`]) {
          return 'New Shares Available!'
        }
          const latest_social_share = this[`latest_${channel}_share`]
          return latest_social_share ? `You've shared ${latest_social_share.count} ${inflection.inflect('time', latest_social_share.count)}` : ''
      },
      social_latest_message(channel) {
        const latest_social_share = this[`latest_${channel}_share`]
        if (latest_social_share) {
          const last_shared_on = moment(latest_social_share.last_shared_on)
          if (last_shared_on.isBefore(moment())) {
            return `last share on ${last_shared_on.format('M/D/YY')}`
          }
            return `next post scheduled for ${last_shared_on.format('M/D/YY')}`
        }
          return null
      },
      social_option_message(channel) {
        const latest_content = this[`latest_${channel}_content`]
        if (latest_content) return `${latest_content.count} option${latest_content.count !== 1 ? 's' : ''} available`
        return ''
      },
      top_message(channel) {
        return this[`latest_${channel}_share`] ? this[`${channel}_count_message`] : social_channel_humanized_terms[channel]
      },
      bottom_message(channel) {
        return this[`latest_${channel}_share`] ? this[`${channel}_latest_message`] : this.social_option_message(channel)
      },
      navigate(channel) {
        this.$emit('navigate', channel)
      }
    }
  }

  social_channels.forEach((channel) => {
    component.computed[`latest_${channel}_content`] = () => this.latest_social_content(channel)
    component.computed[`latest_${channel}_share`] = () => this.latest_social_share(channel)
    component.computed[`new_${channel}_content`] = () => this.new_social_content(channel)
    component.computed[`${channel}_count_message`] = () => this.social_count_message(channel)
    component.computed[`${channel}_latest_message`] = () => this.social_latest_message(channel)
  })

  export default component
</script>

<style lang="scss">
  @import "../../../styles/variables_and_mixins";
  .socials {
    background-color: white;
    height: 3em;
    border-bottom: 1px solid get-color(gray-lightest);
    padding: 0.5em 0.75em 0 0.75em;
    color: white;
    .pbxx-icon {
      font-size: 1.25em;
      cursor: pointer;
      display: inline-block;
      margin: 0 0 0 0.25em;
      &:not(.new_shares) {
        background: get-color(gray-lighter) !important;
      }
    }
    .pbxx-icon-banners, .pbxx-icon-local-post-office, .pbxx-icon-download, .pbxx-icon-facebook {
      background-color: get-color(facebook-color);
    }
    .pbxx-icon-twitter {
      background-color: get-color(twitter-color);
    }
  }
</style>
