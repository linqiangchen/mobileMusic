<template>
  <div class="home page">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="( item ,index) in banner" :key="index">
        <img :src="item" alt />
      </van-swipe-item>
    </van-swipe>
    <van-tabs class="tab">
      <van-tab v-for=" item  in navlist " :key="item.path" :title="item.title">
        <span @click="$router.push('/playListPlaza')">{{item.title }}</span>
      </van-tab>
    </van-tabs>
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
          title: "每日推荐",
          path: "/day",
        },
        {
          icon: "111",
          title: "私人FM",
          path: "/FM",
        },
        {
          icon: "111",
          title: "歌单",
          path: "/playlist",
        },
        {
          icon: "111",
          title: "排行榜",
          path: "/rist",
        },
        {
          icon: "111",
          title: "直播",
          path: "/46456",
        },
        {
          icon: "111",
          title: "电台",
          path: "/65464",
        },
      ],
    };
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
      postlist: (state) => state.user.postPlayList,
       trackIds: (state) => state.playList.trackIds,
    }),
  },
};
</script>
<style lang="scss" scoped>
.home {
  font-size: 0.16rem;
}
.tab,
.van-tab {
  font-size: 36px !important;
}
.my-swipe {
  height: 370px;
  margin: 30px 0;
}
.my-swipe .van-swipe-item {
  padding: 0 0.1rem;
  overflow: hidden;
  img {
    border-radius: 40px;
    height: 100%;
  }
}
</style>

<style >
.van-swipe__indicator {
  width: 16px;
  height: 16px;
}
</style>
