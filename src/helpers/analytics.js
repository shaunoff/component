import _ from 'lodash'

class AnalyticsService {
  verify_analytics () {
    if (!window.analytics) {
      throw "Analytics.js is not instantiated"
    }
  }

  set_platform (platform) {
    this.platform = platform
  }

  track_click (props) {
    this.verify_analytics()
    props.platform = this.platform;
    analytics.track('Click', props)
  }

  track_response (type, object_type, object_id, error, optional_properties) {
    this.verify_analytics()
    var props = {
      success: !error,
      object: object_type,
      objectId: object_id,
      platform: this.platform
    };

    if (!!optional_properties) {
      props = _.merge({}, props, optional_properties)
    }

    analytics.track(type, props)
  }

  track_page (name, properties) {
    this.verify_analytics()
    analytics.page(name, properties)
  }
}

export default new AnalyticsService()
