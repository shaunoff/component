<template lang="pug">
  el-card.folder-card(
    :class="{ 'selected': digital_asset_folder.is_selected }"
    @click.native="folder_navigation"
  )
    div.raw-icon-container
      i.pbxx-icon.pbxx-icon-folder
      | {{ digital_asset_folder.name || "Folder" }}
    i.pbxx-icon.pbxx-icon-hc-fw.pbxx-icon-hc-circle.selector(
      @click.stop="folder_selection"
      :class="{ 'pbxx-icon-check': digital_asset_folder.is_selected }"
    )
</template>

<script>

export default {
  name: 'digital_asset_folder',

  props: {
    digital_asset_folder: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    folder_navigation() {
      // Overhead component will determine based on select status
      // whether this is interpreted as a navigate or a select change
      this.$emit('folder_navigate', this.digital_asset_folder);
    },

    folder_selection() {
      this.$emit('folder_select', this.digital_asset_folder);
    },
  },
};
</script>

<style lang="scss">
  .folder-card .el-card__body {
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: get-color(gray-darkest);
  }

  .folder-card {
    .selector {
      display: none;
      &.pbxx-icon-check {
        display: block;
      }
    }
  }
  .has_selected_cards {
    .folder-card {
      .selector {
        display: block;
      }
    }
  }
  .hover_select {
    .folder-card {
      &:hover {
        .selector {
          display: block;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../styles/variables_and_mixins";

  .folder-card {
    cursor: pointer;
    margin-top: 30px;
    position: relative;
    width: 100%;
    padding: 2em;
    text-align: center;
    overflow: hidden;
    background-size: 10%;
    background-color: get-color(gray-lightest);
    border: 1px solid get-color(gray-light);
    box-shadow: none;
    border-radius: 0;

    &.no-background {
      background-image: none;
    }

    .pbxx-icon {
      position: absolute;
      top: 0.1em;
      font-size: 1.2em;
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.4);
      @include transition(background-color 0.5s);
      &.pbxx-icon-hc-circle {
        top: 0.25em;
        left: 0.25em;
      }
    }

    &.selected {
      .pbxx-icon.pbxx-icon-hc-circle {
        border: 1px solid get-color(green);
        background-color: get-color(green);
      }
    }

    .information {
      position: absolute;
      bottom: 0.1em;
      right: 0.25em;
      font-size: 1em;
      color: white;
      line-height: 170%;
      background-color: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.4);
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        border: 1px solid rgba(255, 255, 255, 1);
      }
    }

    .raw-icon-container {
      text-align: left;
      margin: 1.2em 1.4em 0 1.4em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      i {
        position: relative;
        color: get-color(gray);
        background-color: transparent;
        border: 0;
        font-size: 1.4em;
        vertical-align: bottom;
        padding-right: .7em;
      }
    }
  }
</style>
