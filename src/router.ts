import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/HomePage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
