<template lang="pug">
 .widget(
   :draggable='is_draggable'
   @mouseover='hover_active = true'
   @mouseleave='hover_active = false'
   @dragenter='drag_enter'
   @dragover='drag_over'
   @dragleave='drag_leave'
   @dragstart='drag_start'
   @drop='drop'
   :class='{ "widget-overlay": show_header, "drop-zone-bottom": indicate_drop_bottom }')

   widget_header(
     :show_header='show_header'
     :widget='widget'
     @delete_widget='delete_widget'
     @edit_widget='edit_widget')

   component(
     :is='`${widget.widget.name}_widget`'
     :widget='widget'
     :brand='brand'
     :campaign='campaign'
     :retailer='retailer'
     :locations='locations')
</template>

<script>
import _ from 'lodash';

// available widgets
import widget_header from '../widget_header';
import header_widget from '../header_widget';
import footer_widget from '../footer_widget';
import text_widget from '../text_widget';
import video_widget from '../video_widget';
import image_widget from '../image_widget';
import image_text_widget from '../image_text_widget';
import carousel_widget from '../carousel_widget';
import terms_widget from '../terms_widget';
import hero_widget from '../hero_widget';
import html_widget from '../html_widget';
import separator_widget from '../separator_widget';
// @vue/component
export default {
  name: 'widget',
  components: {
    widget_header,
    header_widget,
    footer_widget,
    text_widget,
    video_widget,
    image_widget,
    image_text_widget,
    carousel_widget,
    hero_widget,
    terms_widget,
    html_widget,
    separator_widget,
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    brand: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    campaign: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    retailer: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    locations: {
      type: Array,
      required: false,
      default: () => [],
    },
    share_setting: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    column_count: {
      type: Number,
      required: false,
      default: 12,
    },
    clear: {
      type: Boolean,
      required: false,
      default: false,
    },
    background_color: {
      type: String,
      required: false,
      default: '',
    },
    font_style: {
      type: String,
      required: false,
      default: '',
    },
    font_size: {
      type: String,
      required: false,
      default: '',
    },
    is_edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      indicate_drop_top: false,
      indicate_drop_bottom: false,
      hover_active: false,
    };
  },
  computed: {
    is_draggable() {
      return this.widget.widget.name !== 'header' && this.widget.widget.name !== 'footer';
    },
    show_header() {
      return this.is_draggable && this.hover_active;
    },
  },
  methods: {
    edit_widget(landing_page_widget) {
      this.$emit('edit_widget', landing_page_widget);
    },
    delete_widget(landing_page_widget) {
      this.$emit('delete_widget', landing_page_widget);
    },
    drag_over(event) {
      // if widget is draggable it also is an acceptable drop zone
      if (this.is_draggable) event.preventDefault();
    },
    drag_start(event) {
      event.dataTransfer.setData('widget_index', this.$el.getAttribute('widget_index'));
      document.getElementById('drag-image').height = 115;
      event.dataTransfer.setDragImage(document.getElementById('drag-image'), 25, 25);
    },
    drag_leave(event) {
      this.indicate_drop_top = false;
      this.indicate_drop_bottom = false;
    },
    drag_enter(event) {
      event.preventDefault();
      this.indicate_drop_top = true;
      this.indicate_drop_bottom = true;
    },
    drop(event) {
      document.getElementById('drag-image').height = 0;
      if (event.dataTransfer.getData('widget_index') && event.dataTransfer.getData('widget_index') >= 0) {
        this.$emit('move_widget', { event, element: this.$el });
      } else if (event.dataTransfer.getData('widget_id') && event.dataTransfer.getData('widget_id') >= 1) {
        this.$emit('add_widget', { event, element: this.$el });
      }
      this.indicate_drop_top = false;
      this.indicate_drop_bottom = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .widget {
    position: relative;
    z-index: 10;
    &-overlay {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: transparent;
        @include transition-property(background);
        @include transition-duration(0.5s);
        z-index: 11;
      }
      &:hover {
        &:before {
          background: rgba(0,0,0,0.2);
          pointer-events: none;
        }
      }
    }
    &.drop-zone-bottom::after {
      content: 'Drop widget here!';
      display: table;
      clear: both;
      width: 100%;
      color: #969696;
      padding: 50px;
      text-align: center;
      margin: 10px 0;
      border: 3px #F4F4F4 dashed;
   }

  }
</style>
