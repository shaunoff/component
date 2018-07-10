<template lang="pug">
  div
    .fb-video(
      v-if="video_url && embed_url"
      :data-href="embed_url"
      data-width="450"
      :data-height="video_height"
      data-allowfullscreen="true"
      data-show-text="false"
    )
      .fb-xfbml-parse-ignore
        blockquote(
          :cite="embed_url"
        )
</template>

<script>

import embed from '../../../helpers/embed';

// @vue/component
export default {
  name: 'facebook_embed_file',
  introduction: 'Renders an embeded facebook video from a facebook link input',
  props: {
    video_url: {
      type: String,
      default: '',
    },
    video_height: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
    };
  },
  computed: {
    embed_url() {
      if (this.video_url) {
        this.$nextTick(() => window.FB.XFBML.parse()); // necessary to update facebook element
        return embed.facebook_embed(this.video_url);
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
