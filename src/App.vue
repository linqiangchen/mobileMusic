<template>
  <div id="app">
    <div id="header">
      <div class="left">
        <van-icon name="wap-nav" />
      </div>
      <nav class="nav">
        <li>
          <router-link to="/mine">我的</router-link>
        </li>
        <li>
          <router-link to="/">发现</router-link>
        </li>
        <li>
          <router-link to>云村</router-link>
        </li>
        <li>
          <router-link to>视频</router-link>
        </li>
      </nav>
      <div class="right" >
        <van-icon name="search" @click="SearchAction"/>
      </div>
    </div>
    <router-view />
    <div class="music">
      <audio :src="musicUrl"  ref="music"></audio>
      <img :src="musicImg" alt />
      <div class="songs">
        <h3 class="van-ellipsis">{{musicName}}</h3>
        <p class="van-ellipsis">{{musicSonger}}</p>
      </div>
      <div class="icon">
        <van-circle
          v-model="currentRate"
          layer-color="#ebedf0"
          :rate="30"
          :speed="100"
          :color="gradientColor"
          size="38px"
          @click="play"
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
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
    };
  },

  methods: {
    play() {
      this.$refs.music.play();
    },
     SearchAction(){
      this.$router.push('/Search');
  }
  },
  created() {
    this.$store.dispatch("music/loadMusicUrl", 1351520305);
    console.log(this.api);
  },
 
};
</script>

<style lang="scss">
@import url('//at.alicdn.com/t/font_2053859_u7mlazwdrmg.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
}
li {
  list-style: none;
}
#app {
    height: 100%;
  #header {
      background-color: transparent;
    position: fixed;
    height: 49px;
    width: 100%;
    font-size: 0.16rem;
   
    .left {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 0.1rem;
      transform: translateY(-50%);
      height: 16px;
    }
    .right {
      position: absolute;
      top: 50%;
      right: 0.1rem;
      transform: translateY(-50%);
      height: 16px;
    }
    .nav {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        padding: 0 10px;
        a {
          color: #333;
        }
      }
    }
  }
  .music {
    width: 100%;
    height: 0.44rem;
    padding: 0 0.1rem;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;

    align-items: center;
    font-size: 0.12rem;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
    .songs {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      h3 {
        width: 100%;
        color: #333;
        font-weight: normal;
      }
      p {
        width: 100%;
        color: #7d7f7e;
        font-size: 0.1rem;
      }
      flex: 1;
      text-align: left;
      margin: 0 0.05rem;
    }
    .icon {
      display: flex;
      justify-content: space-between;
 color: #7d7f7e;
      align-items: center;
      font-size: 0.3rem;
      width: 0.8rem;
    }
  }
}
</style>
