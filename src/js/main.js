import { createApp } from 'vue'
import App from './App.vue'
import { initDB } from './composables/db'
await initDB()
createApp(App).mount('#app')
