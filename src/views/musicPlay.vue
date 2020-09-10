<template>
  <div class="detail">
    <div class="header">
      <i class="iconfont icon-zuo" @click="$router.back()"></i>
      <p>
        <span class="songName">{{musicName}}</span>
        <span>{{musicSonger}}</span>
      </p>
      <i class="iconfont icon-SHARE"></i>
    </div>
    <div class="voices">
      <i class="iconfont icon-yinliang"></i>
      <van-slider
        v-model="value"
        bar-height="4px"
        :min="0"
        :max="1"
        :step="0.1"
        active-color="#ee0a24"
      />
    </div>
    <div class="lrc">
      <iscroll-view class="content" @scrollStart="log" @pullUp="load">
        <ul>
          <li v-for="item in musicLrc" :key="item.id">{{item.c}}</li>
        </ul>
      </iscroll-view>
    </div>
    <div class="footer">
      <div class="dt">
        <span>{{curTime}}</span>
        <div class="line" ref="line">
          <div class="cover" :style="{width:coverWidth}">
            <div class="bar"></div>
          </div>
        </div>
        <span>{{endTime}}</span>
      </div>
      <div class="musicCor">
        <i class="iconfont icon-xin"></i>
        <i class="iconfont icon-shangyishou"></i>
        <i class="iconfont btn" :class="icon" @click="play"></i>
        <i class="iconfont icon-xiayishou"></i>
        <i class="iconfont icon-gedan"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
import { mapState } from "vuex";

import { Slider } from "vant";

Vue.use(Slider);
Vue.use(NavBar);
export default {
  data() {
    return {
      value: 0.5,
      width: "",
      icon: "icon-shipin",
    };
  },
  inject: ["playMusic", "pauseMusic"],
  computed: {
    ...mapState({
      musicUrl: (state) => state.music.musicUrl,
      musicImg: (state) => state.music.musicImg,
      musicName: (state) => state.music.musicName,
      musicSonger: (state) => state.music.musicSonger,
      musicDt: (state) => state.music.musicDt,
      musicLyric: (state) => state.music.musicLyric,
      isplay: (state) => state.music.isPlay,
      pt: (state) => state.music.pt,
    }),
    curTime() {
      return this.min(this.pt * 1000);
    },
    endTime() {
      return this.min(this.musicDt);
    },
    coverWidth() {
      return (this.pt * 100 * this.width) / this.musicDt + "%";
    },
    musicLrc() {
      return this.musicLyric ? this.musicLyric.ms : [{ c: "暂无歌词" }];
    },
    mounted() {
      this.width = this.$refs.line.offsetWidth;
    },
  },

  watch: {
    isplay: function (newVal) {
      console.log(111);
      this.icon = newVal ? "icon-bofang3" : "icon-shipin";
    },
  },
  methods: {
    load() {},
    log(e) {
      e.refresh();
    },
    add(str) {
      //补零
      return str < 10 ? "0" + str : str;
    },
    min(s) {
      //毫秒转换为分秒
      s = parseInt(s);
      let mins = this.add(parseInt(s / 60000));
      let _s = this.add(parseInt((s % 60000) / 1000));
      return mins + ":" + _s;
    },
    play() {
      this.$store.commit("music/updatePlay", !this.isplay);
      if (this.isplay) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 1000px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  li {
    font-size: 42px;
    color: #666;
    line-height: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.detail {
  position: fixed;
  padding: 0 54px;
  top: 0;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 1000;
  background-color: #8ec5fc;
  background-image: linear-gradient(155deg, #8ec5fc 0%, #e0c3fc 100%);
  background-image: -webkit-linear-gradient(155deg, #8ec5fc 0%, #e0c3fc 100%);
  background-image: -moz-linear-gradient(155deg, #8ec5fc 0%, #e0c3fc 100%);
  background-image: -o-linear-gradient(155deg, #8ec5fc 0%, #e0c3fc 100%);
}
.header {
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #444;
  p {
    padding: 0 54px;
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .songName {
      color: #333;
      font-size: 42px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: 1;
    }
    span {
      font-size: 36px;
      color: #666;
    }
  }
  i {
    font-size: 70px;
  }
}
.voices {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 40px;
    color: #444;
    margin-right: 40px;
  }
}
.footer {
  padding: 0 54px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  left: 0;
  .line {
    background-color: #fff;
    height: 4px;
    border-radius: 5px;
    flex: 1;

    .cover {
      //   width: 20%;
      background-color: #8ec5fc;
      height: 8px;
      position: relative;
      .bar {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        right: -12px;
        transform: translateY(-50%);

        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0.00926rem 0.01852rem rgba(0, 0, 0, 0.5);
      }
    }
  }
  height: 260px;
  .dt {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 20px;
      color: #444;
      margin: 0 20px;
    }
  }
  .musicCor {
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      color: #444;
      font-size: 72px;
    }
    .btn {
      font-size: 142px;
    }
  }
}
</style>