<template>
  <div class="HotSearch">
      <div class="Searhistory">
           <div>历史</div>
           <div class="Sear">
                <li>周杰伦</li>
                <li>陈奕迅</li>
                <li>林宥嘉</li>
                <li>许嵩</li>
           </div>
      </div>

      <div class="topSear">
          <div class="title">
              <span>热搜榜</span>
              <span>播放全部</span>
          </div>
          <ul class="topSearList">
              <li v-for="(item,index) in topListTen" :key="index">
                  <span :class="{red:index===0||index===1||index===2}">{{index+1}}</span>
                  <span :class="{weight:index===0||index===1||index===2}">{{item.searchWord}}</span>
                  <img :src="item.iconUrl" alt="" v-if="item.iconUrl">
              </li>
              
          </ul>
          <p @click="moreClickAction" >展开更多热搜 ∨</p>
           <ul class="topSearList" v-if="isShow">
              <li v-for="(item,index) in topListRest" :key="index">
                  <span>{{Index+index+1}}</span>
                  <span>{{item.searchWord}}</span>
                  <img :src="item.iconUrl" alt="" v-if="item.iconUrl">
              </li>
              
          </ul>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data(){
       return{
            isShow:false,
             Index:10
       }
    },
 computed:{
     
    ...mapState({
        //取出state中的数据
        //热搜榜前十条数据
         topListTen:state=>state.search.topListTen,
         topListRest:state=>state.search.topListRest,
    })
 },
 methods:{
     moreClickAction(){
         this.isShow=!this.isShow;
     }
 },
 mounted(){
     //初始化热搜榜
     this.$store.dispatch('search/topListTen')
 }
 
}
</script>

<style scoped>
.HotSearch{
font-size: 40px;
}
.Searhistory{
    display: flex;
    margin-top: 50px;
    margin-bottom: 50px;
    

}
.Searhistory div:nth-child(1){
line-height: 90px;
}
.Sear{
    display: flex;
    margin-left:50px ;
    
}
.Sear li{
    height: 90px;
    line-height: 60px;
    margin: 0 28px;
    padding: 20px;
    width: fit-content;
    background: #f3f3f3;
    border-radius: 50px;
}
.title{
    display: flex;
    height: 140px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.topSearList{
    display: flex;
    margin-top: 35px;
     flex-wrap: wrap;
}
.topSearList li{
    width: 42%;
    line-height: 108px;
    display: flex;
    
    align-items: center;
    margin-right: 60px;
    color: #333;
    font-size: 41px;
}
.topSearList li img{
    
    height: 42px;
    margin-top: -10px;
    
   
}
.topSearList li span:nth-child(2){
    margin: 0 20px 0 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
   
}
.topSearList li span:nth-of-type(1){
color: #999;
}

.topSearList li span.red{
    color: #e84443;
}
.topSearList li .weight{
    font-weight: 600;
}
</style>