import axios from 'axios'
export default {
    namespaced: true,
    state: {
        playListId: '370540934', //370540934
        name: '',
        creator: '',
        tag: '',
        trackIds: [],
        coverImg: '',
        playCount: '',
        api: 'http://www.eveal.cn:3003',
        description: '',
        songsInfo: [],
        trackCount: '',
        moreList:[],
        loadPlayListInfo:false,
        loadPlayListMusic:false,
        loadMore:false,
    },
    getters: {
        loading(state){
            return state.loadPlayListInfo&&state.loadPlayListMusic
        }
    },
    mutations: {
        updatePlayList(state, obj) { //更新歌单
            state.playListId = obj.id
            state.name = obj.name
            state.creator = obj.creator
            state.tag = obj.tag
            state.coverImg = obj.coverImgUrl
            state.description = obj.description
            state.trackIds = obj.trackIds
            state.songsInfo = obj.songsInfo
            state.trackCount = obj.trackCount
            state.playCount = obj.playCount
        },
        updateSongInfo(state, obj){
            if(obj){
                state.songsInfo.push(...obj)
            }
           
        },
        loadingInfo(state,bool){
            state.loadPlayListInfo = bool
        },
        updateloadMore(state,bool){
            state.loadMore = bool
        },
        loadingMusic(state,bool){
            state.loadPlayListMusic = bool
        },
    },
    actions: {
        loadPlayList(context, id) { //请求歌单
            context.commit('loadingInfo',true)
            context.commit('loadingMusic',true)
            axios.get(context.state.api + '/playlist/detail?id=' + id).then(res => {
                let playlist = {
                    id: res.data.playlist.id,
                    name: res.data.playlist.name,
                    coverImgUrl: res.data.playlist.coverImgUrl,
                    trackCount: res.data.playlist.trackCount,
                    playCount: res.data.playlist.playCount,
                    tag: res.data.playlist.tags,
                    description: res.data.playlist.description,
                    trackIds: res.data.playlist.trackIds.map(item => item.id),
                    creator: {
                        creatorName: res.data.playlist.creator.nickname,
                        signature: res.data.playlist.creator.signature,
                        avatarUrl: res.data.playlist.creator.avatarUrl,
                        userId: res.data.playlist.userId
                    }
                }
                axios.get(context.state.api + '/song/detail?ids=' + playlist.trackIds.slice(0, 100).join(',')).then(res => {
                    
                    playlist.songsInfo = res.data.songs.map(item => ({
                        
                        id: item.id,
                        name: item.name,
                        artists: item.ar.map(({
                            name
                        }) => name).join('/'),
                        alias: item.alia.join(''),
                        album: item.al.name,
                        songsCount: 50
                    }))
                    context.commit('updatePlayList', playlist)
                    context.commit('loadingInfo',false)
                    context.commit('loadingMusic',false)
                })

            })


        },
        loadMore(context, index){
            
            context.commit('updateloadMore',true)
          
            axios.get(context.state.api + '/song/detail?ids=' + context.state.trackIds.slice(index, index+50).join(',')).then(res => { 
               let songsInfo = res.data.songs.map(item => ({
                    id: item.id,
                    name: item.name,
                    artists: item.ar.map(({
                        name
                    }) => name).join('/'),
                    alias: item.alia.join(''),
                    album: item.al.name,
                    songsCount: 50
                }))
                
                context.commit('updateSongInfo', songsInfo)
                
                context.commit('updateloadMore',false)
               
            })
        }


    }
}