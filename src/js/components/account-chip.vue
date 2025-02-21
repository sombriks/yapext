<template>
  <expand-panel
      v-model:expanded="expanded"
      :icon="account.icon"
      :color="account.color"
      :title>
    <account-form
        :account
        @save="save"
        @cancel="cancel"
        @del="del"/>
  </expand-panel>
</template>
<script setup>
import {computed, ref} from "vue"

import {moneyFormatter} from "../composables/formatter.js"

import ExpandPanel from "../controls/expand-panel.vue"
import AccountForm from "./account-form.vue"

const props = defineProps(["account"])
const emit = defineEmits(["save", "cancel", "del"])

const expanded = ref(false)

const title = computed(() => {
  const a = props.account
  if (!a?.id) return a?.description || ''
  return `${a?.description} | ${moneyFormatter(a?.position)}`
})

function save(acc) {
  expanded.value = false
  emit("save", acc)
}

function cancel(acc) {
  expanded.value = false
  emit("cancel", acc)
}

function del(acc) {
  expanded.value = false
  emit("del", acc)
}

</script>
