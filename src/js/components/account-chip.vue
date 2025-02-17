<template>
  <expand-panel
      v-model:expanded="expanded"
      :icon="account.icon"
      :color="account.color"
      :title="account.description">
    <account-form
        :account
        @save="save"
        @cancel="cancel"
        @del="del"/>
  </expand-panel>
</template>
<script setup>
import {ref} from "vue"

import ExpandPanel from "../controls/expand-panel.vue"
import AccountForm from "./account-form.vue"

defineProps(["account"])
const emit = defineEmits(["save", "cancel", "del"])

const expanded = ref(false)

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
