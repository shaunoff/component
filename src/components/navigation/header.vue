<template lang="pug">
  header.row
    el-menu.col-lg-12(:default-active="activeIndex" mode="horizontal", :router="true")
      el-menu-item(index="/")
        i.pbxx-icon.pbxx-icon-promoboxx.pbxx-icon-hc-2x.pbxx-icon-hc-fw
      el-submenu(index="2")
        template(slot="title")
          | Atoms
        el-menu-item(index="/atoms/fonts")
          | Fonts
        el-menu-item(index="/atoms/glyphs")
          | Glyphs
        el-menu-item(index="/atoms/glyphs_modifier")
          | Glyphs Modifier
        el-menu-item(index="/atoms/margin")
          | Margin
        el-menu-item(index="/atoms/responsive_typography")
          | Responsive Typography
        el-menu-item(index="/atoms/swatches")
          | Swatches
        el-menu-item(index="/atoms/swatches_modifier")
          | Swatches Modifier
      el-submenu(index="3")
        template(slot="title")
          | Molecules
        el-menu-item(index="/molecules/breadcrumbs")
          | Breadcrumbs
        el-menu-item(index="/molecules/button")
          | Buttons
        el-menu-item(index="/molecules/cascader")
          | Cascader
        el-menu-item(index="/molecules/checkbox")
          | Checkbox
        el-menu-item(index="/molecules/color_picker")
          | Color Picker
        el-menu-item(index="/molecules/facebook_embed_file")
          | External Facebook video embed
        el-menu-item(index="/molecules/youtube_embed_file")
          | External Youtube video embed
        el-menu-item(index="/molecules/vimeo_embed_file")
          | External Vimeo video embed
        el-menu-item(index="/molecules/filters")
          | Filters
        el-menu-item(index="/molecules/form")
          | Form
        el-menu-item(index="/molecules/input")
          | Input
        el-menu-item(index="/molecules/nav_tabs")
          | Nav Tabs
        el-menu-item(index="/molecules/notification")
          | Notification
        el-menu-item(index="/molecules/pagination")
          | Pagination
        el-menu-item(index="/molecules/radio")
          | Radio
        el-menu-item(index="/molecules/select")
          | Select
        el-menu-item(index="/molecules/switch")
          | Switch
        el-menu-item(index="/molecules/slider")
          | Slider
        el-menu-item(index="/molecules/table")
          | Table
        el-menu-item(index="/molecules/pagination")
          | Pagination
        el-menu-item(index="/molecules/facebook_embed_file")
          | External Facebook video embed
        el-menu-item(index="/molecules/youtube_embed_file")
          | External Youtube video embed
        el-menu-item(index="/molecules/vimeo_embed_file")
          | External Vimeo video embed
        el-menu-item(index="/molecules/variable_renderer")
          | Variable Renderer
        el-menu-item(index="/molecules/landing_page_grid")
          | Landing Page Grid
        el-menu-item(index="/molecules/widget_drag")
          | Widget Drag
        el-menu-item(index="/molecules/tags")
            | Tags
      el-submenu(index="4")
        template(slot="title")
          | Organisms
        el-menu-item(index="/organisms/campaign_card")
          | Campaign Card
        el-menu-item(index="/organisms/checkbox_group")
          | Checkbox Group
        el-menu-item(index="/organisms/content_discovery_card")
          | Content Discovery Card
        el-menu-item(index="/organisms/date_picker")
          | Date Picker
        el-menu-item(index="/organisms/folder_modal")
          | Dialog/Modal
        el-menu-item(index="/organisms/digital_asset_uploader")
          | Digital asset uploader
        el-menu-item(index="/organisms/digital_asset_gallery")
          | Digital asset gallery
        el-menu-item(index="/organisms/digital_asset_edit_modal")
          | Digital asset edit modal
        el-menu-item(index="/organisms/digital_asset_view_modal")
          | Digital asset view modal
        el-menu-item(index="/organisms/engine_share_setting")
          | Engine Share Setting
        el-menu-item(index="/organisms/embed_file")
          | External video embed
        el-menu-item(index="/organisms/image_cropping")
          | Image Cropping
        el-menu-item(index="/organisms/rich_text_editor")
          | Rich Text Editor
        el-menu-item(index="/organisms/facebook_share_preview")
          | Facebook Share Preview
        el-menu-item(index="/organisms/twitter_share_preview")
          | Twitter Share Preview
        el-menu-item(index="/organisms/instagram_share_preview")
          | Instagram Share Preview
        el-menu-item(index="/organisms/email_share_preview")
          | Email Share Preview
      el-submenu(index="5")
        template(slot="title")
          | Templates
        el-menu-item(index="/templates/digital_asset_explorer")
          | Digital asset explorer
</template>

<script>
  // @vue/component
  export default {
    name: 'pbxxheader',
    data() {
      return {}
    }
  }
</script>

<style lang="scss">

</style>
