<script>
// @vue/component
import Vue from 'vue/dist/vue.js'

export default {
  name: 'variable_renderer',
  props: {
    retailer: {
      type: Object,
      required: true,
      default: () => ({})
    },
    brand: {
      type: Object,
      required: true,
      default: () => ({})
    },
    template_string: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    template() {
      if (this.template_string) {
        const template_string = this.template_string.match(/<.*>/)
          ? this.template_string
          : `<span>${this.template_string}</span>`
        return Vue.compile(template_string).render
      }
      return false
    }
  },
  render(createElement) {
    if (!this.template) return createElement('div', 'Missing Template')
    return this.template()
  }
}
</script>
