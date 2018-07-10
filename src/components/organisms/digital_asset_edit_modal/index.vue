<template lang="pug">
  el-dialog(
    :title="modal_title"
    :visible.sync="visible"
    :modal-append-to-body="false"
    @close="close()"
  )
    section.form(v-if="digital_assets")
        .form_group(v-if="is_bulk && updated_bulk_digital_asset")
          .form_item
            label Add tags
            el-select(
              v-model="updated_bulk_digital_asset.tag_list"
              multiple
              allow-create
              filterable
              placeholder="Select existing or type in new tags"
            )
              el-option(
                v-for="tag in tag_list"
                :key="tag"
                :label="tag"
                :value="tag"
              )
            .form_error
          .form_item
            label Select asset expiration date
            .d-flex.justify-content-between
              el-date-picker.m-r-1-0(
                v-model="updated_bulk_digital_asset.expires_at"
                placeholder="Expiration date"
                type="date"
                format="MMMM d, yyyy"
              )
            .form_error
          .form_item
            el-checkbox(
                v-model="updated_bulk_digital_asset.rep_only"
                :label="`Only visible to ${division_alias}`"
              )
            .form_error
        .row(v-else-if="!is_bulk && updated_digital_asset")
          .col-md-6(v-if="is_visible")
            embed_file(
              v-if="updated_digital_asset.external_video_url"
              :video_url="updated_digital_asset.external_video_url"
            )
            .asset_image(
              v-else
            )
              media_image(
                :digital_asset="updated_digital_asset"
                :key="updated_digital_asset.id"
                :class="{ view_larger_image: !updated_digital_asset.is_zip && !updated_digital_asset.is_video }"
                @click.native="view_asset_larger"
              )
            div.gray-light-font-color
              div.m-t-0-3
                small(
                  v-if="updated_digital_asset.created_at"
                )
                  | Created on {{ updated_digital_asset.created_at | date_format }}
              div.m-t-0-3(
                  v-if="updated_digital_asset.file"
                )
                  small(v-if="['image', 'video'].includes(updated_digital_asset.file.resource_type) && updated_digital_asset.file.format != 'pdf'")
                    | Dimensions: {{updated_digital_asset.file.width}} x {{updated_digital_asset.file.height}}
                  small(v-else) Size: {{format_size(updated_digital_asset.file.bytes)}}
              div.m-t-0-3
                small
                  | {{ updated_digital_asset.download_count }} {{ 'Download' | inflect(updated_digital_asset.download_count) }}
          .col-md-6.form_group
            .form_item
              label Name the asset
              el-input(v-model='updated_digital_asset.name' placeholder="Asset name")
              .form_error
            .form_item
              label Describe the asset
              el-input(v-model='updated_digital_asset.description' type='textarea' placeholder="Asset description")
              .form_error
            .form_item
              label Add tags
              el-select(
                v-model="updated_digital_asset.tag_list"
                multiple
                allow-create
                filterable
                placeholder="Select existing or type in new tags"
              )
                el-option(
                  v-for="tag in tag_list"
                  :key="tag"
                  :label="tag"
                  :value="tag"
                )
              .form_error
            .form_item
              label Select asset expiration date
              .d-flex.justify-content-between
                el-date-picker.m-r-1-0(
                  v-model="updated_digital_asset.expires_at"
                  placeholder="Expiration date"
                  type="date"
                  format="MMMM d, yyyy"
                )
              .form_error
            .form_item
              el-checkbox(
                v-model="updated_digital_asset.rep_only"
                :label="`Only visible to ${division_alias}`"
              )
              .form_error
        div(v-else)
          label Sorry! Nothing to edit

    span.dialog-footer.clearfix(
        slot="footer"
    )
      el-button.pull-left(
        v-if="is_bulk && digital_assets"
        type="text"
        @click="delete_assets()"
      ) Delete {{digital_assets.length}} Assets
      el-button.pull-left(
        v-if="!is_bulk && digital_assets"
        type="text"
        @click="delete_assets()"
      ) Delete Asset
      el-button(
        type="default"
        @click="close()"
      ) Close
      el-button.m-l-15(
        v-if="is_bulk && digital_assets"
        @click="edit_submit_bulk()"
        type="info"
        :disabled="has_errors"
      ) Save
      el-button.m-l-15(
        v-else-if="!is_bulk && digital_assets"
        @click="edit_submit()"
        type="info"
        :disabled="has_errors"
      ) Save
</template>

<script>
import _ from 'lodash';
import inflection from 'inflection';
import numeral from 'numeral';
import moment from 'moment-timezone';

import media_image from '../../molecules/media_image';
import external_video_card from '../../molecules/external_video_card';

const default_bulk_digital_asset = {
  expires_at: '',
  tag_list: [],
  rep_only: false,
};

export default {
  name: 'digital_asset_edit_modal',
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
    tag_list: {
      type: Array,
      default: () => [],
    },
  },

  filters: {
    date_format(date) {
      return moment.tz(date, moment.tz.guess()).format('MMMM D, YYYY');
    },

    inflect(text, number) {
      return inflection.inflect(text, number);
    },
  },

  data() {
    return {
      visible: false,
      updated_digital_asset: _.cloneDeep(this.digital_assets[0]),
      updated_bulk_digital_asset: Object.assign({}, default_bulk_digital_asset),
    };
  },

  watch: {
    is_visible(val) {
      this.visible = val;
    },
    digital_assets(assets) {
      this.updated_digital_asset = _.cloneDeep(assets[0]);
      this.updated_bulk_digital_asset = Object.assign({}, default_bulk_digital_asset);
    },
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit('digital_asset_edit_modal_closed');
    },

    edit_submit() {
      this.$emit('digital_asset_edit_modal_change', this.updated_digital_asset);
      this.close();
      // loading until completion or error message
    },

    edit_submit_bulk() {
      this.$emit('digital_asset_edit_modal_bulk_change', this.digital_assets, this.updated_bulk_digital_asset);
      this.close();
      // loading until completion or error message
    },

    delete_assets() {
      this.$emit('digital_asset_edit_modal_delete_assets', this.digital_assets);
      this.close();
    },

    format_size(bytes) {
      return numeral(bytes).format('0.00b');
    },

    view_asset_larger() {
      if (!this.updated_digital_asset.is_zip && !this.updated_digital_asset.is_video) {
        window.open(this.updated_digital_asset.file_url, '_blank');
      }
    },
  },

  computed: {
    is_bulk() {
      return this.digital_assets.length > 1;
    },

    division_alias() {
      if (this.updated_digital_asset.division_alias) {
        return inflection.pluralize(this.updated_digital_asset.division_alias);
      }
      return 'divisions';
    },

    modal_title() {
      if (this.is_bulk) {
        return `Edit ${this.digital_assets.length} Items`;
      }
      return this.updated_digital_asset && this.updated_digital_asset.name ? this.updated_digital_asset.name : 'Edit Asset';
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

  .pre_wrap {
    white-space: pre-wrap;
  }
</style>
