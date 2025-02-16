<template>
  <panel-button
      v-model:expanded="expanded"
      icon="mdi-tag-outline"
      :color="category.color"
      :title="category.description">
    <category-form
        :category="category"
        @save="save"
        @cancel="cancel"
        @del="del"/>
  </panel-button>
</template>
<script setup>
import {ref} from "vue"

import CategoryForm from "./category-form.vue"
import PanelButton from "../controls/panel-button.vue"

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
