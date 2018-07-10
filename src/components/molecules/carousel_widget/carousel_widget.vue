<template lang="pug">
  .carousel_widget
    el-carousel(:interval="3000" arrow="always")
      el-carousel-item
        img(src="https://res.cloudinary.com/pbxx-dev/image/upload/v1525203810/gb1xpswafokizsvajhhc.jpg")
      el-carousel-item
        img(src="https://res.cloudinary.com/pbxx-dev/image/upload/v1525203810/gb1xpswafokizsvajhhc.jpg")
</template>

<script>

  // @vue/component
  export default {
    name: 'carousel_widget',
    components: {

    },
    props: {
      widget: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carousel_widget {
    .el-carousel__item {
      background-color: rgba(0,0,0,0.95);
      img {
        max-width:100%;
        height: auto;
        display: block;
      }
    }
  }
</style>
