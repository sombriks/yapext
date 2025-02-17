<template>
  <expand-panel
      v-model:expanded="expanded"
      icon="mdi-tag-outline"
      :color="category.color"
      :title="category.description">
    <category-form
        :category="category"
        @save="save"
        @cancel="cancel"
        @del="del"/>
  </expand-panel>
</template>
<script setup>
import {ref} from "vue"

import CategoryForm from "./category-form.vue"
import ExpandPanel from "../controls/expand-panel.vue"

defineProps(["category"])
const emit = defineEmits(["save", "cancel", "del"])

const expanded = ref(false)

function save(category) {
  expanded.value = false
  emit("save", category)
}

function cancel(category) {
  expanded.value = false
  emit("cancel", category)
}

function del(category) {
  expanded.value = false
  emit("del", category)
}
</script>
