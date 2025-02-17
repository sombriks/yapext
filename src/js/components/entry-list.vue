<template>
  <expand-panel icon="mdi-cash-multiple" title="Entry">
    <entry-chip
      :entry="newEntry"/>
    <entry-chip
      v-for="entry in entries"
      :key="entry.id"
      :entry/>
  </expand-panel>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import {listEntries} from "../composables/db.js"

import ExpandPanel from "../controls/expand-panel.vue"
import EntryChip from "./entry-chip.vue"

const props = defineProps(["start", "end"])

const entries = ref([])
const newEntry = ref(mkEntry())

function mkEntry() {
  return {}
}

async function list() {
  const ret = await listEntries({start: props.start, end: props.end})
  newEntry.value = mkEntry()
  entries.value = ret
}

watch(props, list)
onMounted(list)
</script>
