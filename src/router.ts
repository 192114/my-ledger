import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('@/pages/HomePage.vue')
const Setting = () => import('@/pages/SettingPage.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/setting', component: Setting, meta: { transition: 'slide-left' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
