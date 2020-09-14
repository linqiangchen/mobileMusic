<template>
  <div class="home page" id="playListPlaza">
    <div class="header">
      <i class="iconfont icon-zuo" @click="$router.replace('/')"></i>
      <p>
        <span class="songName">歌单广场</span>
      </p>
    </div>
    <div class="navlist">
      <ul>
        <li
          v-for="(item ,index) in navlist"
          :key="item.path"
          :class="{active:active === index}"
          @click="toggle(index)"
        >{{item.title}}</li>
        <li>
          <i class="iconfont icon-guangchang" @click="$router.replace('/playlistTag')"></i>
        </li>
      </ul>
    </div>
    <iscroll-view class="content" @scrollStart="log">
      <div>
        <div class="swiper-container" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in topPlaylist" :key="item.coverImgUrl" @click="loadPlayList(item.id)">
              <img :src="item.coverImgUrl" alt />
              <p>{{item.name}}</p>
              <div class="coun">
                <i class="iconfont icon-bofang1"></i>

                <span>{{change(item.playCount)}}</span>
              </div>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>

        <ul class="list">
          <li class="" v-for="item in nextPlaylist" :key="item.id" @click="loadPlayList(item.id)">
            <img v-lazy="item.coverImgUrl" alt />
            <p>{{item.name}}</p>
            <div class="coun">
              <i class="iconfont icon-bofang1"></i>

              <span>{{change(item.playCount)}}</span>
            </div>
          </li>
        </ul>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Tab, Tabs } from "vant";
import { mapState } from "vuex";

Vue.use(Tab);
Vue.use(Tabs);
import axios from "axios";
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  name: "Home",
  components: {},
  data() {
    return {
      navlist: [
        {
          icon: "111",
          title: "推荐",
          path: "",
        },
        {
          icon: "111",
          title: "官方",
          path: "?cat=官方",
        },
        {
          icon: "111",
          title: "精品",
          path: "/highquality",
        },
        {
          icon: "111",
          title: "华语",
          path: "?cat=华语",
        },
        {
          icon: "111",
          title: "流行",
          path: "?cat=流行",
        },
      ],
      active: 0,
    };
  },
  mounted() {},
  watch: {
    playlist(newVal) {
      this.$nextTick(() => {
          if(this.swiper){
              this.swiper.update()
          }else{
              this.swiper =  new Swiper(this.$refs.swiper, {
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: "auto",
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },

        });
       
          }
        this.swiper.slideTo(1)
        
      });
    },
  },
  created() {
    this.$store.dispatch("recommend/loadBanner");
    this.$store.dispatch("recommend/loadPlayList");
  },
  computed: {
    ...mapState({
      banner: (state) => state.recommend.banner,
      userAvatr: (state) => state.user.userAvatr,
      playlist: (state) => state.user.playList,
      like: (state) => state.user.like,
      playlist: (state) => state.recommend.playlist,
      trackIds: (state) => state.playList.trackIds,
      playCount: (state) => state.recommend.playCount,
    }),
    topPlaylist() {
      return this.playlist.slice(0, 8);
    },
    nextPlaylist() {
      return this.playlist.slice( 8);
    },
  },
  methods: {
    log(e) {
      e.refresh();
    },
      loadPlayList(id){
      this.$router.push('/playList')
      this.$store.dispatch('playList/loadPlayList',id)
    },
    change(num){
        if(num>10000){
            return parseInt(num/10000) + '万'
        }else{
            return num
        }
    },
    toggle(index) {
      this.active = index;
      this.$store.dispatch("recommend/loadPlayList",this.navlist[index].path);
    },
  },
};
</script>
<style lang="scss" scoped>
#playListPlaza {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;

  background-color: #fff;
}
.content {
  position: absolute;
  top: 240px;
  bottom: 150px;
}
.header {
  display: flex;
  align-items: center;
  height: 120px;
  font-size: 50px;
  color: #282c2f;
  padding: 0 45px;
  i {
    font-size: 50px;
    margin-right: 60px;
  }
}
.navlist {
  ul {
    display: flex;
    padding: 0 45px;
    justify-content: space-between;
    font-size: 40px;
    color: #707475;
    height: 120px;
    align-items: center;
    border-bottom: 1px #707475 solid;
    li {
      height: 120px;
      line-height: 120px;
      i{
          font-size: 40px;
      }
    }
    .active {
      color: #fe3a3b;
      position: relative;
    }
    .active::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background-color: #fe3a3b;
      bottom: 0;
    }
  }
}
.list {
    // margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  li {
      margin: 40px 0;
    width: 33.3%;
    position: relative;
   padding: 0 20px;
    
    overflow: hidden;
  
    img{
        width: 310px;
        border-radius: 20px;
    }
     p {
    text-align: left;
    font-size: 35px;
    color: #333;
    line-height: 45px;
    padding: 10px;
  }
  .coun {
    position: absolute;
     padding: 0 10px;
    padding-right: 20px;
    height: 70px;
    line-height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 80%;
    top: 0px;
    right: 30px;
    color: #fff;
     border-radius: 20px;
    background: linear-gradient(
      rgba(110, 110, 110, 0.4),
      rgba(255, 255, 255, 0)
    );
    i {
      margin-right: 10px;
    }
  }
  }
}
</style>

<style lang="scss">
.swiper-wrapper {
  width: 100%;
  margin-top: 60px;
  padding: 10px 0;
  margin-bottom: 40px;
}

.swiper-slide {
  background-color: #fff;
  position: relative;
  width: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 5px 2px #ccc;
  img {
    width: 400px;
    height: 400px;
  }
  p {
    text-align: left;
    font-size: 35px;
    color: #aba9aa;
    line-height: 45px;
    padding: 10px;
  }
  .coun {
    position: absolute;
    padding-right: 30px;
    height: 70px;
    line-height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    top: 0px;
    right: 0;
    color: #fff;
    background: linear-gradient(
      rgba(110, 110, 110, 0.4),
      rgba(255, 255, 255, 0)
    );
    i {
      margin-right: 10px;
    }
  }
}
.swiper-slide-active {
  p {
    color: #333;
  }
}
</style>
