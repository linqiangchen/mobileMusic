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
      <van-slider v-model="value" bar-height="4px" active-color="#ee0a24" />
    </div>

    <div class="footer">
      <div class="dt">
        <span>00:10</span>
        <van-slider v-model="value" bar-height="4px" active-color="#ee0a24" />
        <span>02:53</span>
      </div>
      <div class="musicCor">
        <i class="iconfont icon-xin"></i>
        <i class="iconfont icon-shangyishou"></i>
        <i class="iconfont icon-bofang3 btn"></i>
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
      value: 10,
    };
  },
  computed: {
    ...mapState({
      musicUrl: (state) => state.music.musicUrl,
      musicImg: (state) => state.music.musicImg,
      musicName: (state) => state.music.musicName,
      musicSonger: (state) => state.music.musicSonger,
      musicDt: (state) => state.music.musicDt,
    }),
  },
};
</script>

<style scoped lang="scss">
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
    .songName {
      color: #333;
      font-size: 42px;
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