import axios from 'axios'
export default {
    namespaced: true,
    state: {
        userId: '370540934',//370540934
        userName: '',
        userAvatr: '',
        playList: [],
        postPlayList:[],
        like:'',
        api: 'http://www.eveal.cn:3003'
    },
    mutations: {
        updateUserId(state, obj) {//切换用户id
            state.userId = obj
        },
        updateUserInfo(state, obj) {//更新用户信息
            state.userName = obj.userName;
            state.userAvatr = obj.userAvatr
        },
        updatePlayList(state, obj) {//更新用户歌单
           state.playList = obj.userPlaylist
           state.postPlayList = obj.postPlaylist
            state.like = obj.userPlaylist[0]
        }
    },
    actions: {
        loadUserInfo(context) { //加载用户信息
            axios.get(context.state.api + '/user/detail?uid=' + context.state.userId).then(res => {
                let userName= res.data.profile.nickname
                let userAvatr = res.data.profile.avatarUrl
                context.commit('updateUserInfo',{userName,userAvatr})        
            })    
        },
        loadPlayList(context){//加载用户歌单
            axios.get(context.state.api + '/user/playlist?uid=' + context.state.userId).then(res => { 
              let  playlist = res.data.playlist.map(item => ({
                    id: item.id,
                    name: item.name,
                    coverImgUrl: item.coverImgUrl,
                    trackCount:item.trackCount,
                    creator: {
                        creatorName: item.creator.nickname,
                        signature: item.creator.signature,
                        avatarUrl: item.creator.avatarUrl,
                        userId:item.userId
                    }
                }))
                const userPlaylist = playlist.filter(item => item.creator.userId == context.state.userId)
                const postPlaylist = playlist.filter(item => item.creator.userId != context.state.userId)
                context.commit('updatePlayList',{userPlaylist,postPlaylist})
            })}
    }
}