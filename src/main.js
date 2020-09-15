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
import { ShareSheet } from 'vant';
import VueLazyload from 'vue-lazyload'
import blur from './plugin/blur'
import loading from './plugin'
Vue.use(ShareSheet);
Vue.use(blur,{
  blur: 50,
  maskColor: 'rgba(0,0,0,.4)'
})
Vue.use(loading)
Vue.use(IScrollView, IScroll)
Vue.use(Icon);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading:  'assets/loading.jpg',
  attempt: 1
})
Vue.component('SearchInfo',SearchInfo);
Vue.component('SearchInfo_item',SearchInfo_item);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

