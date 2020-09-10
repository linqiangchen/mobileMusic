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
        updateUserId(state, obj) {
            state.userId = obj
        },
        updateUserInfo(state, obj) {
            
            state.userName = obj.userName;
            state.userAvatr = obj.userAvatr
       


        },
        updatePlayList(state, obj) {
           state.playList = obj.userPlaylist
           state.postPlayList = obj.postPlaylist
            state.like = obj.userPlaylist[0]


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
                    creator: {
                        creatorName: item.creator.nickname,
                        signature: item.creator.signature,
                        avatarUrl: item.creator.avatarUrl,
                        userId:item.userId
                    }
                }))
                const userPlaylist = playlist.filter(item => item.creator.userId == context.state.userId)
                const postPlaylist = playlist.filter(item => item.creator.userId != context.state.userId)
                console.log('userPlaylist: ', {userPlaylist,postPlaylist});
                context.commit('updatePlayList',{userPlaylist,postPlaylist})
            })}
    }
}