function placeholder () {
  tinymce.PluginManager.add('placeholder', function(editor) {
    editor.on('init', function() {
      const container = editor.getContainer()
      const rich_text = !container.className.match('plain_text')
      const label = new Label(rich_text)

      on_blur()

      tinymce.DOM.bind(label.el, 'click', on_focus)
      editor.on('focus', on_focus)
      editor.on('blur', on_blur)
      editor.on('change', on_blur)
      editor.on('setContent', on_blur)
      editor.on('keydown', on_key_down)

      function on_focus() {
        if (!editor.settings.readonly === true) {
          label.hide()
        }
        editor.execCommand('mceFocus', false)
      }

      function on_blur() {
        if (editor.getContent() == '') {
          label.show()
        } else {
          label.hide()
        }
      }

      function on_key_down(){
          label.hide()
      }
    })

    const Label = function(rich_text){
      const placeholder_text = editor.getElement().getAttribute("placeholder") || editor.settings.placeholder
      const placeholder_attrs = editor.settings.placeholder_attrs || {
        style: {
          position: 'absolute',
          top: rich_text ? 16 : 7,
          left: 12,
          color: '#888',
          width:'98%',
          overflow: 'hidden',
          'white-space': 'pre-wrap',
          'line-height': rich_text ? '18px' : '26px',
          'font-size': rich_text ? '16px' : '13px',
          'font-family': rich_text ? 'Helvetica Neue, Helvetica, Arial, sans-serif' : 'Work Sans'
        }
      }
      const contentAreaContainer = editor.getContentAreaContainer()

      tinymce.DOM.setStyle(contentAreaContainer, 'position', 'relative')

      // Create label el
      this.el = tinymce.DOM.add( contentAreaContainer, editor.settings.placeholder_tag || "label", placeholder_attrs, placeholder_text )
    }

    Label.prototype.hide = function(){
      tinymce.DOM.setStyle( this.el, 'display', 'none' )
    }

    Label.prototype.show = function(){
      tinymce.DOM.setStyle( this.el, 'display', '' )
    }
  })
}

export default placeholder
