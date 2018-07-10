<template lang="pug">
  .header_widget
    //- slot
    img.header_widget-logo(
      :src="image_source"
    )
    p.header_widget-retailer
      | {{retailer_name}}
</template>

<script>

// @vue/component
export default {
  name: 'header_widget',
  components: {

  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    image_source: {
      type: String,
      required: false,
      default: 'https://www.clasohlson.com/medias/sys_master/9005160202270.jpg',
    },
    retailer_name: {
      type: String,
      required: false,
      default: 'Promoboxx Vinyl Demo',
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .header_widget {
    color: get-color(gray-lightest);
    padding: 15px;
    background-color: get-color(gray-darkest);
    white-space: nowrap;
    &-logo {
      display: inline-block;
      margin-right: 15px;
      max-width: 60px;
      border: 2px solid #fff;
      @include box-shadow(0 1px 2px get-color(gray-darkest));
      @include border-radius(3px);
    }
    &-retailer {
      display: inline-block;
      max-width: calc(100% - 75px); // 100% - (logo_width + logo_marginRight)
      vertical-align: middle;
      white-space: normal;
      margin: 0;
      cursor: default;
    }
    &:hover {
      .widget_header {
        opacity: 1;
      }
    }
  }
</style>
