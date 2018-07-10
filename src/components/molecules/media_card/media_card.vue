<template lang="pug">
  el-card.media-card(
    :class="{ 'selected': is_selected }"
  )
    span(
      @click.stop="asset_card_click"
    )
      media_image(
        :digital_asset="digital_asset"
      )
        .banner(
          v-if="digital_asset.brand_name || rep_only_text || expired_text"
          slot="banner"
        )
          // Left
          .rep_banner {{ rep_only_text }}
          // Right
          .expired_banner {{ expired_text }}
          // Left
          .brand_banner {{ digital_asset.brand_name }}
    i.pbxx-icon.pbxx-icon-hc-fw.pbxx-icon-hc-circle.selector(
      :class="{ 'pbxx-icon-check': is_selected }"
      @click.stop="asset_select_click"
    )
</template>

<script>
import media_image from '../media_image';
import inflection from 'inflection';

export default {
  name: 'media_card',
  components: {
    media_image,
  },
  props: {
    digital_asset: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    is_selected() {
      return this.digital_asset.is_selected;
    },

    expired_text() {
      return this.digital_asset.expired ? 'Expired' : '';
    },

    rep_only_text() {
      return this.digital_asset.rep_only ? `${this.division_alias} only` : '';
    },

    division_alias() {
      return this.digital_asset.division_alias ? inflection.pluralize(this.digital_asset.division_alias) : 'Divisions';
    },
  },

  methods: {
    asset_card_click() {
      this.$emit('asset_card_click', this.digital_asset);
    },

    asset_select_click() {
      this.$emit('asset_select_click', this.digital_asset);
    },
  },
};
</script>

<style lang="scss">
  .media-card .el-card__body {
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
</style>

<style lang="scss" scoped>
  @import "../../../styles/variables_and_mixins";

  .media-card {
    margin-top: 30px;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;

    .pbxx-icon {
      position: absolute;
      top: 0.25em;
      left: 0.25em;
      font-size: 1.2em;
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.4);
      @include transition(background-color 0.5s);
    }

    &.selected {
      .pbxx-icon {
        border: 1px solid get-color(green);
        background-color: get-color(green);
      }
    }
  }
</style>
