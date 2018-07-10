<template lang="pug">
  .digital_assets.m-t-2-5
    .card
      .card-content
        section.campaign-assets
          header
            h4 Upload Campaign Assets
            digital_asset_selector(
              v-if="campaign_digital_assets.length"
              :digital_assets="campaign_digital_assets"
              :scope_object="campaign"
              @selected_assets_deleted="on_selected_assets_deleted"
              @digital_asset_select_all_toggled="on_digital_asset_select_all_toggled"
            )
            digital_asset_uploader(
              :scope_object="campaign"
              :multiple="true"
              :accept="accept"
              :action_endpoint="cloudinary_endpoint"
              :valid_types="valid_types"
              :digital_asset_params="{ campaign_id: campaign.id }"
              :empty_uploader="!digital_assets_present"
              @upload_progress="on_upload_progress"
              @upload_success="on_upload_success"
              @digital_asset_created="on_digital_asset_created"
              @digital_asset_select_toggled="on_digital_asset_select_toggled"
            )
            digital_asset_gallery(
              :digital_assets="campaign_digital_assets",
              @digital_asset_select_toggled="on_digital_asset_select_toggled"
            )
</template>

<script>

import digital_asset_selector from '../../molecules/selector';
import digital_asset_uploader from '../../organisms/digital_asset_uploader/index.vue';
import digital_asset_gallery from '../../organisms/digital_asset_gallery/index.vue';
import store from '../../../helpers/store';
import scope_object from '../../../helpers/scope_object';


const valid_types = ['image', 'video', 'pdf', 'zip'];
const accept = 'video/*, video/mp4, image/*, application/zip, application/pdf';

// @vue/component
export default {
  name: 'digital_asset_explorer',
  components: {
    digital_asset_selector,
    digital_asset_uploader,
    digital_asset_gallery,
  },
  props: {
    digital_assets: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      campaign: scope_object.current_campaign,
    };
  },
  computed: {
    campaign_digital_assets() {
      return this.digital_assets;
    },

    cloud_name() {
      return document.querySelector('meta[name="cloudinary_cloud_name"]').content;
    },

    cloudinary_endpoint() {
      return `https://api.cloudinary.com/v1_1/${this.cloud_name}/upload`;
    },

    digital_assets_present() {
      return this.digital_assets && this.digital_assets.length;
    },
  },
};
</script>

<style lang="scss" scoped>

  .card {
    border: 1px solid #e3e3e3;
    border-radius: 4px;

    .card-title {
      background: #ECECEC;
      color: #656565;
      padding: 10px;
      font-size: 16px;
      font-weight: 700;
    }

    .card-content {
      padding: 25px;
      background: #FFF;
    }
  }

  .digital_assets {
    .card-content {
      > section {
        margin: 0 -25px;
        padding: 25px;
        border-bottom: solid 10px #F4F4F4;

        &:first-child {
          padding-top: 0;
          padding-bottom: 25px;
        }

        &:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        header {
          margin-bottom: 22px;

          .delete {
            margin-left: 20px;
            font-size: 14px;
            color: #00ADD1;
          }
        }

        &.campaign-assets {
          header {
            > .row {
              margin: 15px 0px 0px 0px;
              height: 36px;
              align-items: center;
            }
          }
        }
      }
    }
  }

  .inline-block {
    display: inline-block;
  }

  .raw-icon-container {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 17px;
    i {
      font-size: 100pt;
    }
  }

</style>
