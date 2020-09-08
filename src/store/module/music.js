import axios from 'axios'

export default 
    {
        namespaced: true,
        state: {
          musicId : '',
          musicImg:'',
          musicSonger:'',
          musicDt:'',
          musicUrl:'',
          musicName:'',
          musicHotCommit:'',
          musicCommit:'',
          musicLyric:'',
          api:'http://www.eveal.cn:3003'
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
              axios.get(context.state.api + '/song/detail?ids=' + id).then(res =>{
                context.commit('updateMusicUrl',res.data.songs[0])
              })
              axios.get(context.state.api + '/song/url?id=' + id).then(res =>{
               
                context.commit('updatePlayUrl',res.data.data[0].url)
              })
              axios.get(context.state.api + '/comment/music?&limit=100&id='  + id).then(res =>{
               
                context.commit('updateCommit',res.data)
              })
              axios.get(context.state.api + '/lyric?id=' + id).then(res =>{
               console.log(res.data.lrc.lyric)
                context.commit('updateMusicLyric',res.data.lrc.lyric)
              })
          }
        }
    }
