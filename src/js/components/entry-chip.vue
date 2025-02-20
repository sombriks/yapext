<template>
  <expand-panel
      v-model:expanded="expanded"
      :secondary-icon="account?.icon"
      :color
      :title
      :icon>
    <entry-form
        :entry
        :accounts
        :categories
        @save="save"
        @cancel="cancel"
        @del="del"/>
  </expand-panel>
</template>
<script setup>
import {computed, ref} from "vue"

import {dayFormatter, moneyFormatter} from "../composables/formatter.js"

import ExpandPanel from "../controls/expand-panel.vue"
import EntryForm from "./entry-form.vue"

const props = defineProps(["entry", "categories", "accounts"])
const emit = defineEmits(["save", "cancel", "del"])

const expanded = ref(false)

const category = computed(() =>
    props?.categories?.find(c =>
        c.id == props?.entry?.categories_id))
const account = computed(() =>
    props?.accounts?.find(a =>
        a.id == props?.entry?.accounts_id))
const color = computed(() => category.value?.color)
const title = computed(() => {
  const date = dayFormatter(props.entry?.dueDate)
  if (props.entry?.id) {
    const amount = moneyFormatter(props.entry?.amount)
    return `${date} | ${amount}`
  }
  return `${date} | ${props.entry?.description}`
})
const icon = computed(() =>
    `mdi-cash-${props.entry?.amount >= 0 ? 'plus' : 'minus'}`)

function save(e) {
  expanded.value = false
  emit("save", e)
}

function cancel(e) {
  expanded.value = false
  emit("cancel", e)
}

function del(e) {
  expanded.value = false
  emit("del", e)
}

</script>
<style scoped>

</style>
