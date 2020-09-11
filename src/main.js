import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vue from 'vue';
import { Icon } from 'vant';
import 'lib-flexible'
import IScrollView from 'vue-iscroll-view'
import SearchInfo from "./views/SearchInfo";
import SearchInfo_item from "./views/SearchInfo_item";
import IScroll from 'iscroll'
Vue.use(IScrollView, IScroll)
Vue.use(Icon);

Vue.component('SearchInfo',SearchInfo);
Vue.component('SearchInfo_item',SearchInfo_item);

Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')

