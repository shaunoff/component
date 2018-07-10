import Vue from 'vue';
// helpers
import analytics from './helpers/analytics';
import assets_helper from './helpers/assets_helper';
// directives
import click_tracker from './directives/click_tracker';
// organisms
// molecules
import * as organisms from './components/organisms';
import * as molecules from './components/molecules';

import pbxx_filter_pills from './components/filter_pills/index.vue';


import '@promoboxx/pbxxfont';
import '@promoboxx/pbxxfont/dist/promoboxx-icon-regular.css';
import './styles/index_with_pbxxfont.scss';
import truncate_filter from './filters/truncate';

import VeeValidate from 'vee-validate';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import Froala from 'vue-froala-wysiwyg';

import Cookies from 'js-cookie';

import axios from 'axios';
import VueAxios from 'vue-axios';

require('froala-editor/js/froala_editor.pkgd.min');
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');
require('froala-editor/css/froala_style.min.css');

const components = { ...molecules, ...organisms };

const config = {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: {
    en: {
      custom: {
        external_video_url: {
          url: 'External video url is not valid',
        },
      },
    },
  },
  strict: false,
  classes: true,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'is-success', // model is valid
    invalid: 'is-error', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty', // control has been interacted with
  },
  events: 'input|blur',
  inject: false, // do not automatically inject $validator into components
  validity: false,
  aria: true,
};
const cookie = Cookies.get('token');
axios.defaults.baseURL = `${process.env.VUE_APP_DATA_SERVER}/v2`;
axios.defaults.headers.common.Authorization = `Bearer ${cookie}`;
axios.interceptors.response.use((response) => {
  if (response.headers.Authorization) {
    axios.defaults.headers.common.Authorization = response.headers.Authorization;
  }
  return response;
}, error =>
  // Do something with response error
  Promise.reject(error));
// Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

export const {header_widget} = components


export default {
  install: (Vue) => {
    for (const key in components) {
      Vue.component(key, components[key]);
    }

    Vue.filter('truncate', truncate_filter);

    Vue.directive('click_tracker', click_tracker);

    Vue.use(VeeValidate, config);
    Vue.use(Froala);
    Vue.use(ElementUI, { locale });
  },
  assets_helper,
  analytics,
};
