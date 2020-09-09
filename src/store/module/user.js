import axios from 'axios'

export default {
    namespaced: true,
    state: {
        userId: '370540934',
        userName: '',
        userAvatr: '',
        playList: [],
        like:'',
        api: 'http://www.eveal.cn:3003'
    },
    mutations: {
        updateUserId(state, obj) {
            state.userId = obj
        },
        updateUserInfo(state, obj) {
            
            state.userName = obj.userName;
            state.userAvatr = obj.userAvatr
       


        },
        updatePlayList(state, obj) {
           state.playList = obj
            state.like = obj[0]


        }
        // updateMusicUrl(state, obj) {
        //     state.musicDt = obj.dt
        //     state.musicId = obj.id
        //     state.musicSonger = obj.al.name
        //     state.musicImg = obj.al.picUrl
        //     state.musicName = obj.name
        // },
        // updatePlayUrl(state, url) {
        //     state.musicUrl = url
        // },
        // updateCommit(state, obj) {
        //     state.musicHotCommit = obj.hotComments
        //     state.musicCommit = obj.comments
        // },
        // updateMusicLyric(state, obj) {
        //     state.musicLyric = obj
        // }
    },
    actions: {
        loadUserInfo(context) {
           
            axios.get(context.state.api + '/user/detail?uid=' + context.state.userId).then(res => {
                let userName= res.data.profile.nickname
                let userAvatr = res.data.profile.avatarUrl
                context.commit('updateUserInfo',{userName,userAvatr})
               
            })
            
        },
        loadPlayList(context){
            axios.get(context.state.api + '/user/playlist?uid=' + context.state.userId).then(res => {
                
              let  playlist = res.data.playlist.map(item => ({
                    id: item.id,
                    name: item.name,
                    coverImgUrl: item.coverImgUrl,
                    trackCount:item.trackCount,
                    creater: {
                        creatorName: item.creator.nickname,
                        signature: item.creator.signature,
                        avatarUrl: item.creator.avatarUrl
                    }
                }))
                context.commit('updatePlayList',playlist)
            })}
    }
}