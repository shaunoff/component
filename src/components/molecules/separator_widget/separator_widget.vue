<template lang="pug">
  .separator_widget
    .gap(
      :style="{height: spacing +'px'}"
      )
    .hr(
      v-if="type === 'normal'"
      :style="normal_style"
      )
    .hr(
      v-if="type === 'gradient'"
      class="gradient"
      :style="gradient_style"
      )
    .hr(
      v-if="type === 'dotted'"
      class="dotted"
      :style="dotted_style"
      )
    .gap(
      :style="{height: spacing +'px'}"
      )
</template>

<script>

  // @vue/component
  export default {
    name: 'separator_widget',
    props: {
      widget: {
        type: Object,
        required: true
      }
    },
    computed: {
      type() {
        return this.widget.draft_content.type ? this.widget.draft_content.type : "normal"
      },
      normal_style() {
        return {
          borderTop: `${this.thickness}px solid ${this.color}`
        }
      },
      gradient_style() {
        return {
          height: `${this.thickness}px`,
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0), ${this.color}, rgba(0, 0, 0, 0))`
        }
      },
      dotted_style() {
        return {
          borderTop: `${this.thickness}px dotted ${this.color}`
        }
      },
      color() {
        return this.widget.draft_content.color ? this.widget.draft_content.color : "gray"
      },
      thickness() {
        return this.widget.draft_content.thickness ? this.widget.draft_content.thickness : 2
      },
      spacing() {
        return this.widget.draft_content.spacing ? this.widget.draft_content.spacing : 5
      }
    },
    methods: {
      edit_widget(landing_page_widget) {
        this.$emit('edit_widget', landing_page_widget)
      },
      delete_widget(landing_page_widget) {
        this.$emit('delete_widget', landing_page_widget)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .separator_widget {
    min-height: 44px;
    width: 100%;
    overflow: hidden;
  }
  .solid {
    border-top: 4px solid #8c8b8b;
  }
  .gradient {
    border: 0;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #BDBDBD, rgba(0, 0, 0, 0));
  }
  .dotted {
    border-bottom: none;
    background-color: transparent;
  }
  .gap {
    height: 22px;
  }

</style>
