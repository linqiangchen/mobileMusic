<template>
<transition enter-active-class="slideIn" leave-active-class="slideOut">
  <div id="Search">
      
     <div class="back">
         <div class="backicon"><i class="iconfont icon-zuo arrow_left"  @click="backAction" /></div>
        <div class="ipt"> 
            <input type="text" :placeholder="defaultKeyWord" @focus='focusAction' v-model="val"  @blur="blurAction" @keyup="keyupAction">
            <div class="hotKeymenu" v-show="isShow"  @click="selectHotKey">
                <li v-for="(item,index) in sugKey" :key="index">
                    {{item.keyword}}
                </li>
               
            </div>
        </div>
     </div>
      
  </div>
</transition>
</template>

<script>
import { mapState } from "vuex";
export default {
    data(){
        return{
            timer:null,
            isShow:false,
            val:''
        }
    },
   
     computed: {
    ...mapState({
      defaultKeyWord: (state) => state.search.defaultKeyWord,
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
       
  }
}
</script>

<style scoped>

#Search{
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    padding: 0 0.2rem;
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
    font-size: 0.25rem;
}
.back{
    height: 0.6rem;
    display: flex;
    align-items: center;
}
.backicon{
    width: 0.25rem;
    height: 0.25rem;
    margin-right: 0.3rem;
}
.backicon i{
    display: block;
    width: 100%;
    height: 100%;
}
.ipt{
    width: 100%;
    height: 0.6rem;
    display: flex;
     position: relative;
   
}
.ipt  input{
        
       height: 100%;
        border: none;
       font-size: 0.16rem;
      height: 0.6rem;
      
     
    }
.ipt::after{
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: transparent;
      border-bottom: 1px solid #333;
      /* transform: scaleY(0.5); */
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
    font-size: 12px;
    width: 100%;
    /* border: 1px solid lightcoral; */
    border-radius: 5px;
    border-top:none;
    position: absolute;
    top: 0.45rem;
    left: 0;
    background: #fff;
    z-index: 99;
}
.hotKeymenu li{
    line-height: 0.2rem;
    text-align: left;
    font-size: 14px;
}
</style>