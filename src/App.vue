<template>
  <div id="app">
    <div id="header">
      
      <nav class="nav">
      <li class="left ">
         <van-icon name="wap-nav" />
      </li>
        <li v-for="item in headerList" :key="item.id" @click="check(item.id)">
          <router-link :to="item.path" :class="{active:active === item.id}">{{item.title}}</router-link>
        </li>
        
        <li class="right">
        <van-icon name="search" @click="SearchAction" />
      </li>
      </nav>
      
    </div>
    <div class="content">
      <router-view />
    </div>

    <div class="music">
      <audio :src="musicUrl" ref="music"></audio>
      <img :src="musicImg" alt />
      <div class="songs">
        <h3 class="van-ellipsis">{{musicName}}</h3>
        <p class="van-ellipsis">{{musicSonger}}</p>
      </div>
      <div class="icon" @click="play">
        <van-circle
          v-model="currentRate"
          layer-color="#ebedf0"
          :rate="30"
          :speed="100"
          :color="gradientColor"
          size="60px"
        />
        <van-icon name="bar-chart-o" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Circle } from "vant";
import { mapState } from "vuex";
Vue.use(Circle);
export default {
  computed: {
    ...mapState({
      musicUrl: (state) => state.music.musicUrl,
      musicImg: (state) => state.music.musicImg,
      musicName: (state) => state.music.musicName,
      musicSonger: (state) => state.music.musicSonger,
    }),

    text() {
      return this.currentRate.toFixed(0) + "%";
    },
  },
  data() {
    return {
      currentRate: 0,
      active:1,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      headerList:[
        {
          id:0,
          path:'/mine',
          title:'我的'
        },
        {
          id:1,
          path:'/',
          title:'发现'
        },
        {
          id:2,
          path:'/',
          title:'云村'
        },
        {
          id:3,
          path:'/mine',
          title:'视频'
        },
      ]
    };
  },

  methods: {
    check(id){
        this.active = id
    },
    play() {
      console.log(111);
      this.$refs.music.play();
    },
    SearchAction() {
      this.$router.push("/Search");
    },
  },
  created() {
    this.$store.dispatch("music/loadMusicUrl", 1351520305);
    // this.$store.dispatch("user/loadUserInfo");
    // this.$store.dispatch("user/loadPlayList");
  },
};
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/font_2053859_xkqre4xeo1k.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.content {
  width: 100%;
  position: absolute;
  top: 120px;
  bottom: 148px;
  
  overflow: auto;
}
html,
body {
  width: 100%;
  height: 100%;
  font-size: 100px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  letter-spacing: 3px;
}
li {
  list-style: none;
}

#app {
  height: 100%;
  #header {
    background-color: #fff;
    position: absolute;
    top: 0;
    height: 120px;
    padding: 0 50px;
    width: 100%;
    font-size: 50px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
   
    .nav {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        display: flex;
        align-items: center;
        padding: 0 30px;
        a {
          
          color: #605e61;
        }
        .active{
         font-weight: bold;
          color:#242424;
        }
      }
    }
  }
  .music {
    width: 100%;
    height: 148px;
    padding:20px  10px;
//  border-top: 2px #ccc solid;
    position: fixed;
    bottom: 0;
    display: flex;
    z-index: 999;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    font-size: 0.12rem;
    img {
     height: 100%;
    }
    .songs {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
     
      h3 {
        width: 100%;
        color: #333;
        font-weight: normal;
        font-size: 40px;
      }
      p {
        width: 100%;
        color: #7d7f7e;
       font-size: 26px;
      }
      flex: 1;
      text-align: left;
      margin: 0 20px;
    }
    .icon {
      display: flex;
      justify-content: space-between;
      color: #7d7f7e;
      align-items: center;
      
      width: 160px;
       font-size: 60px;
    }
  }
}
</style>
