import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/display.css'
import axios from 'axios'
import Distpicker from 'v-distpicker'

Vue.config.productionTip = false
Vue.component('v-distpicker', Distpicker)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:1314/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
