<template>
  <expand-panel
      v-model:expanded="expanded"
      icon="mdi-tag-outline"
      :color="category.color"
      :title>
    <category-form
        :category="category"
        @save="save"
        @cancel="cancel"
        @del="del"/>
  </expand-panel>
</template>
<script setup>
import {computed, ref} from "vue"

import CategoryForm from "./category-form.vue"
import ExpandPanel from "../controls/expand-panel.vue"
import {moneyFormatter} from "../composables/formatter.js";

const props = defineProps(["category"])
const emit = defineEmits(["save", "cancel", "del"])

const expanded = ref(false)

const title = computed(() => {
  const a = props.category
  if (!a?.id) return a?.description || ''
  return `${a?.description} | ${moneyFormatter(a?.position)}`
})

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
