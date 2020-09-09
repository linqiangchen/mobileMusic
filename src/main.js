import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vue from 'vue';
import { Icon } from 'vant';
import 'lib-flexible'
Vue.use(Icon);

Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')

