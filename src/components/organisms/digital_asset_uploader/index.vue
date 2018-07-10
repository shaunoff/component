<template lang="pug">
  .digital-asset-uploader(:class="{ empty: empty_uploader }")
    el-upload(
      :action="action_endpoint"
      :before-upload="create_digital_asset"
      :on-progress="on_progress"
      :on-success="on_upload_success"
      :on-error="on_upload_error"
      :data="cloudinary_params"
      drag
      :show-file-list="false"
      :multiple="multiple"
      :accept="accept"
    )
      img(v-if="replace && image_url", :src="image_url")
      i.pbxx-icon.pbxx-icon-cloud-upload.pbxx-icon-hc-5x(v-if="!replace || !image_url")
      .el-upload__text
        i.pbxx-icon.pbxx-icon-cloud-upload
        | &nbsp;Drop files here, or <em>click to upload</em>
      slot(
        name="gallery"
      )
    .upload-video.m-t-2-0.col-tn-6.col-tn-offset-3
      .form_group
        .form_item(:class="{ 'is-error': errors.has('external_video_url') }")
          el-input(
            v-if="show_input"
            suffix-icon='search'
            v-validate="'url'"
            v-model='external_video_url'
            name='external_video_url'
            @keyup.enter.native='add_external_video'
            placeholder="Enter Video URL"
          )
            el-button(slot="append", @click="add_external_video") Add
          .form_error
            span {{ errors.first('external_video_url') }}
</template>

<script>
  import _ from 'lodash'
  import upload from '../../../helpers/upload'
  import embed from '../../../helpers/embed'
  import store from '@promoboxx/pbxxjsdata'
  // TODO placeholder until auth is configured.  Replace with your CP auth_header token
  store.configure({ basePath: 'http://api.local.promoboxx.com/v2/', headers: { 'access-token': "yhZpAJSCzuMR7L7W8FMkvg", 'token-type': "", 'client': "Av_qx5jSAWUUB274FvwQKw", 'expiry': "1530642431", 'uid': "brian@promoboxx.com" } })

  export default {
    name: 'digital_asset_uploader',

    props: {
      associable_endpoint: {
        type: String,
        required: true
      },
      multiple: {
        type: Boolean,
        default: true
      },
      accept: {
        type: String,
        default: 'image/*'
      },
      action_endpoint: {
        type: String,
        default: ''
      },
      valid_types: {
        type: Array,
        default: () => ['image', 'video', 'pdf', 'zip', 'x-zip-compressed']
      },
      valid_size_mb: {
        type: Number,
        default: 100
      },
      digital_asset_params: {
        type: Object,
        default: () => {}
      },
      show_input: {
        type: Boolean,
        default: true
      },
      image_url: {
        type: String,
        default: ''
      },
      replace: {
        type: Boolean,
        default: false
      },
      empty_uploader: {
        type: Boolean,
        default: true
      }
    },

    $_veeValidate: {
      validator: 'new' // give me a new validator each time.
    },

    data() {
      return {
        cloudinary_params: {},
        external_video_url: null
      }
    },

    computed: {
      external_video_source() {
        if (this.external_video_url) {
          return embed.determine_video_source(this.external_video_url)
        }
        return ''
      }
    },

    methods: {
      create_digital_asset(file) {
        if (_.intersection(this.valid_types, file.type.split('/')).length === 0) {
          this.$notify.error({
            title: 'Error',
            message: `Only ${this.valid_types.join(', ')} files are supported`,
            duration: 10000
          })
          return false
        }
        if (!this.validate_before_upload(file, this.valid_size_mb)) {
          this.$notify.error({
            title: 'Error',
            message: `${this.truncate_filename(file.name, 30, '...')} failed to upload (exceeds ${this.valid_size_mb}MB max)`,
            duration: 10000
          })
          return false
        }
        return upload.create_digital_asset(file, this.digital_asset_params, this.associable_endpoint, 220, store)
          .then((digital_asset) => {
            const created_digital_asset = digital_asset
            created_digital_asset.upload_percentage = 0
            created_digital_asset.is_selected = true

            this.$emit('digital_asset_created', created_digital_asset)
            this.cloudinary_params = created_digital_asset.signature
          })
          .catch((e) => {
            console.log(e)
          })
      },

      validate_before_upload(file, valid_size_mb) {
        return file.size / 1024 / 1024 < valid_size_mb
      },

      add_external_video() {
        if (this.external_video_url && !this.errors.has('external_video_url') && this.external_video_source) {
          return upload.add_external_video(this.external_video_url, this.external_video_source, this.associable_endpoint)
          .then((digital_asset) => {
            const created_digital_asset = digital_asset
            created_digital_asset.is_selected = true
            this.$emit('digital_asset_created', created_digital_asset)
            this.external_video_url = null
          }).catch((e) => {
            this.$notify({
              title: 'Error',
              message: e.message
            })
          })
        }

        // TODO: Harden input validation to prevent invalid urls
        this.$notify({
          title: 'Error',
          message: 'Invalid video url'
        })
        return false
      },

      on_progress(event, file, file_list) {
        this.$emit('upload_progress', event, file, file_list)
      },

      on_upload_success(event, file, file_list) {
        this.$emit('upload_success', event, file, file_list)
      },

      truncate_filename(filename, length, omission) {
        return _.truncate(filename, {
          length,
          omission
        })
      },

      on_upload_error(event, file) {
        let err_msg = (typeof event === 'undefined') ? null : event.message.toString()
        if (err_msg !== null) {
          err_msg = _.replace(_.replace(err_msg, /\}/g, ''), /\"/g, '') /* remove quotations */
          err_msg = err_msg.substring(err_msg.indexOf('message') + 8, err_msg.length) /* extract error message */
        }

        this.$notify.error({
          title: 'Error',
          message: `${this.truncate_filename(file.name, 30, '...')} failed to upload (${err_msg})`,
          duration: 10000
        })

        this.$emit('upload_error', event, file)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .digital-asset-uploader {
    overflow: hidden;
    .pbxx-icon-cloud-upload {
      display: none;
    }
    .pbxx-icon-hc-5x {
      display: block;
    }
    .el-upload__text {
      margin-bottom: 2em;
    }
    &.empty {
      .el-upload__text {
        margin-bottom: 0;
      }
      .pbxx-icon-cloud-upload {
        display: inline-block;
      }
      .pbxx-icon-hc-5x {
        display: none;
      }
    }
    .upload-video {
      .el-input-group__append {
        button[type='button'].el-button.el-button--default {
          margin: -20px -20px -13px -20px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .digital-asset-uploader {
    .el-upload.el-upload--text {
      border: dashed 2px #d1dbe5;

      >.el-upload-dragger {
        padding: 30px;
        width: 100%;
        height: auto;
      }
    }

    .upload-video input[type='text'].el-input__inner {
      min-height: 40px;
    }
  }
</style>
