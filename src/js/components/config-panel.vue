<template>
  <expand-panel
      v-model:expanded="expanded"
      :hideBack="hideBack"
      icon="mdi-cog-outline"
      title="Config">
    <div class="content">
      <base-button @click="$refs.inputcsv.click()">Import</base-button>
      <input type="file" ref="inputcsv" style="display: none;" @change="importData"/>
      <base-button @click="exportData">Export</base-button>
      <base-button @click="doTheme">Theme: {{ theme }}</base-button>
      <base-button disabled @click="doCurrency">Currency: {{ currency }}</base-button>
      <base-button @click="resetData">Reset data</base-button>
      <a target="_blank" href="https://github.com/sombriks/yapext">This is an open source project</a>
      <a target="_blank" href="https://sombriks.github.io/yapext/privacy.html">Privacy</a>
    </div>
  </expand-panel>
</template>
<script setup>
import {computed, ref, useTemplateRef} from "vue"

import BaseButton from "../controls/base-button.vue"
import ExpandPanel from "../controls/expand-panel.vue"
import {listEntries} from "../composables/entries.js"
import {listCategories} from "../composables/categories.js"
import {listAccounts} from "../composables/accounts.js"
import {fromCSV, joinData, saveFile, toCSV} from "../composables/import-export.js"

const props = defineProps(["start", "end", "hideBack"])
const expanded = defineModel("expanded")

const currency = ref("USD")
const _theme = ref(document.querySelector(":root").style.colorScheme || "default")
const inputFile = useTemplateRef("inputcsv")

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
  if (inputFile.value.files.length) {
    const reader = new FileReader()
    reader.onload = (event) => {
      fromCSV(event.target.result)
    }
    reader.readAsText(inputFile.value.files[0])
    alert("Import finished!")
  }
}

async function exportData() {
  // select all entries in period
  const entries = await listEntries({start: props.start, end: props.end})
  // join categories and account names
  const categories = await listCategories({start: props.start, end: props.end})
  const accounts = await listAccounts({start: props.start, end: props.end})
  joinData({entries, categories, accounts})
  // concat as csv
  const csv = toCSV(entries)
  // save exported data
  await saveFile({file: csv, date: props.start})
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

function doCurrency() {

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
