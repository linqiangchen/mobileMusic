<template>
<iscroll-view class="content" @scrollStart="log" @pullUp="load">
<transition appear enter-active-class="slideIn" leave-active-class="slideOut">
  <div id="Search">
      
     <div class="back">
         <div class="backicon"><i class="iconfont icon-zuo arrow_left"  @click="backAction" /></div>
        <div class="ipt"> 
            <input type="text" :placeholder="defaultKeyWord" @input='inputAction' v-model="val"  @blur="blurAction" @keyup="keyupAction">
            <div class="hotKeymenu" v-show="isShow">
                <li>搜索 "{{val}}"</li>
                <li v-for="(item,index) in sugKey" :key="index" @click="selectHotKey">
                   <i class="iconfont icon-fangdajing"></i><span>{{item.keyword}}</span> 
                </li>
               
            </div>
           
        </div>
     </div>
    <!-- <HotSearch/> -->
    <SearchInfo v-model="select">
        <SearchInfo_item id="total" title="综合">
           <div class="title">
              <span>单曲</span>
              <span><i class="iconfont icon-shipin"></i><b>播放全部</b></span>
          </div>
          <ul class="List">
            <li>
              <div class="List_l">
                <p>无涯 (Full size)</p>
                <p>
                  <span>醉雪-一人之下第二季OP</span>
                </p>
                <p>网剧xxx片尾曲</p>
              </div>
              <div class="List_r">
                <i class="iconfont icon-shipin"></i>
                <i class="iconfont icon-sangedian"></i>
              </div>
            </li>
            
             
          </ul>
        </SearchInfo_item>
        <SearchInfo_item id="singer" title="歌手">
           歌手的内容
        </SearchInfo_item >
        <SearchInfo_item id="album" title="专辑">
          专辑的内容
        </SearchInfo_item>
        <SearchInfo_item id="video" title="视频">
           视频的内容
        </SearchInfo_item>
    </SearchInfo>
    
 
  </div>
</transition>
</iscroll-view>
</template>

<script>
import { mapState } from "vuex";
import HotSearch from "./HotSearch";
export default {
  components:{
    HotSearch,
  },
    data(){
        return{
            timer:null,
            isShow:false,
            val:'',
            select:'total'
        }
    },
   
     computed: {
    ...mapState({
      //placeholder的默认值
      defaultKeyWord: (state) => state.search.defaultKeyWord,
      //输入的建议值
      sugKey: (state) => state.search.sugKey,
      songInfo: (state) => state.search.songInfo,
    }),
   
  },
   methods:{
       load(){

    },
    log(e){
      e.refresh( )
    
    },
        backAction(){
            this.$router.back()
        },
        defaultKey(){
            this.timer=setInterval(() => {
                this.$store.dispatch('search/defaultKey');
                 this.$store.dispatch('search/sugKey')
            }, 5000);
        },
        inputAction(){
         this.isShow=true;
         
            
        },
        blurAction(){
            setTimeout(() => {
                 this.isShow=false;
            }, 20);
           
        },
        keyupAction(){
               if(!this.val){
                return;
            }else{
            //  console.log(this.val);
             this.$store.dispatch('search/sugKey',this.val)
            }
        },
        selectHotKey(e){
            this.val = e.target.innerText;
        }
    
    },

  mounted(){
     
      //初始化关键词
       this.$store.dispatch('search/defaultKey')
      //  console.log(this.sugKey);
       
  }
}
</script>

<style scoped>
.content{
 width: 100%;
   position: absolute;
    background: #fff;
   top: 0px;
   bottom: 120px;
    padding: 0 51px;
    z-index: 100;
}
#Search{
   
   
}
@keyframes slideIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
.slideIn {
  animation: slideIn 300ms ease-in;
}
@keyframes slideOut {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
.slideOut {
  animation: slideOut 300ms ease-out;
}
.arrow_left{
    font-size: 55px;
}
.back{
    height: 134px;
    display: flex;
    align-items: center;
}
.backicon{
    width: 55px;
    height: 55px;
    margin-right: 50px;
}
.backicon i{
    display: block;
    width: 100%;
    height: 100%;
}
.ipt{
    width: 100%;
    height: 134px;
    display: flex;
     position: relative;
   
}
.ipt  input{
        
       height: 100%;
        border: none;
       font-size:40px;
      height: 134px;
      
     
    }
.ipt::after{
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: transparent;
      border-bottom: 1px solid #333;

      position: absolute;
      left: 0;
      bottom: 12px;
}
.ipt  input::-webkit-input-placeholder{ /*WebKit browsers*/

color: #d1d1d1;

}

.ipt  input::-moz-input-placeholder{ /*Mozilla Firefox*/

color:#d1d1d1;

}

.ipt  input::-ms-input-placeholder{ /*Internet Explorer*/ 

color: #d1d1d1;
}
.hotKeymenu{
    font-size: 30px;
    width: 953px;

    border: 1px solid #ddd;
    border-radius: 10px;
    position: absolute;
    top:160px;
    right: 20px;
    background: #fff;
    z-index: 99;
    box-shadow: 0 0 0 rgba(0, 0, 0, .8);
    
}
.hotKeymenu li:nth-child(1){
  color: #55789e;
  padding-left: 50px;
}
.hotKeymenu li{
    line-height: 150px;
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding-left: 50px;
    font-size: 40px;
    color: #888888;
}
.hotKeymenu li i{
  font-size: 40px;
  margin-right: 50px;
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
.List li,.List_r{
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}
.List li{
  margin-bottom: 30px;
}
.List_l p{
  margin: 12px 0;
  letter-spacing: 2px;
}
.List_l p:nth-child(2){
   padding-left: 80px;
  background: url(/assets/SQ.jpg) no-repeat 0 center ;
  font-size: 35px;
  color: #7f7f7f;
}
.List_l p:nth-child(3){
  
  font-size: 35px;
  color: #7f7f7f;
}
.List_r{
  width: 180px;
}
.List_r i{
  font-size: 60px;
  color: #999;
}
</style>