<template>
  <div class="home page" id="playListTag">
    <div class="header">
      <i class="iconfont icon-zuo" @click="$router.replace('/playListPlaza')"></i>
      <p>
        <span class="songName">歌手</span>
      </p>
      
    </div>
    <iscroll-view class="content" @scrollStart="log">
      <div>
        <ul class="singer">
           <li v-for="item in singer" :key="item.id" @click="toSinger(item.id)">
            <img :src="item.picUrl" alt="">
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
    
      
    };
  },
  computed: {
    ...mapState({
      singer: (state) => state.recommend.singer,
    }),

  },
  created() {
    this.$store.dispatch("recommend/loadSinger");
  },
  methods: {
    select(path) {
      this.$store.dispatch("recommend/loadPlayList", path);
      this.$router.push("/playListPlaza");
    },
    toSinger(id){
        this.$store.dispatch("recommend/loadSingerMusic",id);
        this.$router.replace('/singerMusic')
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
.content {
  position: absolute;
  top: 120px;
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
.singer{
    padding-bottom: 30px;
        li{
            display: flex;
            align-items: center;
            margin:  40px 0;
            img{
                width: 152px;
                height: 150px;
                border-radius: 50%;
            }
            span{
                font-size: 45px;
                color: #333;
                margin-left: 40px;
            }
        }
    
}

</style>

<style >
</style>
