import _ from 'lodash'
const CROP_ATTRIBUTES = ['crop_origin_x', 'crop_origin_y', 'crop_width', 'crop_height']

export default class ImageCropping {
  constructor (crop_attributes, image_width, image_height, boundary_width, boundary_height, aspect_width, aspect_height_min, aspect_height_max) {
    this.image_width = image_width
    this.image_height = image_height
    this.boundary_width = boundary_width
    this.boundary_height = boundary_height
    this.aspect_width = aspect_width
    this.aspect_height_min = aspect_height_min
    this.aspect_height_max = aspect_height_max
    if (ImageCropping.is_valid_crop_attributes(crop_attributes)) {
      this.crop_origin_x = crop_attributes.crop_origin_x
      this.crop_origin_y = crop_attributes.crop_origin_y
      this.crop_width = crop_attributes.crop_width
      this.crop_height = crop_attributes.crop_height
    } else {
      this.crop_origin_x = this.default_crop_origin_x
      this.crop_origin_y = this.default_crop_origin_y
      this.crop_width = this.default_crop_width
      this.crop_height = this.default_crop_height
    }
  }

  static is_valid_crop_attributes(crop_attributes) {
    if (!crop_attributes) return false
    let valid = []
    CROP_ATTRIBUTES.forEach((attribute) => {
      const value = crop_attributes[attribute]
      if (_.isNumber(value) && value >= 0) {
        valid.push(attribute)
      }
    })
    return valid.length == CROP_ATTRIBUTES.length
  }

  get is_fixed_aspect_ratio () {
    return this.aspect_height_min === this.aspect_height_max
  }

  get aspect_height () {
    return this.aspect_width / this.boundary_aspect_ratio
  }

  get aspect_ratio_min () {
    return this.aspect_width / this.aspect_height_max
  }
  get aspect_ratio_max () {
    return this.aspect_width / this.aspect_height_min
  }

  get crop_aspect_ratio () {
    return this.crop_width / this.crop_height
  }

  get image_aspect_ratio () {
    return this.image_width / this.image_height
  }

  get clamp_image_aspect_ratio () {
    return _.clamp(this.image_aspect_ratio, this.aspect_ratio_min, this.aspect_ratio_max)
  }

  get boundary_aspect_ratio () {
    let aspect_ratio = this.boundary_width / this.boundary_height
    return aspect_ratio || this.crop_aspect_ratio || this.clamp_image_aspect_ratio
  }

  is_horizontal_overflow(origin_aspect_ratio, new_aspect_ratio) {
    return origin_aspect_ratio > new_aspect_ratio
  }

  get horizontal_overflow () {
    return this.is_horizontal_overflow(this.image_aspect_ratio, this.boundary_aspect_ratio)
  }

  get default_crop_origin_x () {
    return (this.image_width - this.default_crop_width) / 2
  }

  get default_crop_origin_y () {
    return (this.image_height - this.default_crop_height) / 2
  }

  get default_crop_width () {
    if (this.horizontal_overflow) {
      return this.image_height * this.boundary_aspect_ratio
    } else {
      return this.image_width
    }
  }

  get default_crop_height () {
    if (this.horizontal_overflow) {
      return this.image_height
    } else {
      return this.image_width / this.boundary_aspect_ratio
    }
  }

  get zoom_ratio_max () {
    if (this.horizontal_overflow) {
      return Math.floor(this.image_width * 100 / this.aspect_width)
    } else {
      return Math.floor(this.image_height * 100 / this.aspect_height)
    }
  }

  get zoom_ratio () {
    if (this.horizontal_overflow) {
      return this.image_height * 100 / this.crop_height
    } else {
      return this.image_width * 100 / this.crop_width
    }
  }

  set zoom_ratio (zoom_ratio) {
    zoom_ratio /= 100
    let expected_crop_height, expected_crop_width
    if (this.horizontal_overflow) {
      expected_crop_height = this.image_height / zoom_ratio
      expected_crop_width = this.boundary_aspect_ratio * expected_crop_height
    } else {
      expected_crop_width = this.image_width / zoom_ratio
      expected_crop_height = expected_crop_width / this.boundary_aspect_ratio
    }
    this.optimize_crop(expected_crop_width, expected_crop_height)
  }

  optimize_crop (crop_width, crop_height) {
    const width_difference = this.crop_width - crop_width
    const height_difference = this.crop_height - crop_height
    this.crop_width = crop_width
    this.crop_height = crop_height
    this.crop_origin_x = this.clamp_crop_origin_x(this.crop_origin_x + (width_difference / 2))
    this.crop_origin_y = this.clamp_crop_origin_y(this.crop_origin_y + (height_difference / 2))
  }

  update_boundary (boundary_width, boundary_height) {
    const new_aspect_ratio = boundary_width / boundary_height
    const updated_aspect_ratio = Math.floor(this.boundary_aspect_ratio * 1000) !== Math.floor(new_aspect_ratio * 1000)
    if (updated_aspect_ratio) {
      this.optimize_crop_for_aspect_ratio_change(new_aspect_ratio)
    }
    this.boundary_width = boundary_width
    this.boundary_height = boundary_height
  }

  optimize_crop_for_aspect_ratio_change (new_aspect_ratio) {
    let expected_crop_height = this.crop_width / new_aspect_ratio
    if (expected_crop_height > this.image_height) {
      expected_crop_height = this.image_height
    }
    let expected_crop_width = expected_crop_height * new_aspect_ratio
    if (expected_crop_width > this.image_width) {
      expected_crop_width = this.image_width
      expected_crop_height = expected_crop_width / new_aspect_ratio
    }
    this.optimize_crop(expected_crop_width, expected_crop_height)
  }

  get crop_boundary_ratio () {
    return this.boundary_width / this.crop_width
  }

  background_position (value) {
    return value * this.crop_boundary_ratio * -1
  }

  crop_origin (value) {
    return value * -1 / this.crop_boundary_ratio
  }

  get background_position_x () {
    return this.background_position(this.crop_origin_x)
  }

  get crop_origin_x_max () {
    return this.image_width - this.crop_width
  }

  get background_position_x_min () {
    return this.background_position(this.crop_origin_x_max)
  }

  get background_position_y () {
    return this.background_position(this.crop_origin_y)
  }

  get crop_origin_y_max () {
    return this.image_height - this.crop_height
  }

  get background_position_y_min () {
    return this.background_position(this.crop_origin_y_max)
  }

  get background_size_percentage () {
    return this.image_width * 100 / this.crop_width
  }

  clamp_background_position_x (background_position_x) {
    return _.clamp(background_position_x, this.background_position_x_min, 0)
  }

  clamp_background_position_y (background_position_y) {
    return _.clamp(background_position_y, this.background_position_y_min, 0)
  }

  clamp_crop_origin_x (crop_origin_x) {
    return _.clamp(crop_origin_x, 0, this.crop_origin_x_max)
  }

  clamp_crop_origin_y (crop_origin_y) {
    return _.clamp(crop_origin_y, 0, this.crop_origin_y_max)
  }

  update_origin_from_background_position (background_position_x, background_position_y) {
    this.crop_origin_x = this.crop_origin(background_position_x)
    this.crop_origin_y = this.crop_origin(background_position_y)
  }

  get crop_attributes () {
    return {
      crop_origin_x: Math.round(this.crop_origin_x),
      crop_origin_y: Math.round(this.crop_origin_y),
      crop_width: Math.round(this.crop_width),
      crop_height: Math.round(this.crop_height)
    }
  }
}
