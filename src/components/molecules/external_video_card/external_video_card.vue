<template lang="pug">
  el-card.media-card.embed-responsive.embed-responsive-16by9(
    :class="{'selected': external_video.is_selected}"
    @click.native="asset_card_click()"
  )
    i.selector.pbxx-icon.pbxx-icon-hc-fw.pbxx-icon-hc-circle(
      :class="{ 'pbxx-icon-check': external_video.is_selected }"
      @click.stop="asset_select_click()"
    )

    embed_file.video_embed(:video_url="external_video.external_video_url")
      p(v-if="error") {{ error }}
    .banner(
      v-if="external_video.brand_name || rep_only_text || expired_text"
    )
      // Left
      .rep_banner {{ rep_only_text }}
      // Right
      .expired_banner {{ expired_text }}
      // Left
      .brand_banner {{ external_video.brand_name }}
</template>

<script>
import embed_file from '../../organisms/embed_file/index.vue';
import inflection from 'inflection';

export default {
  name: 'external_video_card',

  components: {
    embed_file,
  },

  props: {
    external_video: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    expired_text() {
      return this.external_video.expired ? 'Expired' : '';
    },

    rep_only_text() {
      return this.external_video.rep_only ? `${this.division_alias} only` : '';
    },

    division_alias() {
      return this.external_video.division_alias ? inflection.pluralize(this.external_video.division_alias) : 'Divisions';
    },
  },

  data() {
    return {
      error: null,
    };
  },

  mounted() {
    if (this.external_video.source === 'facebook') {
      this.$nextTick(window.FB.XFBML.parse());
    }
  },

  methods: {
    asset_card_click() {
      this.$emit('asset_card_click', this.external_video);
    },

    asset_select_click() {
      this.$emit('asset_select_click', this.external_video);
    },
  },

};
</script>

<style lang="scss">
  .el-upload .media-card iframe {
    z-index: initial;
    opacity: 1;
    filter: alpha(opacity=1);
  }

  .media-card {
    .selector {
      display: none;
      &.pbxx-icon-check {
        display: block;
      }
    }
  }
  .has_selected_cards {
    .media-card {
      .selector {
        display: block;
      }
    }
  }
  .hover_select {
    .media-card {
      &:hover {
        .selector {
          display: block;
        }
      }
    }
  }
  .no_click_to_play_video {
    .media-card {
      .video_embed {
        pointer-events: none;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../styles/variables_and_mixins";

  .media-card {
    margin-top: 30px;
    width: 100%;
    background-color: black;
    position: relative;

    .pbxx-icon {
      z-index: 1;
      position: absolute;
      top: 0.25em;
      left: 0.25em;
      font-size: 1.2em;
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.4);
      @include transition(background-color 0.5s);
    }

    .banner {
      color: white;
      position: absolute;
      width: 100%;
      padding: 0 0.75em 0 0.75em;
      background-color: rgba(0, 0, 0, 0.5);
      height: 2.5em;
      line-height: 2.5em;
      font-size: 0.8em;
      vertical-align: middle;
      top: 0;
      .expired_banner {
        float: right;
      }
      .brand_banner {
      }
      .rep_banner {
        float: left;
      }
    }

    &.selected {
      .pbxx-icon {
        border: 1px solid get-color(green);
        background-color: get-color(green);
      }
    }
  }
</style>
