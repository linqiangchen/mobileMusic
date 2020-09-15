<template>
  <div class="home page" id="playListTag">
    <div class="header">
      <i class="iconfont icon-zuo" @click="$router.replace('/')"></i>
      <p>
        <span class="songName">歌手</span>
      </p>
    </div>
    <iscroll-view class="singerCat" @scrollStart="log" ref="singerCat">
      <div>
        <ul>
          <li
            v-for="(item , index) in navlist"
            :key="item.path"
            :class="{active:selectCat === index}"
            @click="handlePathByCat(index)"
          >{{item.title}}</li>
        </ul>
      </div>
    </iscroll-view>
    <iscroll-view class="singerCat" @scrollStart="log" ref="singerName">
      <div>
        <ul>
          <li
            v-for="(item , index) in nameLetter"
            :key="item"
            :class="{active:selectLetter === index}"
            @click="handlePathByLetter(index)"
          >{{item}}</li>
        </ul>
      </div>
    </iscroll-view>
    <iscroll-view class="content" @scrollStart="log"  @pullUp="load" @pullDown="refresh">
      <div>
        <ul class="singer">
          <li v-for="item in singer" :key="item.id" @click="toSinger(item.id)">
            <img v-lazy="handleImg(item.picUrl)" alt />
            <span>{{item.name}}</span>
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
  name: "singer",
  components: {},
  inject: ["playMusic", "pauseMusic"],
  data() {
    return {
      nameLetter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      selectCat: 1,
      selectLetter: -1,
      navlist: [
        {
          title: "全部",
          path: "/artist/list?type=-1&area=-1",
        },
        {
          title: "热门",
          path: "/top/artists?offset=0",
        },
        {
          title: "华语男",
          path: "/artist/list?type=1&area=7",
        },
        {
          title: "华语女",
          path: "/artist/list?type=2&area=7",
        },
        {
          title: "华语乐队",
          path: "/artist/list?type=3&area=7",
        },
        {
          title: "欧美男",
          path: "/artist/list?type=1&area=96",
        },
        {
          title: "欧美女",
          path: "/artist/list?type=2&area=96",
        },
        {
          title: "欧美乐队",
          path: "/artist/list?type=3&area=96",
        },
        {
          title: "日本男",
          path: "/artist/list?type=1&area=8",
        },
        {
          title: "日本女",
          path: "/artist/list?type=2&area=8",
        },
        {
          title: "日本乐队",
          path: "/artist/list?type=3&area=8",
        },
        {
          title: "韩国男",
          path: "/artist/list?type=1&area=16",
        },
        {
          title: "韩国女",
          path: "/artist/list?type=2&area=16",
        },
        {
          title: "韩国乐队",
          path: "/artist/list?type=3&area=16",
        },
        {
          title: "其他男",
          path: "/artist/list?type=1&area=0",
        },
        {
          title: "其他女",
          path: "/artist/list?type=2&area=0",
        },
        {
          title: "其他乐队",
          path: "/artist/list?type=3&area=0",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      singer: (state) => state.recommend.singer,
      loadSinger: (state) => state.recommend.loadSinger,
    }),
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.singerCat.iscroll.options.scrollX = true;
      this.$refs.singerName.iscroll.options.scrollX = true;
    });
  },
  created() {
    this.$store.dispatch(
      "recommend/loadSinger",
      this.navlist[this.selectCat].path
    );
  },
  watch: {
    loadSinger(newVal) {
      if (newVal) {
        this.$showLoading();
        // this.$refs.iscroll.scrollTo(0,0,0)
      } else {
        this.$hideLoading();
      }
    },
  },
  methods: {
    load(){
      console.log('loading.....');
    },
    refresh(){
       console.log('refresh.....');
    },
    handlePathByCat(index) {
      this.selectCat = index;
      if (this.selectLetter === -1) {
        this.$store.dispatch(
          "recommend/loadSinger",
          this.navlist[this.selectCat].path
        );
      } else {
        this.$store.dispatch(
          "recommend/loadSinger",
          this.navlist[this.selectCat].path +
            `&initial=${this.nameLetter[this.selectLetter]}`
        );
      }
    },
    handleImg(url){
      return url + '?param=200x200'
    },
    handlePathByLetter(index) {
      this.selectLetter = index;
      this.$store.dispatch(
        "recommend/loadSinger",
        this.navlist[this.selectCat].path +
          `&initial=${this.nameLetter[this.selectLetter]}`
      );
    },
    select(path) {
      this.$store.dispatch("recommend/loadPlayList", path);
      this.$router.push("/playListPlaza");
    },
    log(e){
       e.refresh();
    },
    toSinger(id) {
      this.$store.dispatch("recommend/loadSingerMusic", id);
      this.$router.replace("/singerMusic");
    },
  
  },
};
</script>
<style lang="scss" scoped>
#playListTag {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  padding: 0 45px;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 280px;
  bottom: 150px;
}
.header {
  display: flex;
  align-items: center;
  height: 120px;
  font-size: 50px;
  color: #282c2f;

  i {
    font-size: 50px;
    margin-right: 60px;
  }
}
.active {
  color: maroon;
}
.singerCat {
  height: 80px;
  width: 100%;
  overflow: hidden;

  div {
    width: max-content;
  }
  ul {
    // width: max-content;
    height: 80px;
    overflow: hidden;
    li {
      height: 80px;
      line-height: 80px;
      float: left;
      width: 200px;
    }
  }
}
.singer {
  padding-bottom: 30px;
  li {
    display: flex;
    align-items: center;
    margin: 40px 0;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    span {
      font-size: 45px;
      color: #333;
      margin-left: 40px;
    }
  }
}
</style>

<style >
</style>
