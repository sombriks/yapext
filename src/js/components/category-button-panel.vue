<template>
  <panel-button icon="mdi-shape-plus-outline" title="Category">
    <panel-button
        v-model:expanded="expanded"
        icon="mdi-shape-plus-outline"
        :color="newCategory.color"
        :title="newCategory.description">
      <category-form
          :category="newCategory"
          @save="doSave"
          @cancel="list"/>
    </panel-button>
    <panel-button
        v-for="category in categories"
        :key="category.id"
        :color="category.color"
        :title="category.description">
      <category-form
          :category="category"
          @save="doSave"
          @cancel="list"
          @del="doDel"/>
    </panel-button>
  </panel-button>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import {listCategories, saveCategory} from "../composables/db.js"

import PanelButton from "../controls/panel-button.vue"
import CategoryForm from "./category-form.vue";

const props = defineProps(["start", "end"])

const categories = ref([])
const newCategory = ref(newCat())
const expanded = ref(false)

function newCat() {
  return {description: "New Category", color: "#FFFFFF"}
}

async function doSave(cat) {
  await saveCategory(cat)
  await list()
}

async function doDel(cat) {
  if (confirm("Are you sure/")) {
    await list()
  }
}

async function list() {
  categories.value = []
  expanded.value = false
  newCategory.value = newCat()
  const cats = await listCategories({start: props.start, end: props.end})
  categories.value = cats
}

watch(props, list)
onMounted(list)
</script>
