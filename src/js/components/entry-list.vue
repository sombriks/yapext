<template>
  <expand-panel icon="mdi-cash-multiple" title="Entry">
    <entry-chip
        :entry="newEntry"
        :categories
        :accounts
        @save="doSave"
        @cancel="doCancel"
        @del="doDel"/>
    <entry-chip
        v-for="entry in entries"
        :key="entry.id"
        :entry
        :accounts
        :categories
        @save="doSave"
        @cancel="doCancel"
        @del="doDel"/>
  </expand-panel>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import {delEntry, listAccounts, listCategories, listEntries, saveEntry} from "../composables/db.js"

import ExpandPanel from "../controls/expand-panel.vue"
import EntryChip from "./entry-chip.vue"

const props = defineProps(["start", "end"])

const entries = ref([])
const newEntry = ref(mkEntry())
const categories = ref([])
const accounts = ref([])

function mkEntry() {
  return {
    description: "new entry",
    amount: -10,
    dueDate: new Date()
  }
}

async function doSave(entry) {
  await saveEntry(entry)
  await list()
}

async function doCancel(entry) {
  await list()
}

async function doDel(entry) {
  if (confirm("Are you sure?")) {
    await delEntry(entry)
    await list()
  }
}

async function list() {
  const ret = await listEntries({start: props.start, end: props.end})
  newEntry.value = mkEntry()
  entries.value = ret
  categories.value = await listCategories({start: props.start, end: props.end})
  accounts.value = await listAccounts({start: props.start, end: props.end})
}

watch(props, list)
onMounted(list)
</script>
