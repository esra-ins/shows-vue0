import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './css/tailwind.css'
//import from './tailwind.css'

createApp(App).use(router).mount('#app')
