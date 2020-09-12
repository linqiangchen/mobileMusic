import axios from 'axios'
export default {
    namespaced: true,
    state: {
        playlist: '',
        songs: [],
        banner: [],
        catList:[],
        topList:[],
        api: 'http://www.eveal.cn:3003',
        singer:[],
        singerInfo:[],
        singerMusic:null,
    },
    mutations: {
        updatePlayList(state, obj) {
            state.playlist = obj
        },
        updateBanner(state, obj) {
            state.banner = obj
        },
        updateCatList(state, obj) {
            state.catList = obj
        },
        updateTopList(state, obj) {
            state.topList = obj
        },
        updateSinger(state, obj) {
            state.singer = obj
        },
        updateSingerMusic(state, obj) {
            state.singerMusic = obj.SingerMusic
            state.singerInfo = obj.singer
        }
    },
    actions: {
        loadPlayList(context,cat="") { //加载用户歌单
        
               let url = context.state.api + '/top/playlist' +cat
            
            axios.get(url).then(res => {
                let playlist = res.data.playlists.map(item => ({
                    id: item.id,
                    name: item.name,
                    coverImgUrl: item.coverImgUrl,
                    trackCount: item.trackCount,
                    playCount: item.playCount,
                    creator: {
                        creatorName: item.creator.nickname,
                        signature: item.creator.signature,
                        avatarUrl: item.creator.avatarUrl,
                        userId: item.userId
                    }
                }))

                context.commit('updatePlayList', playlist)
            })
        },
        loadBanner(context) { //加载用户歌单
            axios.get(context.state.api + '/banner').then(res => {
               
                const banner = res.data.banners.map(({
                    imageUrl
                }) => imageUrl)
                context.commit('updateBanner', banner)
            })
        },
        loadCatList(context){
            axios.get(context.state.api + '/playlist/catlist').then(res => {
                const catList = res.data.sub.map((item) => ({
                    title:item.name,
                    hot:item.hot,
                    path:'?cat=' +item.name 
                }))
                context.commit('updateCatList', catList)
            })
        },
        loadSinger(context){
            axios.get(context.state.api + '/top/artists?offset=0&limit=50').then(res => {
                const Singer = res.data.artists.map((item) => ({
                    name:item.name,
                    picUrl:item.picUrl,
                    id:+item.id 
                }))
                context.commit('updateSinger', Singer)
            })
        },
        loadSingerMusic(context,id){
            axios.get(context.state.api + '/artists?id=' + id).then(res => {
                const singer = {
                    picUrl:res.data.artist.picUrl,
                    name:res.data.artist.name,
                    id
                }
                const SingerMusic = res.data.hotSongs.map((item) => ({
                    id:item.id,
                        name:item.name,
                        artists:item.ar.map(({name} )=> name).join('/'),
                        alias:item.alia.join(''),
                        album:item.al.name,
                        songsCount:50
                }))
                context.commit('updateSingerMusic', {singer,SingerMusic})
            })
        },
        loadTopList(context){
            axios.get(context.state.api + '/toplist/detail').then(res => {
                const topList = res.data.list.map((item) => ({
                    coverImgUrl:item.coverImgUrl,
                    description:item.description,
                    playCount:item.playCount ,
                    name:item.name,
                    tracks:item.tracks,
                    id:item.id,
                    updateFrequency:item.updateFrequency ,
                }))
                context.commit('updateTopList', topList)
            })
        }
    }
}