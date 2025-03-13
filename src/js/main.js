import { createApp } from 'vue'

import App from './App.vue'
import { initDB } from './composables/db'
import {initializeAdMob} from "./composables/admob"

// application entrypoint
initDB()
  .then(() => createApp(App).mount('#app'))
  .then(initializeAdMob)
