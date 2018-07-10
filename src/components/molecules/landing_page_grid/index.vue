<template lang="pug">
  .grid.widgets
    widget(
      v-for='(widget,index) in widgets'
      :key='index'
      :ref='`widget_${index}`'
      :style='widget.draft_content.styles'
      :widget_index='index'
      :widget='widget'
      :is_edit='true'
      :brand='brand'
      :campaign='campaign'
      :retailer='retailer'
      :locations='locations'
      @delete_widget='delete_widget'
      @edit_widget='edit_widget'
      @move_widget='move_widget'
      @add_widget='add_widget')
</template>

<script>
// @vue/component
import widget from '../widget';
import _ from 'lodash';
import widget_placeholder from './widget_placeholder.jpg';

export default {
  name: 'landing_page_grid',
  components: {
    widget,
  },
  props: {
    widgets: {
      type: Array,
      required: true,
      default: () => [],
    },
    brand: {
      type: Object,
      required: true,
    },
    campaign: {
      type: Object,
      required: false,
    },
    locations: {
      type: Array,
      required: false,
    },
    retailer: {
      type: Object,
      required: false,
    },
  },
  methods: {
    edit_widget(landing_page_widget) {
      this.$emit('widget_edit', landing_page_widget);
    },
    delete_widget(landing_page_widget) {
      this.$emit('widget_delete', landing_page_widget);
    },
    add_widget(data) {
      const { top, bottom } = data.element.getBoundingClientRect();
      const mid_point = ((top + bottom) / 2);
      let widget_index = data.element.getAttribute('widget_index');
      if (data.event.clientY >= mid_point) widget_index++;
      this.$emit('widget_add', { widget_id: event.dataTransfer.getData('widget_id'), widget_index });
    },
    move_widget(data) {
      const original_widget = this.widgets.splice(data.event.dataTransfer.getData('widget_index'), 1)[0];
      this.widgets.splice(data.element.getAttribute('widget_index'), 0, original_widget);
      this.$emit('widget_reorder', _.map(this.widgets, widget => widget.id));
    },
    create_drag_image() {
      if (!document.getElementById('drag-image')) {
        const image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
        image.id = 'drag-image';
        image.src = widget_placeholder;
        image.height = 0;
        document.body.appendChild(image);
      }
    },
  },
  mounted() {
    this.create_drag_image();
  },
};
</script>
<style lang="scss">
@import '../../../styles/variables_and_mixins';
  .empty-state {
    padding: 20px;
    background-color: #e5e5e5;
    color: get-color(gray);
    text-align: center;
    i {
      font-size: 5em;
      display: block;
      margin-bottom: 10px;
    }
  }
</style>

<style lang="scss" scoped>
  .drop-zone {
    height: 25px;
  }
  .grid {
    max-width: 768px;
    margin: 0 auto;
  }
</style>
