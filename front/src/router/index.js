import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/movies',
    name: 'movie-list',
    component: () => import('@/views/Movies.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/movie/:id',
    name: 'movie-details',
    component: () => import('@/views/Movie.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(({ matched, fullPath }, _, next) => {
  const requiresAuth = matched.some(record => record.meta.requiresAuth)
  const redirectToLogin = { path: '/login', query: { redirect: fullPath } }

  requiresAuth && !store.state.token ? next(redirectToLogin) : next()
})

export default router
