import axios from 'axios'
export default {
    namespaced: true,
    state: {
        playListId: '370540934',//370540934
        name: '',
        creator: '',
        tag:'',
        trackIds:[],
        coverImg:'',
        playCount:'',
        api: 'http://www.eveal.cn:3003',
        description:'',
    },
    mutations: {
        updatePlayList(state, obj) {//更新歌单
           state.playListId = obj.id
           state.name = obj.name
            state.creator = obj.creator
            state.tag = obj.tag
           state.coverImg = obj.coverImgUrl
            state.description = obj.description
            state.trackIds = obj.trackIds
        }
    },
    actions: {
        loadPlayList(context,id){//请求歌单
            axios.get(context.state.api + '/playlist/detail?id=' + id).then(res => { 
              let  playlist = {
                    id: res.data.playlist.id,
                    name: res.data.playlist.name,
                    coverImgUrl: res.data.playlist.coverImgUrl,
                    trackCount:res.data.playlist.trackCount,
                    playCount:res.data.playlist.playCount,
                    tag:res.data.playlist.tags,
                    description:res.data.playlist.description,
                    trackIds:res.data.playlist.trackIds.map(item => item.id),
                    creator: {
                        creatorName: res.data.playlist.creator.nickname,
                        signature: res.data.playlist.creator.signature,
                        avatarUrl: res.data.playlist.creator.avatarUrl,
                        userId:res.data.playlist.userId
                    }
                }
                context.commit('updatePlayList',playlist)
            })}
    }
}