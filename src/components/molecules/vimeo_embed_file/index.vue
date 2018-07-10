<template lang="pug">
  iframe(
    v-if="video_url && embed_url"
    width="450"
    height="253"
    :src="embed_url"
    webkitallowfullscreen mozallowfullscreen allowfullscreen
  )
</template>

<script>

  import embed from '../../../helpers/embed'

  // @vue/component
  export default {
    name: 'vimeo_embed_file',
    introduction: 'Renders an embeded vimeo video from a vimeo link input',
    props: {
      video_url: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    computed: {
      embed_url() {
        if (this.video_url) {
          return embed.vimeo_embed(this.video_url)
        }
        return ''
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
