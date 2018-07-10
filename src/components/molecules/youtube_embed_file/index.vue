<template lang="pug">
  iframe(
    v-if="video_url && embed_url"
    width="450"
    :height="video_height"
    :src="embed_url"
    webkitallowfullscreen mozallowfullscreen allowfullscreen
  )
</template>

<script>

import embed from '../../../helpers/embed';

// @vue/component
export default {
  name: 'youtube_embed_file',
  introduction: 'Renders an embeded youtube video from a youtube link input',
  props: {
    video_url: {
      type: String,
      default: '',
    },
    video_height: {
      type: String,
      default: '253px',
    },
  },
  data() {
    return {
    };
  },
  computed: {
    embed_url() {
      if (this.video_url) {
        return embed.youtube_embed(this.video_url);
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
