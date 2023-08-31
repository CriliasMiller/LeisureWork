import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './utils/pollyfill'

import { createApp } from 'vue'
import App from './App2.vue'
import router from './router'
import axios from 'axios'
// axios.defaults.baseURL = '/v1'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(router)

app.mount('#app')
