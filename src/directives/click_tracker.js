const directive = {
  inserted (el, binding) {
    el.addEventListener("click", () => {
      const analytics_service = require('../helpers/analytics')
      const track_properties = binding.value.properties || {}
      track_properties.object = binding.value.button_id

      if (track_properties.object) {
        analytics_service.track_click(track_properties)
      } else {
        throw "No Button ID Provided"
      }
    });
  }
};

export default directive
