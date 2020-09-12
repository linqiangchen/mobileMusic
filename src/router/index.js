import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
   
  },
  {
    path: '/playList',
    name: 'playList',
    component: () => import(/* webpackChunkName: "playList" */ '../views/playList.vue'),
   
  },
  {
    path: '/singerMusic',
    name: 'singerMusic',
    component: () => import(/* webpackChunkName: "singerMusic" */ '../views/singerMusic.vue'),
   
  },
  {
    path: '/topList',
    name: 'topList',
    component: () => import(/* webpackChunkName: "topList" */ '../views/topList.vue'),
   
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/singer.vue'),
   
  },
  {
    path: '/playListPlaza',
    name: 'playListPlaza',
    component: () => import(/* webpackChunkName: "playListPlaza" */ '../views/playListPlaza.vue'),
   
  },
  {
    path: '/playlistTag',
    name: 'playlistTag',
    component: () => import(/* webpackChunkName: "playListTag" */ '../views/playlistTag.vue'),
   
  },
  {
    path: '/detail',
    name: 'Home',
    component:() => import(/* webpackChunkName: "musicPlay" */ '../views/musicPlay.vue'),
   children:[{
    path: 'comment',
    name: 'comment',
    component:() => import(/* webpackChunkName: "comment" */ '../views/comment.vue'),
   }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/Search',
    name:'Search',
    component: Search},
    {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/mine.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
