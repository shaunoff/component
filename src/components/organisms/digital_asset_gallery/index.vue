<template lang="pug">
  span(v-if="digital_assets || digital_asset_folders")
    .row
      transition-group(appear, name="digital-asset-gallery-folders", tag="div")
      .pbxx-card.responsive_typography.digital-asset-gallery-folder(
        v-for="(digital_asset_folder, index) in digital_asset_folders"
        :key="index"
      )
        div(
          v-if="digital_asset_folder"
        )
          digital_asset_folder(
            :digital_asset_folder="digital_asset_folder"
            @folder_navigate="folder_card_click(digital_asset_folder)"
            @folder_select="folder_select_click(digital_asset_folder)"
          )
    .row
      transition-group(appear, name="digital-asset-gallery", tag="div")
      .pbxx-card.responsive_typography.digital-asset-gallery-item(
        v-for="(digital_asset, index) in digital_assets"
        :key="digital_asset.id"
      )
        div.media-card(
          v-if="digital_asset.external_video_url"
        )
          external_video_card(
            :external_video="digital_asset"
            @asset_select_click="asset_select_click(digital_asset)"
            @asset_card_click="asset_card_click(digital_asset)"
          )

        div(
          v-else
        )
          media_card(
            :ref="digital_asset.id"
            :digital_asset="digital_asset"
            @asset_select_click="asset_select_click(digital_asset, index)"
            @asset_card_click="asset_card_click(digital_asset, index)"
          )
</template>

<script>
import media_card from '../../molecules/media_card';
import external_video_card from '../../molecules/external_video_card';

export default {
  name: 'digital_asset_gallery',

  components: {
    media_card,
    external_video_card,
  },

  props: {
    digital_assets: {
      type: Array,
      default: () => [],
    },
    digital_asset_folders: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    asset_card_click(digital_asset, index) {
      this.$emit('digital_asset_card_click', digital_asset, index);
    },

    asset_select_click(digital_asset, index) {
      this.$emit('digital_asset_select_click', digital_asset, index);
    },

    folder_card_click(digital_asset_folder) {
      this.$emit('digital_asset_folder_card_click', digital_asset_folder);
    },

    folder_select_click(digital_asset_folder) {
      this.$emit('digital_asset_folder_select_click', digital_asset_folder);
    },
  },
};
</script>

<style lang="scss">
  .media-card.el-card {
    box-shadow: none;
    &:hover {
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      cursor: pointer;
    }
  }
  .media-card.el-card__body {
    padding: 0;
  }

  .el-checkbox {
    +.el-checkbox {
      margin-left: 25px;
    }
  }
</style>

<style lang="scss" scoped>
  .digital-asset-gallery-item {
    transition: all 1s;
  }
  .digital-asset-gallery-enter, .digital-asset-gallery-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .digital-asset-gallery-leave-active {
    position: absolute;
  }

  .row {
    > div.col-md-3:last-child {
      > div {
        height: calc(100% - 15px);
      }
    }
  }

</style>
