<template lang="pug">
  .hero_widget
    .image-background
      h3.m-b-1-0 This is some reall great text that is a headline.
      el-button(type="success") Send it
</template>

<script>

  // @vue/component
  export default {
    name: 'hero_widget',
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
  .hero_widget {
    .image-background {
      min-height:200px;
      padding:20px;
      background: url("https://res.cloudinary.com/pbxx-dev/image/upload/v1525203810/gb1xpswafokizsvajhhc.jpg") center no-repeat;
      text-align: center;
      color: #fff;
    }
  }
</style>
