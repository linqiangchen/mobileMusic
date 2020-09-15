import axios from 'axios'
export default{
    namespaced:true,
    state:{
        api: 'http://www.eveal.cn:3003',
        defaultKeyWord:'',
        sugKey:[],
        topList:[],  
        songInfo:[]  
    },
    mutations:{
        defaultKey(state,payload){
            state.defaultKeyWord=payload
        },
        sugKey(state,payload){
            state.sugKey=payload
        },
        topList(state,payload){
            state.topList=payload
        },
        songInfo(state,payload){
            state.songInfo=payload
        }
    },
    actions:{
        defaultKey(context){

            axios.get(
            context.state.api+'/search/default')
            .then(res=>{
                const keyworld =res.data.data.showKeyword;
                context.commit('defaultKey',keyworld)

                
            })
            .catch(error=>{
                
            })
        },
        sugKey(context,payload){
 
            axios.get(
                context.state.api+`/search/suggest?keywords=${payload}&type=mobile`
            ).then(res=>{
               
                 const sugKey=res.data.result.allMatch;
                context.commit('sugKey',sugKey)

            })
            .catch(error=>{
                
            })
        },
        topList(context){
 
            axios.get(
                context.state.api+`/search/hot/detail`
            ).then(({data})=>{
               if(data.code===200){
                  const List = data.data
                  
                 
                //   
                context.commit('topList',List);
               
               }
               

            })
            .catch(error=>{
                
                
            })
        },
        songInfo(context,payload){
 
            axios.get(
                context.state.api+`/search?keywords=${payload.val}&limit=${payload.num}`
            ).then(res=>{
                //songs数组
               const info = res.data.result.songs;
               //歌曲总数
               const songsCount = res.data.result.songCount
            //    
               //过滤数据 每个item都是一个对象，map返回新数组，每个元素也是对象
               const songInfo= info.map(item=>{
                var arr= item.artists.map(item=>{
                    return item.name;
                })
                arr=arr.join('/')
                    return{
                        id:item.id,
                        name:item.name,
                        artists:arr,
                        alias:item.alias.join(''),
                        album:item.album.name,
                        songsCount:songsCount
                    }
                })
                
                context.commit('songInfo',songInfo);

            })
            .catch(error=>{
                
                
            })
        },
       
    }
}