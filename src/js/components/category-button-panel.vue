<template>
  <panel-button icon="mdi-shape-plus-outline" title="Category">
    <panel-button
        v-model:expanded="expanded"
        :color="newCategory.color"
        :title="newCategory.description">
      <category-form
          :category="newCategory"
          @save="doSave"/>
    </panel-button>
    <panel-button
        v-for="category in categories"
        :key="category.id"
        :color="category.color"
        :title="category.description">
      <category-form
          :category="category"
          @save="doSave"/>
    </panel-button>
  </panel-button>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import {listCategories} from "../composables/db.js"

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
  categories.value = []
  expanded.value = false
  await list()
  newCategory.value = newCat()
}

async function list() {
  const cats = await listCategories(props.start, props.end)
  categories.value = cats
}

watch(props, list)
onMounted(list)
</script>
