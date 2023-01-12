import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/objects',
      name: 'objects',
      component: () => import('../views/ObjectsView.vue'),
    },
    {
      path: '/stat',
      name: 'stat',
      component: () => import('../views/StatView.vue'),
    },
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
})

export default router
