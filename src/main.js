import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import VueAnalytics from 'vue-ua'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  appName: 'Switchats',
  appVersion: '0.1.0',
  trackingId: 'UA-178019370-1',
  vueRouter: router
})
Vue.use(Vuelidate)
Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
