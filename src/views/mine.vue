<template>
  <div class="mine">
    <header class="header">
      <img :src="userAvatr" alt="">
      <div class="user">
        <p>{{userName}}</p>
        <span>LV.8</span>
      </div>
      <i class="iconfont icon-you"></i>
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
             <i class="iconfont icon-yinle1-copy"></i>
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
    <div class="myLike">
    <img :src="playlist[0].coverImgUrl" alt="">
    <div class="info">
        <h3>我喜欢的音乐</h3>
        <span>{{count}} 首</span>
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
    this.$store.dispatch("user/loadUserInfo", 1351520305);
    this.$store.dispatch("user/loadPlayList", 1351520305);
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.userName,
      userAvatr: (state) => state.user.userAvatr,
      playlist: (state) => state.user.playList,
    }),
    like(){
        return this.playlist[0].coverImgUrl
    },
    count(){
        return this.playlist[0].trackCount
    },
  },
};
</script>

<style scoped lang="scss">
.mine{
    font-size: 0.16rem;
    position: absolute;
    top: 49px;
    padding: 0 0.1rem;
    width: 100%;
    
   bottom: 0.44rem;
    background-color: #cdc9c8;
}
.header{
    margin-top: 0.1rem;
    height: 0.6rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
    }
    .user{
        flex: 1;
        text-align: left;
         padding: 0 0.1rem;
        p{
           
            color:#292929;
            font-size: 0.22rem;
        }
        span{
            display: inline-block;
            border-radius: 10px;
            background-color: #fff;
            color:#444444;
            margin:  2px 0;
           width: 0.5rem;
           height: 0.2rem;
           text-align: center;
           line-height: 0.2rem;
            font-style: italic;
        }
    }
    i{
        display: block;
        width: 0.1rem;
    }
}
.navlist{
    width: 100%;
    margin-top: 0.2rem;
    padding:0.1rem;
    border-radius: 0.1rem;
    background-color: #fff;
    ul{
        display: flex;

        flex-wrap: wrap;
        li{

            width: 25%;
            height: 0.8rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            i{
                color:#fe4a3c;
                font-size: 0.22rem;
            }
            p{
                color:#b1b1b1;
                margin-top: 0.1rem;
            }
        }
    }
}
.myLike{
    display: flex;
    margin-top: 0.2rem;
    justify-content: space-between;
    align-items: center;
    padding:  0.1rem;
    background-color: #fff;
    border-radius: 10px;
    img{
        width: 0.6rem;
    }
    .info{
        flex: 1;
        text-align: left;
         padding: 0 0.1rem;
        h3{
           
            font-weight: normal;
            color:#333;
            font-size: 0.18rem;
        }
        span{
            color:#666;
            font-size: 0.14rem;
        }
    }
    p{
        border: 1px #ccc solid;
        width: 1rem;
        height: 0.28rem;
         color:#333;
        border-radius: 0.14rem;
        line-height: 0.28rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            margin:  0 2px;
        }
    }
}
</style>