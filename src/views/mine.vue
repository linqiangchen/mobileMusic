<template>
  <iscroll-view class="content" @scrollStart="log" @pullUp="load">
    <div class="mine">
      <header class="header">
        <img :src="userAvatr" alt />
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
        <img :src="like.coverImgUrl" alt />
        <div class="info">
          <h3>我喜欢的音乐</h3>
          <span>{{like.trackCount}} 首</span>
        </div>
        <p>
          <i class="iconfont icon-Group"></i>
          <span>心动模式</span>
        </p>
      </div>
      <div class="playlist">
        <ul>
          <li :class="{active:showlistId }" @click="toggle(true)" >创建歌单</li>
          <li  :class="{active:!showlistId }" @click="toggle(false)">收藏歌单</li>
          <li>歌单助手</li>
        </ul>
      </div>
      <div class="playlist-list">
        <div class="title">
          <span>创建歌单(6个)</span>
          <div class="icon">
            <i class="iconfont icon-jia1"></i>
            <i class="iconfont icon-dian"></i>
          </div>
        </div>
        <ul>
          <li v-for="item in showList" :key="item.id" @click="loadPlayList(item.id)">
            <img :src="item.coverImgUrl" alt />
            <div>
              <h3>{{item.name}}</h3>
              <p>{{item.trackCount}}首</p>
            </div>
            <i class="iconfont icon-dian"></i>
          </li>
        </ul>
      </div>
    </div>
  </iscroll-view>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("user/loadUserInfo");
    this.$store.dispatch("user/loadPlayList");
  },
  beforeCreate() {},
  data() {
    return {
      img:
        "http://p1.music.126.net/bBQWBSSAqkpGU0sXikON2w==/109951164089165894.jpg",
      count: 0,
      showList:"",
      showlistId:true
    };
  },
  created() {

    this.showList = this.playlist
  },
  mounted(){
   this.showList = this.playlist
  },
  methods: {
    load() {},
    log(e) {
      e.refresh();
    },
    loadPlayList(id){
      this.$store.dispatch('playList/loadPlayList',id)
    },
    toggle(id){
     this.showlistId = id
      this.showList = this.showlistId ? this.playlist: this.postlist
    }
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.userName,
      userAvatr: (state) => state.user.userAvatr,
      playlist: (state) => state.user.playList,
      like: (state) => state.user.like,
      postlist: (state) => state.user.postPlayList,
    }),
  },
  watch: {
    "this.playlist": {
      handler(newVal, oldVal) {
       console.log(11111);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.mine {
  font-size: 0.16rem;
  padding: 40px 40px 0;

  background-image: linear-gradient(#cdc9c8, #fff);
}
.header {
  margin-top: 40px;
  height: 154px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    height: 100%;
    border-radius: 50%;
  }
  .user {
    flex: 1;
    text-align: left;
    padding: 0 30px;
    p {
      color: #292929;
      font-size: 48px;
    }
    span {
      display: inline-block;
      border-radius: 23px;
      background-color: #fff;
      color: #444444;
      margin: 6px 0;
      width: 100px;
      height: 46px;
      font-size: 26px;
      text-align: center;
      line-height: 46px;
      font-style: italic;
    }
  }
  .iconfont {
    display: block;
    font-size: 36px;
  }
}
.navlist {
  width: 100%;
  margin-top: 40px;
  height: 470px;
  border-radius: 40px;
  background-color: #fff;
  box-shadow: 20px 20px 10px #ccc;
  ul {
    display: flex;

    flex-wrap: wrap;

    li {
      width: 25%;
      display: flex;
      height: 235px;
      flex-direction: column;
      justify-content: center;
      i {
        color: #fe4a3c;
        font-size: 80px;
      }
      p {
        font-size: 40px;
        color: #b1b1b1;
        margin-top: 24px;
      }
    }
  }
}
.myLike {
  display: flex;
  margin-top: 60px;
  justify-content: space-between;
  align-items: center;
  height: 246px;
  padding: 0 54px;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 20px 20px 10px #ccc;
  img {
    width: 150px;
    border-radius: 20px;
  }
  .info {
    flex: 1;
    text-align: left;
    padding: 0 0.1rem;
    h3 {
      font-weight: normal;
      color: #333;
      font-size: 42px;
    }
    span {
      color: #666;
      font-size: 34px;
    }
  }
  p {
    border: 1px #333 solid;
    width: 244px;
    height: 72px;
    color: #333;
    border-radius: 36px;
    line-height: 72px;
    display: flex;
    font-size: 34px;
    justify-content: center;
    align-items: center;

    span {
      margin: 0 10px;
    }
    .iconfont {
      font-size: 40px;
    }
  }
}
.playlist {
  width: 100%;
  margin-top: 40px;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 46px;
    color: #333;
    li {
      padding: 20px 10px;
    }
    .active {
      position: relative;
    }
    .active::before {
      content: "";
      display: block;
      height: 8px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 4px;
      background-color: #fe3a3b;
    }
  }
}
.playlist-list {
  
  width: 100%;
  padding: 50px;
  background-color: #fff;
  border-radius: 40px;
  margin-top: 40px;
  .title {
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #b3b3b3;
    .icon {
      width: 140px;
      display: flex;
      i {
        font-size: 54px;
      }
      justify-content: space-between;
      align-items: center;
    }
  }
  ul {
    margin-top: 20px;
    li {
      margin: 25px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #b3b3b3;
      img {
        width: 150px;
        border-radius: 20px;
      }
      div {
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
          flex: 1;
        text-align: left;
        h3 {
          width: 100%;
          font-size: 45px;
          color: #333;
          font-weight: normal;
          margin: 10px 0;
           overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        }
        p {
          font-size: 30px;
        } 
      }
      i {
        font-size: 54px;
      }
    }
  }
}
</style>