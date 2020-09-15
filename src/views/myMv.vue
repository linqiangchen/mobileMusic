<template>
  <div class="home page" id="mv">
   <iscroll-view class="content" @scrollStart="log" ref="iscroll" >
  <div>
     <div class="wrap">
       <h3>网易出品</h3>
    <ul>
    <li v-for="item in WYmv" :key="item.id" @click="toMvPlay(item.id,item)">
      <img v-lazy="item.cover" alt="">
       <div class="coun">
                <i class="iconfont icon-bofang1"></i>

                <span>{{change(item.playCount)}}</span>
              </div>
      <p>{{item.name}}</p>
      <p>{{item.artisteName}}</p>
    </li>
    </ul>
     </div>
     <div class="wrap">
       <h3>最新MV</h3>
    <ul>
    <li v-for="item in allMv" :key="item.id" @click="toMvPlay(item.id,item)">
      <img v-lazy="item.cover" alt="">
       <div class="coun">
                <i class="iconfont icon-bofang1"></i>

                <span>{{change(item.playCount)}}</span>
              </div>
      <p>{{item.name}}</p>
      <p>{{item.artists.name}}</p>
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
  name: "myMv",
  components: {},

  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      WYmv: (state) => state.mv.WYmv,
      allMv: (state) => state.mv.allMv,
    }),
  },
  created() {
      this.$store.dispatch('mv/loadMV')
      this.$store.dispatch('mv/loadAllMV')
  },
  methods: {
    toMvPlay(id,item){
      this.$store.dispatch("mv/loadMVUrl", {id,item});
      this.$router.replace("/mvPlay");
    },
change(num) {
      if (num > 10000 && num < 100000000) {
        return parseInt(num / 10000) + "万";
      } else if (num >= 100000000) {
        return parseInt(num / 100000000) + "亿";
      } else {
        return num;
      }
    },
    load() {},
    log(e) {
      e.refresh();
    },
  },
};
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
   padding: 0 54px;
  overflow: hidden
}
#mv{
  padding: 0 54px;
  width: 100%;
  height: 100;
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
 .coun {
      position: absolute;
      
      padding-right: 20px;
      height: 70px;
      line-height: 70px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: calc(100% - 40px);
     
      top: 20px;
   
      color: #fff;
      
      background: linear-gradient(
        rgba(110, 110, 110, 0.4),
        rgba(255, 255, 255, 0)
      );
      i {
        margin-right: 10px;
      }
    }
.wrap{
  h3{
    font-weight: 500;
    text-align: left;
padding: 40px 0;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      position: relative;
      width: 50%;
      padding: 20px;
      img{
        width: 100%;
        display: block;
        height: 310px;
      }
      p{
        padding:  10px 0;
        overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
      color: #333;
      }
    }
  }
}
</style>

<style >
</style>
