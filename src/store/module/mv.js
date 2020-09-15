import axios from 'axios'
export default {
    namespaced: true,
    state: {
        api: 'http://www.eveal.cn:3003',
        WYmv:[],
        allMv:[],
        mvUrl:'',
        playMv:''
    },
    mutations: {
        updateMV(state, obj) {
            state.WYmv = obj
        },
        updateAllMV(state, obj) {
            state.allMv = obj
        },
        updateMvUrl(state,obj){
            state.mvUrl = obj.url;
            state.playMv = obj.playMv.item
        }
    },
    actions: {
        loadMV(context) {
            axios.get(context.state.api + "/mv/exclusive/rcmd?limit=30").then(res => { //歌曲信息
                const MV = res.data.data.map(({
                    id,
                    cover,
                    name,
                    playCount,
                    artists
                }) => ({
                    id,
                    cover,
                    name,
                    playCount,
                    artists,
                    artisteName:artists.map(item => item.name).join('/')
                }))
                console.log(MV)
                context.commit('updateMV', MV)
            })
        },
        loadAllMV(context) {
            axios.get(context.state.api + "/mv/first?limit=100").then(res => { //歌曲信息
                const MV = res.data.data.map(({
                    id,
                    cover,
                    name,
                    playCount,
                    artists
                }) => ({
                    id,
                    cover,
                    name,
                    playCount,
                    artists
                }))
                console.log(MV)
                context.commit('updateAllMV', MV)
            })
        },
        loadMVUrl(context,obj) {
            axios.get(context.state.api + "/mv/url?id=" + obj.id).then(res => { //歌曲信息
                const url = res.data.data.url
                context.commit('updateMvUrl', {url,playMv:obj})
            })
        },
    }

}