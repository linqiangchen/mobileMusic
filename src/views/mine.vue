<template>
  <div class="mine" >
    <header class="header">
      <img :src="userAvatr" alt="">
      <div class="user">
        <p>{{userName}}</p>
        <span>LV.8</span>
      </div>
      <div class="iconfont icon-you"></div>
    </header>
    <div class="navlist">
        <ul>
            <li>
             <i class="iconfont icon-xiazai"></i>
             <p>本地音乐</p>
            </li>
            <li>
             <i class="iconfont icon-yunpan"></i>
             <p>云盘</p>
            </li>
            <li>
             <i class="iconfont icon-gou"></i>
             <p>已购</p>
            </li>
            <li>
             <i class="iconfont icon-bofang"></i>
             <p>最近播放</p>
            </li>
            <li>
             <i class="iconfont icon-yinyue"></i>
             <p>我的关注</p>
            </li>
            <li>
             <i class="iconfont icon-star"></i>
             <p>收藏和赞</p>
            </li>
            <li>
             <i class="iconfont icon-diantai"></i>
             <p>我的电台</p>
            </li>
            <li>
             <i class="iconfont icon-jia"></i>
             <p>音乐应用</p>
            </li>
        </ul>
    </div>
 
    <div class="myLike" v-if="playlist">
    <img :src="like.coverImgUrl" alt="" >
    <div class="info">
        <h3>我喜欢的音乐</h3>
        <span>{{like.trackCount}} 首</span>
    </div>
    <p> 
    <i class="iconfont icon-Group"></i><span>心动模式</span>
    </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
     this.$store.dispatch("user/loadUserInfo");
    this.$store.dispatch("user/loadPlayList");
  },
  beforeCreate(){
      
  },
  data(){
      return {
          img:'http://p1.music.126.net/bBQWBSSAqkpGU0sXikON2w==/109951164089165894.jpg',
          count:0
      }
  },
  mounted(){

  },
  computed: {
    ...mapState({
      userName: (state) => state.user.userName,
      userAvatr: (state) => state.user.userAvatr,
      playlist: (state) => state.user.playList,
      like: (state) => state.user.like,
    }),
    // count(){
    //     return this.playlist[0].trackCount
    // },
    // imgUrl(){
    //     return this.playlist[0].coverImgUrl
    // },
    
  },
  watch: {
        'this.playlist':{
            handler(newVal,oldVal){
                 console.log(newVal);
                 if(newVal){
                     this.img = newVal
                 }
            },
          
        }
    },
};
</script>

<style scoped lang="scss">

.mine{
    font-size: 0.16rem;
    position: absolute;
 top: 0;
    padding: 0 40px;
    width: 100%;
    bottom: 0;
    overflow: auto;
    background-color: #cdc9c8;
}
.header{
    margin-top: 40px;
    height: 154px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        height: 100%;
        border-radius: 50%;
    }
    .user{
        flex: 1;
        text-align: left;
         padding: 0 0.1rem;
        p{
           
            color:#292929;
            font-size: 48px;
        }
        span{
            display: inline-block;
            border-radius: 23px;
            background-color: #fff;
            color:#444444;
            margin:  2px 0;
           width: 100px;
           height:46px;
           font-size: 26px;
           text-align: center;
           line-height: 46px;
            font-style: italic;
        }
    }
    .iconfont{
        display: block;
       font-size: 36px;
    }
}
.navlist{
    width: 100%;
    margin-top:40px;
   
 height: 470px;
    border-radius: 40px;
    background-color: #fff;
    ul{
        display: flex;

        flex-wrap: wrap;
        
        li{
            width: 25%;
            display: flex;
            height: 235px;
            flex-direction: column;
            justify-content: center;
            i{
                color:#fe4a3c;
                font-size: 80px;
            }
            p{
                font-size: 32px;
                color:#b1b1b1;
                margin-top: 24px;
            }
        }
    }
}
.myLike{
    display: flex;
    margin-top: 60px;
    justify-content: space-between;
    align-items: center;
    height: 246px;
  padding: 0 54px;
    background-color: #fff;
     border-radius: 40px;
    img{
        width: 150px;
        border-radius: 20px;
    }
    .info{
        flex: 1;
        text-align: left;
         padding: 0 0.1rem;
        h3{
           
            font-weight: normal;
            color:#333;
            font-size:42px;
        }
        span{
            color:#666;
            font-size: 34px;
        }
    }
    p{
        border: 1px #666 solid;
        width: 244px;
        height: 72px;
         color:#333;
        border-radius: 36px;
        line-height: 72px;
        display: flex;
        font-size: 34px;
        justify-content: center;
        align-items: center;
        span{
            margin:  0 10px;
        }
        .iconfont{
            font-size: 40px;
        }
    }
}
</style>