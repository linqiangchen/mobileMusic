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
                console.log('请求失败了...');
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
                console.log('请求失败了...');
            })
        },
        topList(context){
 
            axios.get(
                context.state.api+`/search/hot/detail`
            ).then(({data})=>{
               if(data.code===200){
                  const List = data.data
                  
                  const rest = data.data.slice(10)
                //   console.log(rest);
                context.commit('topList',List);
               //context.commit('topListRest',rest)
               }
               

            })
            .catch(error=>{
                console.log('请求失败了...');
                console.log(error);
            })
        },
        songInfo(context,payload){
 
            axios.get(
                context.state.api+`/search/suggest?keywords=${payload}&type=mobile`
            ).then(res=>{
               console.log(res);
                //  const sugKey=res.data.result.allMatch;
                // context.commit('sugKey',sugKey)

            })
            .catch(error=>{
                console.log('请求失败了...');
            })
        },
       
    }
}