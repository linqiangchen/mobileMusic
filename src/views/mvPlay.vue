<template>
    <div id='mvPlay' class="home page" >
        <video class="video" :src="mvUrl" controls autoplay></video>
        <p class="back coun"><i  class="iconfont icon-zuo back" @click="$router.replace('/mv')"></i>返回</p>
        <h2 class="mvName">{{playMv.name}}</h2>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:'mvPlay',
    computed: {
    ...mapState({
      
      mvUrl: (state) => state.mv.mvUrl,
      playMv: (state) => state.mv.playMv,
    }),
  },
}
</script>

<style scoped lang="scss">
    #mvPlay{
        position: fixed;
        top: 0;
       width: 100%;
        bottom: 0;
        background-color: #fff;
         z-index: 1000;
    }
    .video{
        width: 100%;
    }
     .coun {
      position: absolute;
      
      padding: 20px;
      height: 70px;
      line-height: 70px;
      display: flex;
      align-items: center;
   
 width: 100%;
     
      top: 0px;
   
      color: #fff;
      
      background: linear-gradient(
        rgba(110, 110, 110, 0.4),
        rgba(255, 255, 255, 0)
      );
      i {
        margin-right: 10px;
      }
    }
    .back{
        font-size: 40px;
        color: #fff;
    }
    .mvName{
        font-weight: normal;
        font-size: 40px;
        padding: 10px 20px;
    }
</style>