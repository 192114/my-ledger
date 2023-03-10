import { createWebHistory, createRouter } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 每个路由都必须声明
    transition?: string
  }
}

const Home = () => import('@/pages/HomePage.vue')
const Setting = () => import('@/pages/SettingPage.vue')
const Statistics = () => import('@/pages/StatisticsPage.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/setting', component: Setting },
  { path: '/statistics', component: Statistics }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 深度绑定路由过渡行为
router.afterEach((to, from) => {
  // home page -> setting page
  if (to.path === '/setting' && from.path === '/') {
    to.meta.transition = 'setting-in'
  }

  // setting page -> home page
  if (to.path === '/' && from.path === '/setting') {
    to.meta.transition = 'setting-out'
  }

  // home page -> statistics page
  if (to.path === '/statistics' && from.path === '/') {
    to.meta.transition = 'statistics-in'
  }

  // statistics page -> home page
  if (to.path === '/' && from.path === '/statistics') {
    to.meta.transition = 'statistics-out'
  }
})

export default router
