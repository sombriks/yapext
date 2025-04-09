import { createApp } from 'vue'

import App from './App.vue'
import { initDB } from './composables/db'
import {initializeAdMob, showBanner} from "./composables/admob"
import {restoreConfigs} from "./composables/configs"

// application entrypoint
initDB()
  .then(() => createApp(App)
    .mount('#app'))
  .then(restoreConfigs)
  .then(initializeAdMob)
  .then(showBanner)
