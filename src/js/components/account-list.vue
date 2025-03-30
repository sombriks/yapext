<template>
  <expand-panel
      v-model:expanded="expanded"
      :hide-back="hideBack"
      icon="mdi-bank-outline"
      title="Account">
    <account-chip
        :account="newAccount"
        @save="doSave"
        @cancel="doCancel"/>
    <account-chip
        v-for="account in accounts"
        :key="account.id"
        :account
        @save="doSave"
        @cancel="doCancel"
        @del="doDel"/>
  </expand-panel>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import ExpandPanel from "../controls/expand-panel.vue"
import AccountChip from "./account-chip.vue"
import {delAccount, listAccounts, saveAccount} from "../composables/accounts.js";

const props = defineProps(["start", "end", "hideBack"])

const expanded = defineModel("expanded")

const accounts = ref([])
const newAccount = ref(newAcc())

function newAcc() {
  return {
    description: "New account",
    icon: "mdi-credit-card-plus-outline",
    color: "var(--fg)",
    limit: -3000,
    closureDay: 1,
    dueDay: 10
  }
}

async function doSave(acc) {
  await saveAccount(acc)
  await list()
}

async function doCancel() {
  await list()
}

async function doDel(acc) {
  if (confirm("Are you sure?")) {
    await delAccount(acc)
    await list()
  }
}

async function list() {
  const acc = await listAccounts({start: props.start, end: props.end})
  newAccount.value = newAcc()
  accounts.value = acc
}

watch(props, list)
onMounted(list)
</script>
