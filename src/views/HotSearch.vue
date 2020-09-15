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
              <span><i class="iconfont icon-shipin"></i><b>播放全部</b></span>
          </div>
          <ul class="topSearList">
              <li v-for="(item,index) in topTen" :key="index" @click="autoplay">
                  <span :class="{red:index<=2}">{{index+1}}</span>
                  <span :class="{weight:index<=2}">{{item.searchWord}}</span>
                  <img :src="item.iconUrl" alt="" v-if="item.iconUrl">
              </li>
            
          </ul>
          <p @click="moreClickAction" class="resou" v-if="isShow">展开更多热搜<i class="iconfont  icon-v"></i></p>
          
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data(){
       return{
            isShow:true,
             Index:10
       }
    },
 computed:{
     
    ...mapState({
        //取出state中的数据
        //热搜榜前十条数据
         topList:state=>state.search.topList,
        //  topListRest:state=>state.search.topListRest,
    }),
    topTen(){
        return this.topList.slice(0,this.Index)
    }
 },
 methods:{
     moreClickAction(){
         this.isShow=false
         this.Index=20
        
     },
     autoplay(){
         
     }
 },
 mounted(){
     //初始化热搜榜
     this.$store.dispatch('search/topList')
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
    
}
.title span:nth-child(1){
  font-size: 48px;
  
}
.title span:nth-child(2){
  display: flex;
  align-items: center;
  line-height: 54px;
  font-size: 35px;
  padding: 15px 20px;
  border: 1px solid #ccc;
  border-radius: 50px;
  letter-spacing: 3px;
}
b{
  font-weight: normal;
}
.title span:nth-child(2) i{
  color: #333;
  font-size: 45px;
  line-height: 45px;
  margin-right: 20px;
  
}
.title span:nth-child(2) b{
  font-size: 40px;
  line-height: 40px;
 
  
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
.resou{
    color: #ccc;
    font-size: 40px;
}

.resou i{
    margin-left: 20px;
    font-size: 20px;
}
</style>