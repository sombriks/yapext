import { createApp } from 'vue'
import App from './App.vue'
import { initDB } from './composables/db'
initDB().then(() => createApp(App).mount('#app'))
