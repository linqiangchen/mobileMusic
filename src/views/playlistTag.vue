<template>
  <div class="home page" id="playListTag">
    <div class="header">
      <i class="iconfont icon-zuo" @click="$router.replace('/playListPlaza')"></i>
      <p>
        <span class="songName">歌单标签</span>
      </p>
    </div>
    <iscroll-view class="content" @scrollStart="log">
      <div>
        <div class="tagwrap">
          <h2>我的歌单广场</h2>
          <ul>
            <li v-for="item in my" :key="item.title" @click="select(item.path)">  <i class="iconfont icon-wangzhanshouyereduicon--" v-if="item.hot"></i>{{item.title}}</li>
          </ul>
        </div>
        <div class="tagwrap">
          <h2>语种</h2>
          <ul>
            <li v-for="item in lang" :key="item.title" @click="select(item.path)">  <i class="iconfont icon-wangzhanshouyereduicon--" v-if="item.hot"></i>{{item.title}}</li>
          </ul>
        </div>
        <div class="tagwrap">
          <h2>风格</h2>
          <ul>
            <li v-for="item in catList" :key="item.title" @click="select(item.path)">
              <i class="iconfont icon-wangzhanshouyereduicon--" v-if="item.hot"></i>
              {{item.title}}
            </li>
          </ul>
        </div>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "playListTag",
  components: {},
  inject: ["playMusic", "pauseMusic"],
  data() {
    return {
      my: [
        {
          title: "推荐",
          path: "",
            hot:false
        },
        {
          title: "官方",
          path: "?cat=官方",
           hot:false
        },
        {
          title: "精品",
          path: "/highquality",
           hot:false
        },
        {
          title: "华语",
          path: "?cat=华语",
          hot:true
        },
        {
          title: "流行",
          path: "?cat=流行",
          hot:true
        },
        {
          title: "古风",
          path: "?cat=古风",
           hot:false
        },
        {
          title: "电子",
          path: "?cat=电子",
          hot:true
        },
        {
          title: "轻音乐",
          path: "?cat=轻音乐",
          hot:true
        },
      ],
      lang: [
        {
          title: "华语",
          path: "?cat=华语",
          hot:true
        },
        {
          title: "欧美",
          path: "?cat=欧美",
          hot:false
        },
        {
          title: "日语",
          path: "?cat=日语",
           hot:false
        },
        {
          title: "韩语",
          path: "?cat=韩语",
           hot:false
        },
        {
          title: "粤语",
          path: "?cat=粤语",
           hot:false
        },
      ],
    };
  },
  computed: {
    ...mapState({
      catList: (state) => state.recommend.catList,
    }),
    showComList() {
      return this.active ? this.musicHotComment : this.musicComment;
    },
  },
  created() {
    this.$store.dispatch("recommend/loadCatList");
  },
  methods: {
    select(path) {
      this.$store.dispatch("recommend/loadPlayList", path);
      this.$router.push("/playListPlaza");
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
#playListTag {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  padding: 0 45px;
  background-color: #fff;
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
.tagwrap {
  margin: 40px 0;
  h2 {
    font-size: 40px;
    font-weight: normal;
    color: #333;
    text-align: left;
    height: 120px;
    line-height: 120px;
    margin: 10px 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 20px 10px;
      width: 225px;
      height: 106px;
      background-color: #f3f3f3;
      border-radius: 53px;
      display: flex;
      font-size: 35px;
      line-height: 106px;
      justify-content: center;
      i{
        color: #f57b7b;
        font-size: 35px;
        margin-right:   20px;
      }
      color: #333;
    }
  }
}
</style>

<style >
</style>
