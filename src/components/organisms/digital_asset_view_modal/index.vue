<template lang="pug">
  el-dialog(
    :title="modal_title"
    :visible.sync="visible"
    :modal-append-to-body="false"
    @close="close()"
  )
    section(v-if="digital_assets")
      div(v-if="is_bulk && digital_assets")
        label Bulk download
      div(v-else-if="!is_bulk && single_digital_asset")
        embed_file(
          v-if="single_digital_asset.external_video_url"
          :video_url="single_digital_asset.external_video_url"
        )
        .asset_image(
          v-else
        )
          media_image(
            :digital_asset="single_digital_asset"
            :key="single_digital_asset.id"
            :class="{ view_larger_image: !single_digital_asset.is_zip && !single_digital_asset.is_video }"
            @click.native="view_asset_larger"
          )
        div.clearfix.m-t-0-3.gray-light-font-color
          small.pull-left(
            v-if="single_digital_asset.created_at"
          )
            | Created on {{ single_digital_asset.created_at | date_format }}
          span.pull-right(
            v-if="single_digital_asset.file"
          )
            small(v-if="['image', 'video'].includes(single_digital_asset.file.resource_type) && single_digital_asset.file.format != 'pdf'")
              | Dimensions: {{single_digital_asset.file.width}} x {{single_digital_asset.file.height}}
            small(v-else)
              | Size: {{format_size(single_digital_asset.file.bytes)}}
        p.m-t-1-5(v-if="single_digital_asset.description")
          | {{ single_digital_asset.description }}
          .badges
            .badge(
              v-for="tag in single_digital_asset.tag_list"
            ) {{ tag }}
        div(v-if="single_digital_asset.expires_at")
          p.m-t-1-0
            i.pbxx-icon.pbxx-icon-calendar.pbxx-icon-hc-fw
            | This asset will expire {{ single_digital_asset.expires_at | date_format }}
        div(v-if="single_digital_asset.external_video_url")
          a(
            :href="single_digital_asset.external_video_url"
            target="_blank"
          ) {{ single_digital_asset.external_video_url }}
      div(v-else)
        label Sorry! Nothing to view

    span.dialog-footer.clearfix(
        slot="footer"
    )
      el-button(
        type="default"
        @click="close()"
      ) Close
      el-button(
        v-if="is_bulk && digital_assets"
        @click="download_bulk()",
        type="info"
        :disabled="has_errors"
      ) Download {{digital_assets.length}} Items
      a(
        v-else-if="!is_bulk && single_digital_asset && single_digital_asset.download_url"
        :href="single_digital_asset.download_url"
        target="_blank"
        download
      )
        el-button.m-l-15(
          @click="download()"
          type="info"
          :disabled="has_errors"
        ) Download
</template>

<script>
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment-timezone';

import media_image from '../../molecules/media_image';
import external_video_card from '../../molecules/external_video_card';

export default {
  name: 'digital_asset_view_modal',
  components: {
    media_image,
    external_video_card,
  },
  props: {
    is_visible: {
      type: Boolean,
      default: false,
    },
    digital_assets: {
      type: Array,
      default: () => [],
    },
  },

  filters: {
    date_format(date) {
      return moment.tz(date, moment.tz.guess()).format('MMMM D, YYYY');
    },
  },

  data() {
    return {
      visible: false,
      single_digital_asset: _.cloneDeep(this.digital_assets[0]),
    };
  },

  watch: {
    is_visible(val) {
      this.visible = val;
    },
    digital_assets(assets) {
      this.single_digital_asset = _.cloneDeep(assets[0]);
    },
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit('digital_asset_view_modal_closed');
    },

    download() {
      this.$emit('digital_asset_view_modal_download', this.single_digital_asset);
    },

    bulk_download() {
      // TODO: Download items
    },

    format_size(bytes) {
      return numeral(bytes).format('0.00b');
    },

    view_asset_larger() {
      if (!this.single_digital_asset.is_zip && !this.single_digital_asset.is_video) {
        window.open(this.single_digital_asset.file_url, '_blank');
      }
    },
  },

  computed: {
    is_bulk() {
      return this.digital_assets.length > 1;
    },

    modal_title() {
      return this.single_digital_asset && this.single_digital_asset.name ? this.single_digital_asset.name : 'View Asset';
    },
  },
};

</script>
<style lang="scss" scoped>
  @import "../../../styles/variables_and_mixins";

  .asset_image {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
  }

  .view_larger_image {
    cursor: pointer;
    box-shadow: none;
    &:hover {
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      cursor: pointer;
      &:after {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0,0,0,0.4);
        padding: 0 8px;
        font-size: 1.5em;
        font-family: "promoboxx-icon";
        content: "\f1c3";
        color:  #fff;
      }
    }
  }

  .badges {
    display: inline-block;
    .badge {
      margin-right: .5em;
      margin-top: .5em;
    }
  }

  .pre_wrap {
    white-space: pre-wrap;
  }
</style>
