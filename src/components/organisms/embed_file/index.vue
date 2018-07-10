<template lang="pug">
  component.embed_file(
    v-if="video_url && video_component_type"
     :is="video_component_type"
     :video_url="video_url")
</template>

<script>

import embed from '../../../helpers/embed';

import facebook_embed_file from '../../molecules/facebook_embed_file';
import youtube_embed_file from '../../molecules/youtube_embed_file';
import vimeo_embed_file from '../../molecules/vimeo_embed_file';

// @vue/component
export default {
  name: 'embed_file',
  components: {
    facebook_embed_file,
    youtube_embed_file,
    vimeo_embed_file,
  },
  introduction: 'Renders an embeded video from a video link input',
  props: {
    video_url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  computed: {
    embed_type() {
      return embed.determine_video_source(this.video_url);
    },

    video_component_type() {
      if (this.embed_type) {
        return `${this.embed_type}_embed_file`;
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .embed_file {
    width: 100%;
  }
</style>
