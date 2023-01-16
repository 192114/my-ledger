import { createApp } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { createPinia } from 'pinia'
import router from './router'

import './style.css'
import App from './App.vue'

useRegisterSW()

const app = createApp(App)
const pinia = createPinia()

//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

// 使用Pinia
app.use(pinia)

app.mount('#app')
