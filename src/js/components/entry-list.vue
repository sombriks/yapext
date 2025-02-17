<template>
  <expand-panel icon="mdi-cash-multiple" title="Entry">
    <i>Under construction</i>
  </expand-panel>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import {listEntries} from "../composables/db.js"

import ExpandPanel from "../controls/expand-panel.vue"

const props = defineProps(["start", "end"])

const entries = ref([])

async function list() {
  const ret = await listEntries({start: props.start, end: props.end})
  entries.value = ret
}

watch(props, list)
onMounted(list)
</script>
