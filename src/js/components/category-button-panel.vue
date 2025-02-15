<template>
  <panel-button icon="mdi-shape-plus-outline" title="Category">
    <panel-button
        v-for="category in categories"
        :key="category.id"
        :color="category.color"
        :title="category.description">
      CCC
    </panel-button>
  </panel-button>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import PanelButton from "../controls/panel-button.vue"
import {listCategories} from "../composables/db.js";

const props = defineProps(["start", "end"])

const categories = ref([])

async function list() {
  const cats = await listCategories(props.start, props.end)
  categories.value = cats
}

watch(props, list)
onMounted(list)
</script>
