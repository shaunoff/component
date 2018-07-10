<template lang="pug">
  transition(name="fade")
    .widget_header(v-if='show_header')
      .pull-left
        span
          i.pbxx-icon.pbxx-icon-arrows
      .pull-right
        span.edit_widget(@click='edit_widget()')
          i.pbxx-icon.pbxx-icon-edit
        span(@click='delete_widget()')
          i.pbxx-icon.pbxx-icon-delete
</template>

<script>

// @vue/component
export default {
  name: 'widget_header',
  props: {
    widget: {
      type: Object,
      required: false,
    },
    show_header: {
      type: Boolean,
      required: false,
    },
    is_edit: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    edit_widget() {
      this.$emit('edit_widget', this.widget);
    },
    delete_widget() {
      this.$confirm('Are you sure? This action cannot be undone.', 'Delete Widget', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
      }).then(() => {
        this.$emit('delete_widget', this.widget);
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .widget_header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    background: rgba(0,0,0,0.5);
    color: get-color(gray-lightest);
    font-size: 1.5em;
    z-index: 11;
    .pull-left {
      span {
        cursor: move;
      }
    }

    .pull-right {
      span {
        cursor: pointer;
        &.edit_widget {
          margin-right: 20px;
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    @include transition-property(opacity);
    @include transition-duration(0.5s);
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
