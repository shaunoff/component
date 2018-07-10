<template lang="pug">
  .terms_widget
    .terms_widget-default(v-if="is_empty_terms")
      i.pbxx-icon.pbxx-icon-format-align-left
      p.text_widget-default-text
        | Add Terms Here
    .html(
      v-else
      v-html="widget.draft_content.html"
      )
</template>

<script>

  // @vue/component
  export default {
    name: 'terms_widget',
    props: {
      widget: {
        type: Object,
        required: true
      }
    },
    computed: {
      is_empty_terms() {
        const { html } = this.widget.draft_content
        return html === '<p style="font-size: 10px;"><em>Add Terms Here</em></p>'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .terms_widget {
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
