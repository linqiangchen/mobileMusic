<template>
  <div class="detail" @click.self="toggleShow">
    <div>
      <div class="header">
        <i class="iconfont icon-zuo" @click="$router.back()"></i>
        <p>
          <span class="songName">{{musicName}}</span>
          <span>{{musicSonger}}</span>
        </p>
        <i class="iconfont icon-SHARE" @click="showShare = true"></i>
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
      <div class="lrc" @click.self="toggleShow">
        <iscroll-view
          class="content"
          @scrollStart="start"
          @scrollEnd="end"
          @pullUp="load"
          ref="iscroll"
          @click.self="toggleShow"
        >
          <ul v-show="!showImg" @click.self="toggleShow">
            <li
              v-for="(item ,index) in musicLrc"
              :key="item.id"
              :class="{active:lrcIndex === index}"
              ref="lrc"
              @click="lrcSpeed(item.t)"
            >{{item.c}}</li>
          </ul>
        </iscroll-view>
      </div>
      <div class="musicImg" :class="{ani:isplay}" v-show="showImg" @click="toggleShow">
        <img :src="musicImg" alt class="songs-img" />
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="footer">
        <div class="musicCor fen">
          <i class="iconfont icon-xin"></i>
          <i class="iconfont icon-xiazai1"></i>
          <i class="iconfont icon-yichang"></i>
          <i class="iconfont icon-pinglun " @click="$router.push('/detail/comment')"></i>
          <i class="iconfont icon-gengduo" @click="showShare = true"></i>
        </div>
        <div class="dt">
          <span>{{curTime}}</span>
          <div class="line" ref="line" @click="speed">
            <div class="cover" :style="{width:coverWidth}">
              <div class="bar"></div>
            </div>
          </div>
          <span>{{endTime}}</span>
        </div>
        <div class="musicCor">
          <i class="iconfont icon-xin"></i>
          <i class="iconfont icon-shangyishou" @click="prev"></i>
          <i class="iconfont btn" :class="icon" @click="play"></i>
          <i class="iconfont icon-xiayishou" @click="next"></i>
          <i class="iconfont icon-gedan"></i>
        </div>
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
      </div>
    </div>
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
   
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
      value: this.$parent.$refs.music.volume,
      width: "",
      icon: "icon-shipin",
      lrcIndex: 0,
      lrcHeight: 0,
      lrcScroll: true,
      timer: "",
      iScroll: null,
      showImg: false,
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  inject: ["playMusic", "pauseMusic", "pt", "togglePt"],
  computed: {
    ...mapState({
      musicUrl: (state) => state.music.musicUrl,
      musicImg: (state) => state.music.musicImg,
      musicName: (state) => state.music.musicName,
      musicSonger: (state) => state.music.musicSonger,
      musicDt: (state) => state.music.musicDt,
      musicLyric: (state) => state.music.musicLyric,
      isplay: (state) => state.music.isPlay,
      isplay: (state) => state.music.isPlay,
      list: (state) => state.playMusicList.list,
      curIndex: (state) => state.playMusicList.curIndex,
      // pt: (state) => state.music.pt,
    }),
    curTime() {
      return this.min(this.$parent.pt * 1000);
    },
    endTime() {
      return this.min(this.musicDt);
    },
    coverWidth() {
      return (this.$parent.pt * 100000) / this.musicDt + "%";
    },
    musicLrc() {
      return this.musicLyric
        ? this.musicLyric.ms.map((item) => ({
            c: item.c,
            t: parseFloat(item.t).toFixed(3) * 1000,
          }))
        : [{ c: "暂无歌词",t:0 }];
    },
  },
beforeRouteLeave (to, from, next) {
  // ...
  next()
},
  watch: {
    isplay: {
      handler: function (newVal) {
        this.icon = newVal ? "icon-bofang3" : "icon-shipin";
      },
      immediate: true,
    },
    musicUrl() {
      this.$refs.iscroll.scrollTo(0, 0, 300);
    },
    width() {
      this.width = this.$refs.line.offsetWidth;
    },
    "$parent.pt": {
      handler: function (newVal) {
        // if (newVal === 0 && this.iScroll) {
        //   this.$refs.iscroll.scrollTo(0, 0, 300);
        //   return;
        // }
        this.lrcIndex = this.musicLrc.findIndex((item, index, arr) => {
          if (index < arr.length - 1) {
            return (
              item.t <= parseInt(newVal * 1000) &&
              arr[index + 1].t >= parseInt(newVal * 1000)
            );
          } else {
            return false;
          }
        });

        if (this.$refs.iscroll && this.lrcScroll) {
          if (this.lrcIndex > 3) {
            if (
              -this.lrcHeight * (this.lrcIndex - 2) <=
              this.iScroll.wrapperHeight + this.iScroll.maxScrollY
            ) {
              this.$refs.iscroll.scrollTo(
                0,
                this.iScroll.wrapperHeight + this.iScroll.maxScrollY,
                300
              );
              return;
            }
      
            this.$refs.iscroll.scrollTo(
              0,
              -this.lrcHeight * (this.lrcIndex - 2),
              300
            );
          }
        }
        //
        // this.icon = newVal ? "icon-bofang3" : "icon-shipin";
      },
      immediate: true,
    },
    // '$parent.pt'(newVal){
    //   
    // },
    value(newVal) {
      this.$parent.$refs.music.volume = newVal;
    },
  },
  mounted() {
    this.lrcHeight = this.$refs.lrc[0].offsetHeight;
    this.$nextTick(() => {
      this.iScroll = this.$refs.iscroll.iscroll;
    
        this.width = this.$refs.line.offsetWidth;
      console.log('this.width: ', this.width);
      
    });
  },
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    prev(){
      if(this.curIndex >0){
       this.$store.dispatch('music/loadMusicUrl',this.list[this.curIndex-1])
             this.$store.commit('playMusicList/updateIndex', this.curIndex-1)
              this.$store.commit('music/updatePlay',true);
              setTimeout(()=>{
           this.playMusic();
         },1000)
      }
         
    },
    next(){
       if( this.curIndex>=this.list.length-1){
        return
      }
       this.$store.dispatch('music/loadMusicUrl',this.list[this.curIndex+1])
             this.$store.commit('music/updatePt', 0)
              this.$store.commit('playMusicList/updateIndex', this.curIndex+1)
              this.$store.commit('music/updatePlay',true);
              setTimeout(()=>{
           this.playMusic();
         },1000)
    },
    speed(e) {
      if (!this.isplay) {
        return;
      }
      let x = (e.clientX - this.$refs.line.offsetLeft) / this.width;
        console.log('(x * this.musicDt) / 1000: ',  this.width );
      this.$parent.$refs.music.currentTime = (x * this.musicDt) / 1000;
    
      // this.$store.commit('music/updatePt' ,x*this.musicDt/1000 )
      this.togglePt((x * this.musicDt) / 1000);
    },
    lrcSpeed(t) {
      if (!this.isplay || t == 0) {
        return;
      }
      this.togglePt(t / 1000);
      this.$parent.$refs.music.currentTime = t / 1000;
    },
    load() {},
    start(e) {
      this.lrcScroll = false;
      e.refresh();
    },
    end() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.lrcScroll = true;
      }, 3000);
    },
    toggleShow() {
      this.showImg = !this.showImg;
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
.ani {
  span {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    // border:1px maroon solid;
    border-radius: 50%;
  }
}
.ani span:nth-child(2) {
  // background-color: red;
  animation: music 3s linear infinite 0s;
}
.ani span:nth-child(3) {
  // background-color: red;
  animation: music 3s linear infinite 1s;
}
.ani span:nth-child(4) {
  // background-color: red;
  animation: music 3s linear infinite 2s;
}
.ani img {
  animation: changeright 30s linear infinite;
}
.content {
  width: 100%;
  height: 1000px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  li {
    margin: 0 auto;
    font-size: 42px;
    // width: 80%;
    color: #666;
    // padding: 0 80px;
    max-width: 80%;
    width: max-content;
    line-height: 80px;
    height: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .active {
    color: maroon;
  }
}
.musicImg {
  width: 690px;
  height: 690px;
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  img {
    width: 690px;
    height: 690px;
    border-radius: 50%;
    box-shadow: 0 0 10px maroon;
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
  background-color: #ffdee9;
  background-image: linear-gradient(291deg, #ffdee9 0%, #b5fffc 100%);
  background-image: -webkit-linear-gradient(291deg, #ffdee9 0%, #b5fffc 100%);
  background-image: -moz-linear-gradient(291deg, #ffdee9 0%, #b5fffc 100%);
  background-image: -o-linear-gradient(291deg, #ffdee9 0%, #b5fffc 100%);
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
  padding: 10px 54px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  left: 0;
  .fen {
    margin-bottom: 20px;
    font-size: 58px;
    color: #999;
  }
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
      font-size: 120px;
    }
  }
}
</style>
<style >
.van-share-sheet__icon {
  width: 72px;
  height: 72px;
  margin: 0 16px;
}
.van-share-sheet__title {
  margin-top: 8px;
  color: #323233;
  font-weight: 400;
  font-size: 41px;
  line-height: 50px;
}
</style>