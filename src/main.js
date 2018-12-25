// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import func from './public/func'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/css/admin.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.func = func

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render: h => h(App)
})
