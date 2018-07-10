<template lang="pug">
  .text_widget
    .html(
      v-if="widget.draft_content.html"
      v-html="widget.draft_content.html"
      )
    .text_widget-default(v-else)
      i.pbxx-icon.pbxx-icon-format-align-left
      p.text_widget-default-text
        | Add your text
</template>

<script>

// @vue/component
export default {
  name: 'text_widget',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  methods: {
    edit_widget(landing_page_widget) {
      this.$emit('edit_widget', landing_page_widget);
    },
    delete_widget(landing_page_widget) {
      this.$emit('delete_widget', landing_page_widget);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .text_widget {
    &-default {
      padding: 15px;
      text-align: center;
      color: get-color(gray);
      background: get-color(gray-lightest);
      &-text {
        margin: 5px 0 0;
      }
      i {
        font-size: 60px;
      }
    }
  }
  .html {
    padding: 15px;
  }
</style>
