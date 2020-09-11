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
    component: () => import(/* webpackChunkName: "about" */ '../views/playList.vue'),
   
  },
  {
    path: '/detail',
    name: 'Home',
    component:() => import(/* webpackChunkName: "about" */ '../views/musicPlay.vue'),
   children:[{
    path: 'comment',
    name: 'comment',
    component:() => import(/* webpackChunkName: "about" */ '../views/comment.vue'),
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
