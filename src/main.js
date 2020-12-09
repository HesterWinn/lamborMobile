// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/base/base';
import router from './router';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import CommUtility from 'scripts/common/CommUtility';

// 加入自訂信箱欄位驗證
VeeValidate.Validator.extend('lamborEmail', {
  getMessage: field => 'The' + field + 'value is not truthy.',
  validate: value => {
    return CommDef.Regex.Email1.test(value) && CommDef.Regex.Email2.test(value);
  }
});

Vue.use(Vuex);
Vue.use(VeeValidate);

Vue.config.productionTip = false

// tick轉換為本地時間
Vue.filter('utcTicksToLocalTime', function (utcDateTicks, format) {
  return CommUtility.UtcTicksToLocalTime(utcDateTicks, format);
})
Vue.filter('simpleContent', function (content, length) {
  return CommUtility.SimpleContent(content, length);
})
Vue.filter('moneyFormat', function (content) {
  return CommUtility.MoneyFormat(content);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
