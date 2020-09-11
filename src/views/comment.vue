<template>
  <div class="home page" id="comment">
    <div class="header">
        <i class="iconfont icon-zuo" @click="$router.back()"></i>
        <p>
          <span class="songName">评论({{total}})</span>
        </p>
        <i class="iconfont icon-SHARE" @click="showShare = true"></i>
      </div>
      <div class="user">
        <img :src="musicImg" alt="">
        <p>
        <span class="mn">{{musicName}}</span>
        <span>{{musicSonger}}</span>
        </p>
         <i class="iconfont icon-you"  @click="$router.back()"></i>
      </div>
      <div class="comment-wrap">
      <div class="comNav">
        <h3>评论区</h3>
        <ul>
        <li  :class="{active:active}" @click="toggle(true)">最热</li>
        <li :class="{active:!active}" @click="toggle(false)">最新</li>
        </ul>
      </div>
      <div class="commentList">
      <iscroll-view class="com-content" @scrollStart="log" >
            <ul>
         <li v-for="(item , index) in showComList" :key="index">
                    <img :src="item.user.avatar" alt="">
                    <div class="con">
                    <div class="userInfo">
                        <p class="_user">
                            <span class="name">{{item.user.name}}</span>
                            <span>{{toggleDate(item.time)}}</span>
                        </p>
                     <p class="star"><span>{{item.liked}}</span> <i class="iconfont icon-zan"></i></p>
                    </div>
                    <p class="_conment">{{item.content}}</p>
                    </div>
                    
                </li>
            </ul>
      </iscroll-view>
      </div>
      </div>
      
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "comment",
  components: {},
  data() {
    return {
      banner: [],
    active:true,
  
    };
  },
  computed:{
      ...mapState({
      musicHotComment: (state) => state.music.musicHotComment,
      musicComment: (state) => state.music.musicComment,
      musicName: (state) => state.music.musicName,
      musicSonger: (state) => state.music.musicSonger,
      musicImg: (state) => state.music.musicImg,
      total: (state) => state.music.total,
      // pt: (state) => state.music.pt,
    }),
    showComList(){
        return this.active? this.musicHotComment:this.musicComment
    }
  },
  created() {
     
  },
  methods:{
      toggleDate(time) { //加载评论时间
        let date = new Date(time)
        let year = date.getFullYear();
        let mouth = this.add(date.getMonth() + 1);
        let day = this.add(date.getDate())
        return year + '年' + mouth + '月' + day + '日'
    },
    toggle(bool){
 this.active = bool
    },
     load() {},
    log(e) {
      e.refresh();
    },
     add(str) {
      //补零
      return str < 10 ? "0" + str : str;
    },
  }
};
</script>
<style lang="scss" scoped>
    #comment{
        position: absolute;
      
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
  background-color: #f7f7f7
    }
    .header {
          padding: 0 54px;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #444;
  background-color: #fff;
  p {
     
    padding: 0 60px;
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .songName {
      color: #333;
      font-size: 42px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: 1;
    }
    span {
      font-size: 36px;
      color: #666;
    }
  }
  i {
    font-size: 70px;
  }
}
.user{
      padding: 0 54px;
      padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
      background-color: #fff;
    img{
        width: 210px;
        height: 210px;
        border-radius: 20px;
    }
    p{
         display: flex;
    justify-content: space-between;
    flex-direction: column;
    text-align: left;
    line-height: 80px;
        flex: 1;
        padding: 0 38px;
         font-size: 35px;
        color: #557ba8;
    .mn{
        font-size: 50px;
        color: #333;
    }
    }
    i{
        font-size: 38px;
        color: #b4b4b4;
    }
}
.comment-wrap{
     
    margin-top: 40px;
   width: 100%;
     background-color: #fff;
     padding: 40px 0;
}
.comNav{
    display: flex;
     padding: 0 54px;
    justify-content: space-between;
    height: 40px;
    ul{
       display: flex; 
       li{
           padding: 0 20px;
            color: #c8c8c8;
       }
       li:nth-child(1){
           border-right: 1px #ccc solid;
       }
       .active{
           color: #333;
       }
    
    }
}
.commentList{
       
    width: 100%;
    ul{
        padding: 0 0px 54px 54px;
        li{
           
            width: 100%;
            display: flex;
           margin-top: 20px;
        
            img{
                width: 110px;
                height: 110px;
                margin-top: 50px;
                margin-right: 20px;
                border-radius: 50%;
            }
           .con{
                padding: 45px 15px;
            
                  flex: 1;
                   border-bottom: 1px #333 solid;
                .userInfo{
                display: flex;
                justify-content: space-between;
                align-items: center;
                ._user{
                    line-height: 50px;
                    .name{
                        font-size: 35px;
                        color: #666;
                    }
                    span{
                        font-size: 22px;
                        color: #c8c8c8;
                        display: block;
                          text-align: left;
                    }
                }
                .star{
                    font-size: 35px;
                      color: #c8c8c8;
                      i{
                          font-size: 35px;
                      color: #c8c8c8;
                      }
                      padding-right: 40px;
                }
            }
            ._conment{
                font-size: 40px;
                color: #333;
                text-align: left;
                padding-right: 50px;
            }
           }
        }
    }
}
.com-content{
    overflow: hidden;
    width: 100%;
    position: absolute;
    top: 500px;
    bottom: 0;
     background-color: #fff;

}
</style>

<style >

</style>
