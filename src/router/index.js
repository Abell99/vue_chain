import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import User from '../components/User.vue'
import Good from '../components/Good.vue'
import Buy from '../components/Buy.vue'
import Db from '../components/Distribution.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/good',
        component: Good
      },
      {
        path: '/buy',
        component: Buy
      },
      {
        path: '/db',
        component: Db
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
