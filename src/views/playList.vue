<template>
  <div class="home page" id="playList">
    <div class="bg" v-imgBlur="coverImgUrl" b-key="1">
  
      <div class="con">
        <div class="header">
          <div class="left">
            <i class="iconfont icon-zuo" @click="$router.back()"></i>
            <span>歌单</span>
          </div>
          <div class="right">
            <i class="iconfont icon-fangdajing"></i>
            <i class="iconfont icon-dian"></i>
          </div>
        </div>
        <div class="info">
          <img :src="coverImgUrl" alt />
          <div class="py">
            <h2>{{name}}</h2>
            <div class="user">
              <img :src="creator.avatarUrl" alt />
              <span>{{creator.creatorName}}</span>
            </div>
            <p>{{description}}</p>
          </div>
        </div>

        <div class="op">
          <ul>
            <li>
              <i class="iconfont icon-pinglun"></i>
              <span>207</span>
            </li>
            <li>
              <i class="iconfont icon-SHARE"></i>
              <span>207</span>
            </li>
            <li>
              <i class="iconfont icon-xiazai"></i>
              <span>下载</span>
            </li>
            <li>
              <i class="iconfont icon-duoxuan"></i>
              <span>多选</span>
            </li>
          </ul>
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
          <span>播放全部 </span>
          <i>(共{{trackCount}}首)</i>
        </p>
      </div>
      <div class="right">
        <i class="iconfont icon-jiarushoucang"></i>
        <span>{{change(playCount)}}</span>
      </div>
    </div>
    <iscroll-view class="pl-content" @scrollStart="log" ref="iscroll">
      <div>
        <ul>
          <li
            v-for="(item , index) in songsInfo"
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
import { mapState,mapGetters} from "vuex";
export default {
  name: "playList",
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
      coverImgUrl: (state) => state.playList.coverImg,
      description: (state) => state.playList.description,
      name: (state) => state.playList.name,
      playCount: (state) => state.playList.playCount,
      playListImg: (state) => state.playList.playListImg,
      creator: (state) => state.playList.creator,
      songsInfo: (state) => state.playList.songsInfo,
      trackCount: (state) => state.playList.trackCount,
      playCount: (state) => state.playList.playCount,
      trackIds: (state) => state.playList.trackIds,
    }),
    ...mapGetters({
      loading: 'playList/loading'
    }),
    showComList() {
      return this.active ? this.musicHotComment : this.musicComment;
    },
  },
  created() {},
  watch:{
    loading(newVal){
      if(newVal){
        this.$showLoading()
        this.$refs.iscroll.scrollTo(0,0,0)
        console.log('this.$refs.iscroll: ', this.$refs.iscroll);
      }else{
        this.$hideLoading()
      }
    }
  },
  methods: {
    change(num){
        if(num>10000 && num<100000000){
            return parseInt(num/10000) + '万'
        }else if(num>=100000000){
            return parseInt(num/100000000) + '亿'
        }else{
          return num
        }
    },
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
        list: this.trackIds,
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
.showImg{
   background-size: cover;
    filter: blur(100px);
  height: 100%;
}
.bg {
  height: 900px;
 
  position: relative;
}
.con {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
// .mask {
//   position: absolute;
//   width: 100%;
//   top: 0;
//   bottom: 0;
//   background: rgba(0,0,0,.5);
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
//   background-blend-mode: multiply;

//   filter: blur(0px);
// }
.header {
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
.info {
  width: 100%;
  height: 380px;
  padding: 0 50px;
  display: flex;
  color: #fff;
  text-align: left;

  img {
    width: 380px;
    height: 380px;
    border-radius: 20px;
    margin-right: 20px;
  }
  .py {
    
    display: flex;
    
    flex-direction: column;
    justify-content: space-between;

    h2 {
      font-size: 50px;
      font-weight: normal;
    }
    p {
      font-size: 32px;
      color: #d4d5da;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .user {
      display: flex;
      align-items: center;
      font-size: 34px;
      color: #ebebed;
      img {
        margin-right: 20px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
  }
}
.op {
  ul {
    display: flex;
    justify-content: space-around;
    padding: 52px 0;
    li {
      display: flex;
      flex-direction: column;
      i {
        font-size: 60px;
        color: #fff;
        margin: 10px 0;
      }
      span {
        font-size: 32px;
        color: #e0e1e5;
      }
    }
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
