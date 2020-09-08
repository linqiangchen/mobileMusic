import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
export default new Vuex.Store({
  state: {
    musicId : '',
    musicImg:'',
    musicSonger:'',
    musicDt:'',
    musicUrl:'',
    musicName:'',
    musicHotCommit:'',
    musicCommit:'',
    musicLyric:''
  },
  mutations: {
    updateMusicUrl(state,obj){
        state.musicDt = obj.dt
        state.musicId = obj.id
        state.musicSonger = obj.al.name
        state.musicImg = obj.al.picUrl
        state.musicName = obj.name
    },
    updatePlayUrl(state,url){
      state.musicUrl = url
    },
    updateCommit(state,obj){
      state.musicHotCommit = obj.hotComments
      state.musicCommit = obj.comments
    },
    updateMusicLyric(state,obj){
      state.musicLyric = obj
    }
  },
  actions: {
    loadMusicUrl(context,id){
        axios.get('http://www.eveal.cn:3003/song/detail?ids=' + id).then(res =>{
          context.commit('updateMusicUrl',res.data.songs[0])
        })
        axios.get('http://www.eveal.cn:3003/song/url?id=' + id).then(res =>{
         
          context.commit('updatePlayUrl',res.data.data[0].url)
        })
        axios.get('http://www.eveal.cn:3003/comment/music?&limit=100&id='  + id).then(res =>{
         
          context.commit('updateCommit',res.data)
        })
        axios.get('http://www.eveal.cn:3003/lyric?id=' + id).then(res =>{
         console.log(res.data.lrc.lyric)
          context.commit('updateMusicLyric',res.data.lrc.lyric)
        })
    }
  },
  modules: {
  }
})
