<template lang="pug">
  .editor
    textarea(ref="WysigEditor")
    label.gr(v-if="!rich_text && label") {{ label }}
</template>

<script>
  // Import TinyMCE
  import tinymce from 'tinymce/tinymce'
  // A theme is also required
  import 'tinymce/themes/modern/theme'
  // Any plugins you want to use has to be imported
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/paste'
  import liquid from './liquid'
  import placeholder from './placeholder'

  export default{
    name: 'rich_text_editor',
    data () {
      return {
        content: '',
        editor: null
      }
    },
    props: {
      placeholder: {
        type: String
      },
      rich_text: {
        type: Boolean,
        default: true
      },
      brand: {
        type: Object
      },
      campaign: {
        type: Object
      },
      value: {
        type: String
      },
      label: {
        type: String
      },
      rows: {
        type: Number,
        default: 5
      }
    },
    watch: {
      value() {
        if (this.editor) {
          const content_format = this.rich_text ? {} : { format: 'text' }
          const content = this.editor.getContent(content_format)
          if (content !== this.value) {
            this.editor.setContent(this.value)
          }
        }
      }
    },
    mounted() {
      liquid(this.brand, this.campaign)
      placeholder()
      this.initialize_editor()
    },
    beforeDestroy() {
      if (this.editor) {
        this.editor.remove()
      }
    },
    methods: {
      initialize_editor() {
        this.$nextTick(() => {
          tinymce.init({
            target: this.$refs.WysigEditor,
            paste_as_text: !this.rich_text,
            skin: false,
            branding: false,
            elementpath: false,
            menubar: false,
            statusbar: false,
            height: this.rich_text ? (26 * this.rows) + 24 : (26 * this.rows) + 13,
            min_height: this.rich_text ? 54 : 36,
            placeholder: this.placeholder,
            content_style: this.rich_text ? "body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0.5em 1em;}" : '@import url("https://fonts.googleapis.com/css?family=Work+Sans:300,500"); body {font-family: "Work Sans"; margin: 0.5em 1em; font-size: 13px;} p {margin: 0; line-height: 2em; font-weight: 300;}',
            toolbar: this.rich_text ? 'fontselect fontsizeselect | bold italic strikethrough underline | bullist numlist indent outdent | alignleft aligncenter alignright alignjustify | link | code | undo redo | liquid' : 'liquid',
            plugins: ['lists', 'code', 'liquid', 'placeholder', 'paste'],
            setup: (editor) => {
              editor.on('Change NodeChange keyup', () => {
                const content = editor.getContent()
                this.content = content && !this.rich_text ? editor.getContent({ format: 'text' }) : content
                this.$emit('input', this.content)
              })
              editor.on('init', () => {
                this.editor = editor
                editor.setContent(this.value || '')
                if (!this.rich_text) {
                  const container = editor.getContainer()
                  container.className = `${container.className} plain_text`
                }
              })
              editor.on('focus', () => {
                const container = editor.getContainer()
                container.className = `${container.className} focus`
                this.$emit('focus')
              })
              editor.on('blur', () => {
                const container = editor.getContainer()
                container.className = container.className.replace(/\s*focus/, '')
                this.$emit('blur')
              })
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor {
    position: relative;
    label {
      top: 7px;
      left: 0px;
      position: absolute;
    }
  }
</style>
