<template>
  <expand-panel
      v-model:expanded="expanded"
      :title="entry.description"
      :icon="`mdi-cash-${entry?.amount >= 0 ? 'plus' : 'minus'}`">
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
import {computed, ref} from "vue";

import ExpandPanel from "../controls/expand-panel.vue";
import EntryForm from "./entry-form.vue";

const props = defineProps(["entry", "categories", "accounts"])
const emit = defineEmits(["save", "cancel", "del"])

const expanded = ref(false);

const category = computed(() =>
    props?.categories?.find(c =>
        c.id === props?.entry?.categories_id))
const account = computed(() =>
    props?.accounts?.find(a =>
        a.id === props?.entry?.accounts_id))

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
