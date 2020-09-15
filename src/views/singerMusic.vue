<template>
  <div class="home page" id="playList">
    <div class="bgImg">
      <img :src="singerInfo.picUrl" alt />
      <div class="header">
        <div class="left">
          <i class="iconfont icon-zuo" @click="$router.push('/singer')"></i>
          <span>歌手</span>
        </div>
        <div class="right">
          <i class="iconfont icon-SHARE"></i>
          <i class="iconfont icon-dian"></i>
        </div>
      </div>
      <div class="bot">
        <p>{{singerInfo.name}}</p>
        <div>
          <p class="fir">
            <i class="iconfont icon-jia1"></i>
            <span>关注</span>
          </p>
          <p class="send">
            <i class="iconfont icon-message"></i>
            <span>发私信</span>
          </p>
        </div>
      </div>
    </div>
    <div class="animate__animated animate__zoomOutDown ani" :style="style" v-if="isAni">
      <i class="iconfont icon-yinyue"></i>
    </div>
    <div class="tit">
      <div class="left">
        <i class="iconfont icon-shipin"></i>
        <p>
          <span>播放全部</span>
        </p>
      </div>
      <div class="right">
        <i class="iconfont icon-jiarushoucang"></i>
      </div>
    </div>
    <iscroll-view class="pl-content" @scrollStart="log" ref="iscroll">
      <div>
        <ul>
          <li
            v-for="(item , index) in singerMusic"
            :key="item.id"
            @click="playMyMusic(item.id,index,$event)"
          >
            <p class="_w">{{index+1}}</p>
            <div>
              <p class="name">{{item.name}}</p>
              <p class="user">{{item.artists}} - {{item.album}}</p>
            </div>
            <p class="_w">
              <i class="iconfont icon-shipin"></i>
            </p>
            <p class="_w">
              <i class="iconfont icon-sangedian"></i>
            </p>
          </li>
        </ul>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "singerMusic",
  components: {},
  inject: ["playMusic", "pauseMusic"],
  data() {
    return {
      banner: [],
      active: true,
      isAni: false,
      style: {
        top: 0,
        left: 0,
      },
    };
  },
  computed: {
    ...mapState({
      singerMusic: (state) => state.recommend.singerMusic,
      singerInfo: (state) => state.recommend.singerInfo,
      loadSingerMusic:(state) => state.recommend.loadSingerMusic,
    }),
  },
  created() {
    // this.$store.dispatch("recommend/loadSingerMusic", 5781);
  },
  watch:{
    loadSingerMusic(newVal){
      if(newVal){
        this.$showLoading()
  this.$refs.iscroll.scrollTo(0,0,0)
        
      }else{
        this.$hideLoading()
      }
    }
  },
  methods: {
    toggleDate(time) {
      //加载评论时间
      let date = new Date(time);
      let year = date.getFullYear();
      let mouth = this.add(date.getMonth() + 1);
      let day = this.add(date.getDate());
      return year + "年" + mouth + "月" + day + "日";
    },
    playMyMusic(id, index, e) {
      this.isAni = true;
      this.style = {
        top: e.clientY - 40 + "px",
        left: e.clientX - 40 + "px",
      };
      setTimeout(() => {
        this.isAni = false;
      }, 1000);
      this.$store.dispatch("music/loadMusicUrl", id);
      //   this.$store.commit("music/updatePt", 0);
      this.$store.commit("music/updatePlay", true);
      this.$store.commit("playMusicList/updateList", {
        listName: this.name,
        list: this.singerMusic.map(item => item.id),
        index,
      });
      setTimeout(() => {
        this.playMusic();
      }, 1000);
    },
    toggle(bool) {
      this.active = bool;
    },
    load() {},
    log(e) {
      e.refresh();
    },
    add(str) {
      //补零
      return str < 10 ? "0" + str : str;
    },
  },
};
</script>
<style lang="scss" scoped>
#playList {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #95939e;
}
.bgImg {
  position: relative;
  height: 800px;
  img {
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    z-index: -1;
  }
}
.bot {
  display: flex;
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 54px;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(rgba(255, 255, 255, 0) rgba(110, 110, 110, 0.4));
  p {
    font-size: 45px;
  }
  div {
    width: max-content;
    font-size: 40px;
    display: flex;
    p {
      height: 90px;
      border-radius: 45px;
    }
    .fir {
      color: #fff;
      width: 175px;
      line-height: 90px;
      font-size: 35px;
      background-color: #fe3a3b;
      i {
        font-size: 35px;
        margin-right: 10px;
      }
    }
    .send {
      color: #fff;
      width: 210px;
      line-height: 90px;
      font-size: 35px;
      background-color: #6b6766;
    margin-left: 20px;
      i {
        font-size: 35px;
        margin-right: 10px;
      }
    }

  }
}
.header {
  color: #fff;

  background: linear-gradient(rgba(110, 110, 110, 0.4), rgba(255, 255, 255, 0));
  display: flex;
  padding: 100px 50px;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  font-size: 54px;
  color: #fff;
  div {
    width: 265px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  i {
    font-size: 54px;
  }
}

.ani {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  z-index: 1000;

  i {
    font-size: 80px;
    color: maroon;
  }
}
.pl-content {
  width: 100%;
  position: absolute;
  top: 800px;
  bottom: 0;
  background-color: #fff;
  border-radius: 80px 80px 0 0;
  overflow: hidden;
  ul {
    padding-top: 100px;
    padding-bottom: 150px;
    li {
      display: flex;
      padding: 0 30px;
      justify-content: space-between;
      align-items: center;
      margin: 30px 0;
      line-height: 60px;
      div {
        flex: 1;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .name {
          width: 100%;
          font-size: 43px;
          color: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .user {
          width: 100%;
          color: #b3b3b3;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      ._w {
        font-size: 50px;
        color: #b3b3b3;
        i {
          font-size: 50px;
        }
        width: 100px;
        height: 65px;
      }
    }
  }
}
.tit {
  border-radius: 80px 80px 0 0;
  position: absolute;
  background-color: #fff;
  top: 800px;
  height: 100px;
  font-size: 45px;
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
  align-items: center;
  z-index: 100;
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    color: #646464;
    p {
      margin-left: 20px;
    }
    .iconfont {
      color: #646464;
      font-size: 45px;
    }
    i {
      font-size: 40px;
      color: #999999;
      font-style: normal;
    }
  }
  .right {
    color: #999999;
    span {
      font-size: 40px;
    }
    i {
      margin-right: 20px;
      font-size: 50px;
      color: #999999;
      font-style: normal;
    }
  }
  i {
    font-size: 50px;
  }
}
</style>

<style >
</style>
