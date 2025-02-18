import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$baseURL = "http://114.212.102.34/api"

Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
