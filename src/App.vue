<template>
  <div id="app">
    <div id="header">
      <nav class="nav">
        <li class="left">
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
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="music">
      <audio :src="musicUrl" ref="music"></audio>
      <img :src="musicImg" alt @click="$router.push('/detail')" />
      <div class="songs">
        <h3 class="van-ellipsis">{{musicName}}</h3>
        <p class="van-ellipsis">{{musicSonger}}</p>
      </div>
      <div class="icon" @click="play">
        <div class="cor">
          <van-circle
            v-model="currentRate"
            layer-color="#ebedf0"
            :rate="0"
            :speed="0"
            :color="gradientColor"
            size="60px"
          />
          <i class="iconfont" :class="icon"></i>
        </div>
        <i class="iconfont icon-gedan"></i>
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
      musicDt: (state) => state.music.musicDt,
      isplay: (state) => state.music.isPlay,
      like: (state) => state.user.like,
      trackIds: (state) => state.playList.trackIds,
      list: (state) => state.playMusicList.list,
      curIndex: (state) => state.playMusicList.curIndex,
    }),
    speed() {
      return this.musicDt / 100000;
    },

    text() {
      return this.currentRate.toFixed(0) + "%";
    },
  },
  watch: {
    isplay(newVal) {
      this.icon = newVal ? "icon-bofang2" : "icon-bofang1";
      if (newVal) {
      } else {
      }
    },
    like(newVal) {
      console.log(newVal);
      this.$store.dispatch("playList/loadPlayList", this.like.id);
      this.$store.commit("playMusicList/updateList", {
        listName: this.like.name,
        list: this.trackIds,
        index: 0,
      });
    },
  },
  data() {
    return {
      currentRate: 0,
      active: 1,
      pt: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      icon: "icon-bofang1",
      headerList: [
        {
          id: 0,
          path: "/mine",
          title: "我的",
        },
        {
          id: 1,
          path: "/singer",
          title: "发现",
        },
        {
          id: 2,
          path: "/playListPlaza",
          title: "歌单",
        },
        {
          id: 3,
          path: "/topList",
          title: "排行",
        },
      ],
    };
  },
  provide() {
    return {
      playMusic: this.playmusic,
      pauseMusic: this.pauseMusic,
      pt: this.pt,
      togglePt: this.togglePt,
      // 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
    };
  },
  methods: {
    playmusic() {
      this.$refs.music.play();
    },
    pauseMusic() {
      this.$refs.music.pause();
    },
    check(id) {
      this.active = id;
    },
    play() {
      this.$store.commit("music/updatePlay", !this.isplay);
      if (this.isplay) {
        this.playmusic();
      } else {
        this.pauseMusic();
      }
    },
    togglePt(pt) {
      this.pt = pt;
    },
    SearchAction() {
      this.$router.push("/Search");
    },
  },
  mounted() {
    this.$refs.music.ontimeupdate = () => {
      this.pt = this.$refs.music.currentTime;
      this.togglePt(this.$refs.music.currentTime);
      // this.$store.commit("music/updatePt", this.$refs.music.currentTime);
    };
    this.$refs.music.onended = () => {
      this.togglePt(0);
      if (this.curIndex >= this.list.length - 1) {
        return;
      }
      this.$store.dispatch("music/loadMusicUrl", this.list[this.curIndex + 1]);
      this.$store.commit("music/updatePt", 0);
      this.$store.commit("playMusicList/updateIndex", this.curIndex + 1);
      this.$store.commit("music/updatePlay", true);
      setTimeout(() => {
        this.playmusic();
      }, 1000);
      // this.$store.commit("music/updatePt", 0);
      // this.$store.commit("music/updatePlay", false);
    };
  },
  created() {
    // if (document.documentElement.clientWidth > 1000) {
    //   location.href = "http://www.eveal.cn:3000";
    // }
    // window.onresize = function () {
    //   if (document.documentElement.clientWidth > 1000) {
    //     location.href = "http://www.eveal.cn:3000";
    //   }
    // };
    this.$store.dispatch("music/loadMusicUrl", 1441758494);
    this.$store.dispatch("user/loadUserInfo");
    this.$store.dispatch("user/loadPlayList");
  },
};
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/font_2053859_strl3m7ovyi.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

@keyframes music {
  0% {
    border: 1px maroon solid;
    transform: scale(1);
    opacity: 1;
  }
  100% {
    border: 1px maroon solid;
    transform: scale(1.5);
    opacity: 0;
  }
}
@keyframes changeright {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.content {
  width: 100%;
  position: absolute;
  top: 120px;
  bottom: 148px;
  overflow: hidden;
}
.page {
  width: 100%;
  position: absolute;
  top: 120px;
  bottom: 148px;
}
html {
  touch-action: none;
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
        .active {
          font-weight: bold;
          color: #242424;
        }
      }
    }
  }
  .music {
    width: 100%;
    height: 148px;
    padding: 20px 10px;
    border-top: 1px #ccc solid;
    position: fixed;
    bottom: 0;
    left: 0;
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
      margin-right: 40px;
      display: flex;
      justify-content: space-around;
      color: #7d7f7e;
      align-items: center;

      width: 200px;
      .cor {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 60px;
        position: relative;
        i {
          position: absolute;
          display: block;
          width: 30px;
          height: 30px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          font-size: 28px;
        }
      }
      i {
        font-size: 60px;
      }
    }
  }
}
</style>
