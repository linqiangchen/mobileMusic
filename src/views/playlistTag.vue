<template>
  <div class="home page" id="playListTag">
    <div class="header">
      <i class="iconfont icon-zuo" @click="$router.replace('/playListPlaza')"></i>
      <p>
        <span class="songName">歌单标签</span>
      </p>
    </div>
    <iscroll-view class="my-content" @scrollStart="log">
      <div>
        <div class="tagwrap">
          <h2>
            我的歌单广场
           
          </h2>
          <ul>
            <li v-for="(item , index) in $parent.my" :key="item.title" @click.self="select(item.path)">
              <i
                class="iconfont icon-chushaixuanxiang addTag"
                v-show="!addTag"
                @click="deleteMy(index)"
              ></i>
              <i class="iconfont icon-wangzhanshouyereduicon--" v-if="item.hot"></i>
              {{item.title}}
            </li>
          </ul>
        </div>
        <div class="tagwrap">
          <h2>语种</h2>
          <ul>
            <li v-for="item in lang" :key="item.title" @click="select(item.path)">
              <i class="iconfont icon-add-fill-copy addTag" v-show="!addTag"></i>
              <i class="iconfont icon-wangzhanshouyereduicon--" v-if="item.hot"></i>
              {{item.title}}
            </li>
          </ul>
        </div>
        <div class="tagwrap">
          <h2>风格</h2>
          <ul>
            <li v-for="item in catList" :key="item.title" @click="select(item.path)">
              <i class="iconfont icon-wangzhanshouyereduicon--" v-if="item.hot"></i>
              <i class="iconfont icon-add-fill-copy addTag" v-show="!addTag"></i>
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

  data() {
    return {
      addTag: true,
      lang: [
        {
          title: "华语",
          path: "?cat=华语",
          hot: true,
        },
        {
          title: "欧美",
          path: "?cat=欧美",
          hot: false,
        },
        {
          title: "日语",
          path: "?cat=日语",
          hot: false,
        },
        {
          title: "韩语",
          path: "?cat=韩语",
          hot: false,
        },
        {
          title: "粤语",
          path: "?cat=粤语",
          hot: false,
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

    
  },
  methods: {
    deleteMy(index) {
      let arr =  this.$parent.my
      arr.splice(index,1)
      this.$parent.setMy(arr)
    },
    handleAdd() {
      
      this.addTag = !this.addTag;
    },
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
.my-content {
  padding: 0 45px;

  width: 100%;
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 150px;
  overflow: hidden;
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
  margin: 0 0 20px 0;
  h2 {
    font-size: 40px;
    font-weight: normal;
    color: #333;
    text-align: left;
    height: 120px;
    line-height: 120px;
    margin: 10px 0;
    i {
      font-size: 40px;
      color: #f57b7b;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      margin: 20px 10px;
      width: 225px;
      height: 106px;
      background-color: #f3f3f3;
      border-radius: 53px;
      display: flex;
      font-size: 35px;
      line-height: 106px;
      justify-content: center;
      .addTag {
        position: absolute;
        top: -50px;

        right: 0px;
      }
      i {
        color: #f57b7b;
        font-size: 35px;
        margin-right: 20px;
      }
      color: #333;
    }
  }
}
</style>

<style >
</style>
