<template lang="pug">
  .demo.m-t-1-0
    component-doc(:component="image_cropping")
    .col-tn-6.m-b-2-0
      image_cropping(
        :image_url="image_url",
        :responsive_image_url="image_url",
        :aspect_width="aspect_width",
        :aspect_height_min="aspect_height_min",
        :aspect_height_max="aspect_height_max",
        :enable_crop="true"
      )
    .col-tn-5.m-b-2-0
      image_cropping(
        :image_url="image_url",
        :responsive_image_url="image_url",
        :aspect_width="aspect_width",
        :aspect_height_min="aspect_height_min",
        :aspect_height_max="aspect_height_max",
        :enable_crop="true"
      )
    .col-tn-4.m-b-2-0
      image_cropping(
        :image_url="transparent_image_url",
        :responsive_image_url="transparent_image_url",
        :aspect_width="aspect_width",
        :aspect_height_min="aspect_height_min",
        :aspect_height_max="aspect_height_max",
        :enable_crop="true"
      )
</template>

<script>
import image_cropping from './index.vue'
// @vue/component
export default {
  name: 'image_cropping_demo',
  components: {
    image_cropping
  },
  data() {
    return {
      image_cropping,
      transparent_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Blender3D_Lisc_lipy-Transparent.png/200px-Blender3D_Lisc_lipy-Transparent.png',
      image_url: 'http://www.billboard.com/files/styles/900_wide/public/media/taylor-swift-press-photo-2016-billboard-1548.jpg',
      aspect_width: 200,
      aspect_height_max: 600,
      aspect_height_min: 200,
      crop_attributes: {
        crop_origin_x: null,
        crop_origin_y: null,
        crop_width: null,
        crop_height: null
      }
    }
  }
}
</script>
