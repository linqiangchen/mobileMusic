<template>
  <div class="home page" id="topList">
    <div class="header">
      <i class="iconfont icon-zuo" @click="$router.replace('/')"></i>
      <p>
        <span class="songName">排行榜</span>
      </p>
    </div>

    <iscroll-view class="content" @scrollStart="log">
      <div class="list">
        <h2>官方榜</h2>
        <ul class="official">
          <li v-for="item in officialList" :key="item.id" @click="loadPlayList(item.id)">
            <div class="left">
              <img v-lazy="item.coverImgUrl" alt />
              <div class="coun">
                <span>{{item.updateFrequency}}</span>
              </div>
            </div>
            <div class="right">
              <p v-for="(list ,index) in item.tracks" :key="index">
                <span>{{list.first + ' - ' + list.second}}</span>
              </p>
            </div>
          </li>
        </ul>
        <h2>更多榜单</h2>
        <ul class="other">
          <li v-for="item in otherList" :key="item.id" @click="loadPlayList(item.id)">
            <div class="left">
              <img v-lazy="item.coverImgUrl" alt />
              <div class="coun">
                <span>{{item.updateFrequency}}</span>
              </div>
            </div>

            <p>{{item.name}}</p>
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
  name: "topList",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  created() {
    this.$store.dispatch("recommend/loadTopList");
  },
  computed: {
    ...mapState({
      topList: (state) => state.recommend.topList,
    }),
    officialList() {
      return this.topList.filter((item) => item.tracks.length > 0);
    },
    otherList() {
      return this.topList.filter((item) => item.tracks.length == 0);
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
    loadPlayList(id) {
      this.$router.push("/playList");
      this.$store.dispatch("playList/loadPlayList", id);
    },
    change(num) {
      if (num > 10000) {
        return parseInt(num / 10000) + "万";
      } else {
        return num;
      }
    },
    toggle(index) {
      this.active = index;
      this.$store.dispatch("recommend/loadPlayList", this.navlist[index].path);
    },
  },
};
</script>
<style lang="scss" scoped>
#topList {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
 
  background-color: #fff;
}
.coun {
  position: absolute;
  text-align: left;
  height: 70px;
  line-height: 70px;
  width: 100%;
  text-indent: 20px;
  bottom: 10px;
  border-radius: 20px;
  color: #fff;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(110, 110, 110, 0.4));
}
.content {
  position: absolute;
  top: 120px;
  bottom: 150px;
}
.header {
   padding: 0 45px;
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
.list {
  h2 {
     padding: 0 45px;
    font-size: 40px;
    font-weight: normal;
    color: #333;
    text-align: left;
    height: 120px;
    line-height: 120px;
    margin: 10px 0;
  }
  .official {
     padding: 0 45px;
    li {
      display: flex;
      margin: 20px 0;
      .left {
        position: relative;
      }
      img {
        width: 310px;
        border-radius: 20px;
      }
      .right {
        margin-left: 20px;
        text-align: left;
        color: #666;
        font-size: 36px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
        p {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .other {
    display: flex;
    flex-wrap: wrap;
    width: 99%;
    margin: 0 auto;
    li {
      .coun {
        position: absolute;
        height: 70px;
        line-height: 70px;
        left: 50%;
        transform: translateX(-50%);
        width: 310px;
        text-indent: 20px;
        bottom: 10px;
        color: #fff;
        background: linear-gradient(
          rgba(255, 255, 255, 0) rgba(110, 110, 110, 0.4)
        );
      }
      .left {
        position: relative;
      }
      width: 33%;
      img {
        width: 310px;
        border-radius: 20px;
      }
      p{
          width: 310px;
          text-align: left;
          margin:  26px auto;
          color: #333;
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
