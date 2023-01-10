import { createApp } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import router from './router'

import './style.css'
import App from './App.vue'

useRegisterSW()

const app = createApp(App)

//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')
