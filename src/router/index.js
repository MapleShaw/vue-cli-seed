import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '',
        keepAlive: true,
        requireAuth: true
      }
    }
  ]
})
