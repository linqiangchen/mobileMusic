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
/* Using these kinds of IScroll class for different cases. */
import IScroll from 'iscroll'
// import IScroll from 'iscroll/build/iscroll-infinite.js
// import IScroll from 'iscroll/build/iscroll-probe.js
// import IScroll from 'iscroll/build/iscroll-view.js
// import IScroll from 'iscroll/build/iscroll-zoom.js
// import IScroll from 'iscroll/build/iscroll-lite.js

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

