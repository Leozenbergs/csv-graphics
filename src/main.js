import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import { store } from './store/store'


import routes from './routes.js'

Vue.use(VueRouter);


Vue.config.productionTip = false

new Vue({
  store,
  router: routes,
  render: h => h(App)
}).$mount('#app')

