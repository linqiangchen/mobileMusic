<template>
<transition appear enter-active-class="slideIn" leave-active-class="slideOut">
  <div id="Search">
      
     <div class="back">
         <div class="backicon"><i class="iconfont icon-zuo arrow_left"  @click="backAction" /></div>
        <div class="ipt"> 
            <input type="text" :placeholder="defaultKeyWord" @focus='focusAction' v-model="val"  @blur="blurAction" @keyup="keyupAction">
            <div class="hotKeymenu" v-show="isShow">
                <li>搜索 "{{val}}"</li>
                <li v-for="(item,index) in sugKey" :key="index" @click="selectHotKey">
                    {{item.keyword}}
                </li>
               
            </div>
           
        </div>
     </div>
    <HotSearch/>
  </div>
</transition>
</template>

<script>
import { mapState } from "vuex";
import HotSearch from "./HotSearch";
export default {
  components:{
    HotSearch
  },
    data(){
        return{
            timer:null,
            isShow:false,
            val:''
        }
    },
   
     computed: {
    ...mapState({
      //placeholder的默认值
      defaultKeyWord: (state) => state.search.defaultKeyWord,
      //输入的建议值
      sugKey: (state) => state.search.sugKey,
    }),
   
  },
   methods:{
        backAction(){
            this.$router.back()
        },
        defaultKey(){
            this.timer=setInterval(() => {
                this.$store.dispatch('search/defaultKey');
                 this.$store.dispatch('search/sugKey')
            }, 5000);
        },
        focusAction(){
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
       console.log(this.sugKey);
       
  }
}
</script>

<style scoped>

#Search{
    width: 100%;
    top: 0px;
    background: #fff;
    position: fixed;
    padding: 0 51px;
    bottom: 0;
    z-index: 100;
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
    padding-left: 112px;
    font-size: 40px;
    color: #888888;
}
</style>