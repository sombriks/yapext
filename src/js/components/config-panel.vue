<template>
  <expand-panel
      v-model:expanded="expanded"
      icon="mdi-cog-outline"
      title="Config">
    <div class="content">
      <base-button disabled @click="importData">Import</base-button>
      <base-button disabled @click="exportData">Export</base-button>
      <base-button @click="doTheme">Theme: {{ theme }}</base-button>
      <base-button disabled @click="doCurrency">Currency: {{ currency }}</base-button>
      <base-button @click="resetData">Reset data</base-button>
      <a target="_blank" href="https://github.com/sombriks/yapext">This is an open source project</a>
    </div>
  </expand-panel>
</template>
<script setup>
import {computed, ref} from "vue"

import BaseButton from "../controls/base-button.vue"
import ExpandPanel from "../controls/expand-panel.vue"

const expanded = defineModel("expanded")

const currency = ref("USD")
const _theme = ref(document.querySelector(":root").style.colorScheme || "default")

const theme = computed({
  get() {
    return _theme.value
  },
  set(value) {
    _theme.value = value
    const root = document.querySelector(":root")
    if (value === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else if (value === 'dark') {
      root.classList.remove('light')
      root.classList.add('dark')
    } else { // dark
      root.classList.remove('light')
      root.classList.remove('dark')
    }
  }
})

function importData() {
}

function exportData() {
}

function doTheme() {
  const root = document.querySelector(":root")
  // default, light, dark
  if (theme.value === 'default') {
    theme.value = 'light'
  } else if (theme.value === 'light') {
    theme.value = 'dark'
  } else { // dark
    theme.value = 'default'
  }
}

function doCurrency(){

}

function resetData() {
  if (confirm("Are you sure?")) {
    indexedDB.deleteDatabase("yapext")
    window.location.reload()
  }
}
</script>
<style scoped>
.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.content > button {
  width: 100%;
  margin: 1rem;
}
</style>
