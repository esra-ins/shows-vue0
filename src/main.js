import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import './css/tailwind.css'
//import from './tailwind.css'

createApp(App).use(createPinia()).use(router).mount('#app');
