import axios from 'axios'
export default {
    namespaced: true,
    state: {
       listName:'',
       list:[],
       curIndex:'',
       order:0
    },
    mutations: {
        updateList(state, obj) {
           state.listName = obj.listName
           state.list = obj.list
            state.curIndex = obj.index
        },
        updateIndex(state,obj){
            if(state.order === 1){
                state.curIndex = parseInt( Math.random()*state.list.length)
            }else{
                state.curIndex = obj
            }
           
        },
        updateOrder(state,num){
            state.order = num
        }
    },
}