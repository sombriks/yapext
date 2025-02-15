<template>
  <panel-button icon="mdi-cash-multiple" title="Entry"/>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import {listEntries} from "../composables/db.js"

import PanelButton from "../controls/panel-button.vue"

const props = defineProps(["start", "end"])

const entries = ref([])

async function list() {
  const ret = await listEntries({start: props.start, end: props.end})
  entries.value = ret
}

watch(props, list)
onMounted(list)
</script>
