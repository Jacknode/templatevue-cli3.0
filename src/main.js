// import Vue from 'vue'
// console.log(ELEMENT)
// console.log(Mock)
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css
import uploader from 'vue-simple-uploader'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import seeImage from '@/plugin/SeeImage'
Vue.use(seeImage);
// import axios from 'axios'
import { getToken } from '@/utils/auth'
import * as filters from './filters'
import i18n from './lang'
Vue.use(VueLazyLoad,{
  error:'http://hly.1000da.com.cn/assets/img/error.jpg',
  dispatchEvent:true,
  loading:'http://hly.1000da.com.cn/assets/img/loading.gif',
});
// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
})

import '@/icons' // icon
// import '@/permission' // permission control
Vue.use(uploader)
axios.interceptors.request.use(function (config) {  //配置发送请求的信息\
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) { //配置请求回来的信息
    if(response.code==10001){
        router.push({name:'Login'})
    }
  return response;
}, function (error) {

  return Promise.reject(error);
});

Vue.use(ELEMENT, ELEMENT.lang.zhCN)
Vue.prototype.$http = axios;

Vue.config.productionTip = false


import VCharts from 'v-charts'//echarts调用
// Vue.use(VCharts)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
