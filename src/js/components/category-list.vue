<template>
  <expand-panel
      v-model:expanded="expanded"
      :hide-back="hideBack"
      icon="mdi-tag-outline"
      title="Category">
    <category-chip
        :category="newCategory"
        @save="doSave"
        @cancel="list"/>
    <category-chip
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @save="doSave"
        @cancel="list"
        @del="doDel"/>
  </expand-panel>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"


import {delCategory, listCategories, saveCategory} from "../composables/categories.js"

import ExpandPanel from "../controls/expand-panel.vue"
import CategoryChip from "./category-chip.vue"

const props = defineProps(["start", "end", "hideBack"])

const expanded = defineModel("expanded")

const categories = ref([])
const newCategory = ref(newCat())

function newCat() {
  return {description: "New Category", color: "var(--fg)", limit: -1000}
}

async function doSave(cat) {
  await saveCategory(cat)
  await list()
}

async function doDel(cat) {
  if (confirm("Are you sure/")) {
    await delCategory(cat)
    await list()
  }
}

async function list() {
  const cats = await listCategories({start: props.start, end: props.end})
  newCategory.value = newCat()
  categories.value = cats
}

watch(props, list)
onMounted(list)
</script>
