import 'bootstrap';
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import { currency, date } from '@/methods/filters';
import $httpMessageState from '@/methods/pushMessageState';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.globalProperties.$filters = {
  date,
  currency,
};
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.use(VueAxios, axios);
app.use(router);
app.component('LoadingElement', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
