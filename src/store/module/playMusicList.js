import axios from 'axios'
export default {
    namespaced: true,
    state: {
       listName:'',
       list:[],
       curIndex:''
    },
    mutations: {
        updateList(state, obj) {
           state.listName = obj.listName
           state.list = obj.list
            state.curIndex = obj.index
        },
        updateIndex(state,obj){
            state.curIndex = obj
        }
    },
}