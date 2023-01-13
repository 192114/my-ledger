import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/HomePage.vue'
import Setting from '@/pages/SettingPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/setting', component: Setting, meta: { transition: 'slide-left' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
