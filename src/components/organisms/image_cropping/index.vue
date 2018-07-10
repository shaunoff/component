<template lang="pug">
  .image_cropping(:class="{active: active, fixed: is_fixed_aspect_ratio, disabled: disabled}")
    .boundary(:style="{paddingBottom: aspect_ratio_padding}")
      .frame(:style="frame_style")
        .preview(v-if="image_dimension_promise", :style="preview_style")
        img.cld-responsive(v-else, :data-src="responsive_image_url")
    .control(v-show="!image_dimension_promise || image_meet_aspect_minimum")
      .icon_crop(@click="toggle_active") {{ active ? 'save' : 'crop' }}
      .slider
        el-slider(
          v-model="zoom_ratio"
          :min="zoom_ratio_min"
          :max="zoom_ratio_max"
          :format-tooltip="zoom_tooltip_format"
        )
      .resize_wrapper
        el-tooltip(ref="tooltip", :content="aspect_ratio_tooltip_format", placement="right", effect="dark")
          .icon_resize
            i.pbxx-icon.pbxx-icon-verticalresize
</template>

<script>
  import cloudinary from '../../../helpers/cloudinary'
  import ImageCropping from './image_cropping'
  import Hammerjs from 'hammerjs'
  import asset_helper from '../../../helpers/assets_helper'
  import _ from 'lodash'

  // @vue/component
  export default {
    name: 'image_cropping',
    props: {
      image_url: String,
      responsive_image_url: String,
      aspect_width: {
        type: Number
      },
      aspect_height_min: {
        type: Number
      },
      aspect_height_max: {
        type: Number
      },
      crop_attributes: {
        type: Object
      },
      enable_crop: {
        type: Boolean
      }
    },
    data() {
      return {
        active: false,
        image_loaded: false,
        image_cropping: null,
        zoom_ratio: 0,
        image_width: 0,
        image_height: 0,
        boundary_width: 0,
        boundary_height: 0,
        background_position_x: 0,
        background_position_y: 0,
        background_size_percentage: 100,
        zoom_ratio_min: 100,
        zoom_ratio_max: 200,
        preview_pan_handler: null,
        boundary_pan_handler: null,
        image_dimension_promise: null
      }
    },
    mounted() {
      cloudinary.responsive()
    },
    computed: {
      aspect_ratio_tooltip_format() {
        return `aspect_ratio: ${Math.round(this.aspect_ratio * 100) / 100}:1`
      },
      disabled() {
        return !this.enable_crop
      },
      image_meet_aspect_minimum() {
        return this.image_width >= this.aspect_width && this.image_height >= this.aspect_height_min
      },
      is_fixed_aspect_ratio() {
        return this.aspect_height_min === this.aspect_height_max
      },
      aspect_ratio_min() {
        return this.aspect_width / this.aspect_height_max
      },
      aspect_ratio_max() {
        return this.aspect_width / this.aspect_height_min
      },
      boundary_height_min() {
        return this.boundary_width / this.aspect_ratio_min
      },
      boundary_height_max() {
        return this.boundary_width / this.aspect_ratio_max
      },
      image_aspect_ratio() {
        return this.image_width / this.image_height
      },
      clamp_image_aspect_ratio() {
        return _.clamp(this.image_aspect_ratio, this.aspect_ratio_min, this.aspect_ratio_max)
      },
      aspect_ratio() {
        if (this.is_fixed_aspect_ratio) {
          return this.aspect_width / this.aspect_height_max
        } else if (this.image_cropping) {
            return this.image_cropping.boundary_aspect_ratio
          }
            if (ImageCropping.is_valid_crop_attributes(this.crop_attributes)) {
              return this.crop_attributes.crop_width / this.crop_attributes.crop_height
            }
              return this.clamp_image_aspect_ratio
      },
      aspect_ratio_padding() {
        if (!this.image_dimension_promise) return 0
        return `${(1 / this.aspect_ratio) * 100}%`
      },
      preview_style() {
        if (this.image_loaded) {
          return {
            backgroundImage: `url(${this.image_url})`,
            backgroundPosition: `${this.background_position_x}px ${this.background_position_y}px`,
            backgroundSize: `${this.background_size_percentage}%`
          }
        }
          return {
            backgroundImage: 'none',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }
      },
      frame_style() {
        return {
          position: this.image_dimension_promise ? 'absolute' : 'relative',
          backgroundImage: `url(${assets_helper.image_url('checker.svg')})`,
          backgroundSize: '30px'
        }
      },
      boundary() {
        return this.$el.getElementsByClassName('boundary')[0]
      },
      preview() {
        return this.$el.getElementsByClassName('preview')[0]
      },
      resize() {
        return this.$el.getElementsByClassName('pbxx-icon-verticalresize')[0]
      }
    },
    watch: {
      zoom_ratio() {
        this.update_zoom_ratio()
      }
    },
    methods: {
      zoom_tooltip_format(value) {
        return `zoom: ${value}%`
      },
      update_zoom_ratio: _.debounce(
        function () {
          if (this.image_cropping) {
            this.image_cropping.zoom_ratio = this.zoom_ratio
            this.set_preview()
            this.update_crop_attributes()
          }
        },
        100
      ),
      update_crop_attributes: _.debounce(
        function () {
          this.$parent.$emit('update_crop_attributes', this.image_cropping.crop_attributes)
        },
        500
      ),
      create_image_dimension_promise() {
        return new Promise((resolve, reject) => {
          const image = new Image()

          image.onload = () => {
            resolve(image)
          }

          image.onerror = (e) => {
            reject(e)
          }

          image.src = this.image_url
        })
      },
      set_boundary() {
        this.boundary_width = this.boundary.clientWidth
        this.boundary_height = this.boundary.clientHeight
      },
      set_image(image) {
        this.image_loaded = true
        this.image_width = image.width
        this.image_height = image.height
      },
      initialize_image_cropping() {
        this.image_dimension_promise = this.create_image_dimension_promise()
        this.image_dimension_promise.then((image) => {
          this.initialize_crop(image)
        }).catch((e) => {
          console.log('image_cropping.image_dimension_promise', e)
        })
      },
      initialize_crop(image) {
        this.set_image(image)
        if (this.image_meet_aspect_minimum) {
          this.$nextTick(() => {
            this.set_boundary()
            this.set_crop_attributes()
          })
        }
      },
      initialize_pan() {
        this.initialize_preview_pan()
        this.initialize_boundary_pan()
      },
      disable_pan() {
        this.preview_pan_handler.off('panstart panmove panend')
        this.boundary_pan_handler.off('panstart panmove panend')
      },
      initialize_preview_pan() {
        this.preview_pan_handler = new Hammerjs.Manager(this.preview)
        const pan = new Hammerjs.Pan()
        this.preview_pan_handler.add(pan)
        this.preview_pan_handler.on('panstart', (event) => {
          this.handle_preview_panstart(event)
        })
        this.preview_pan_handler.on('panmove', (event) => {
          this.handle_preview_panmove(event)
        })
        this.preview_pan_handler.on('panend', (event) => {
          this.handle_preview_panend(event)
        })
      },
      handle_preview_panstart() {
        this.initial_background_position_x = this.background_position_x
        this.initial_background_position_y = this.background_position_y
      },
      handle_preview_panmove(event) {
        this.background_position_x = this.image_cropping.clamp_background_position_x(this.initial_background_position_x + event.deltaX)
        this.background_position_y = this.image_cropping.clamp_background_position_y(this.initial_background_position_y + event.deltaY)
      },
      handle_preview_panend() {
        delete this.initial_background_position_x
        delete this.initial_background_position_y
        this.image_cropping.update_origin_from_background_position(this.background_position_x, this.background_position_y)
        this.update_crop_attributes()
      },
      initialize_boundary_pan() {
        this.boundary_pan_handler = new Hammerjs.Manager(this.resize)
        const pan = new Hammerjs.Pan()
        this.boundary_pan_handler.add(pan)
        this.boundary_pan_handler.on('panstart', (event) => {
          this.handle_boundary_panstart(event)
        })
        this.boundary_pan_handler.on('panmove', (event) => {
          this.handle_boundary_panmove(event)
        })
        this.boundary_pan_handler.on('panend', (event) => {
          this.handle_boundary_panend(event)
        })
      },
      handle_boundary_panstart() {
        this.initial_boundary_height = this.boundary_height
      },
      handle_boundary_panmove(event) {
        this.update_boundary_height(this.initial_boundary_height + event.deltaY)
        this.$nextTick(() => {
          this.$refs.tooltip && this.$refs.tooltip.updatePopper()
        })
      },
      handle_boundary_panend() {
        delete this.initial_boundary_height
      },
      set_crop_attributes() {
        if (!this.crop_attributes || !(this.crop_attributes instanceof ImageCropping)) {
          this.image_cropping = new ImageCropping(this.crop_attributes, this.image_width, this.image_height, this.boundary_width, this.boundary_height, this.aspect_width, this.aspect_height_min, this.aspect_height_max)
        }
        this.set_preview()
      },
      set_preview() {
        this.zoom_ratio = Math.round(this.image_cropping.zoom_ratio)
        this.zoom_ratio_max = this.image_cropping.zoom_ratio_max
        this.background_position_x = this.image_cropping.background_position_x
        this.background_position_y = this.image_cropping.background_position_y
        this.background_size_percentage = this.image_cropping.background_size_percentage
      },
      clamp_boundary_height(boundary_height) {
        const boundary_bounds = [this.boundary_height_min, this.boundary_height_max].sort((a, b) => (a > b ? 1 : -1))
        return _.clamp(boundary_height, ...boundary_bounds)
      },
      update_boundary_height(boundary_height) {
        this.boundary_height = this.clamp_boundary_height(boundary_height)
        this.image_cropping.update_boundary(this.boundary_width, this.boundary_height)
        this.set_preview()
        this.update_crop_attributes()
      },
      resize_boundary() {
        if (this.active) {
          this.set_boundary()
          this.image_dimension_promise.then(() => {
            this.image_cropping.update_boundary(this.boundary_width, this.boundary_height)
            this.set_preview()
          }).catch((error) => {
            console.log('image_cropping.resize_boundary', error)
          })
        }
      },
      toggle_active() {
        this.active = !this.active

        if (this.active) {
          if (!this.image_dimension_promise) {
            this.initialize_image_cropping()
          }
          this.$nextTick(() => {
            this.initialize_pan()
          })
        } else {
          this.disable_pan()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../styles/variables_and_mixins";
  $font_size: 20px;
  $element_active_color: #20a0ff;

  .image_cropping {
    position: relative;
    width: 100%;
    .boundary {
      position: relative;
      .frame {
        overflow: hidden;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .preview {
          height: 100%;
          width: 100%;
          background-repeat: no-repeat;
        }
        img.cld-responsive {
          width: 100%;
        }
      }
    }
    .control {
      padding: 0 0.5em;
      bottom: 0;
      position: absolute;
      width: 100%;
      padding-bottom: 0;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      @include transition(padding-bottom 0.5s);

      .slider {
        padding: 0 1em;
        overflow: hidden;
        display: none;
      }
      .icon_crop {
        cursor: pointer;
        font-size: 12px;
        text-align: center;
        float: right;
        margin-right: 10px;
        line-height: 20px;
        @include border-radius(5px);
        padding: 0 0.5em;
        border: 1px solid white;
        margin: 8px 0;
        &:hover {
          border-color: get-color(brand-info);
          background-color: get-color(brand-info);
        }
      }
      .resize_wrapper {
        display: none;
        position: absolute;
        font-size: $font_size;
        height: $font_size;
        width: 100%;
        bottom: -10px;
        text-align: center;
        .icon_resize {
          margin: 0 auto;
          width: $font_size;
          line-height: $font_size;
          cursor: ns-resize;
          .pbxx-icon {
            @include user-select(none);
            line-height: $font_size;
          }
          &:hover {
            .pbxx-icon {
              color: $element_active_color
            }
          }
        }
      }
      .pbxx-icon {
        color: white;
        line-height: 36px;
      }
    }
    &.active {
      .boundary {
        .frame {
          cursor: move;
        }
      }
      .control {
        padding-bottom: $font-size / 2;
        .icon_crop {
          .pbxx-icon {
            color: $element_active_color;
          }
        }
        .icon_small, .icon_large, .slider, .resize_wrapper {
          display: block;
        }
      }
      &.fixed {
        .control {
          padding-bottom: 0;
          .resize_wrapper {
            display: none;
          }
        }
      }
    }
    &.disabled {
      .control {
        display: none;
      }
    }
  }
</style>
