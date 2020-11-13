import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
/* 导入全局样式表 */
import './assets/css/global.css'
import axios from 'axios'

/* 配置请求的根路径 */
axios.defaults.baseURL = 'http://127.0.0.1:9000/'
/* 拦截请求添加token到头部信息 */
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.token = window.sessionStorage.getItem('token')
  /* 在最后必须 return config */
  return config
})

/* 把axios挂载在原型上 使用时用$http */
Vue.prototype.$http = axios
/* 生产环境下不提示信息 */
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
