<template>
<div id="app">
    <div id="header">
        <div class="left"><van-icon name="wap-nav" /></div>
        <nav class="nav">
        <li><router-link to="">我的</router-link></li>
            <li><router-link to="">发现</router-link></li>
             <li><router-link to="">云村</router-link></li>
              <li><router-link to="">视频</router-link></li> 
        </nav>
        <div class="right"><van-icon name="search" /></div>
    </div>
    <router-view />
</div>


</template>

<script>
import {
    Button
} from 'vant';

export default {
    mounted(){
        this.$store.dispatch('loadMusicUrl',1391509011)
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  
}
html,body{
    width: 100%;
    height: 100%;
    font-size: 10px;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
li{
    list-style: none;
}
#app{
    #header{
        position: fixed;
        height: 49px;
        width: 100%;
        font-size:1.6rem;
        .left{
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            height: 16px;
        }
        .right{
            
             position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
             height: 16px;
        }
        .nav{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            li{
                padding: 0 10px;
                a{
                    color:#333
                }
            }
        }
    }
}
</style>
