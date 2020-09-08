import Vue from 'vue'
import Vuex from 'vuex'
import music from './module/music'
import search from './module/search'
Vue.use(Vuex)

export default new Vuex.Store({
state:{
  api:'http://www.eveal.cn:3003'
},

  modules: {
    
    music,
    search
  }
})
