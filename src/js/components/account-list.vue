<template>
  <expand-panel icon="mdi-bank-outline" title="Account">
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

import {listAccounts, saveAccount, delAccount} from "../composables/db.js"

import ExpandPanel from "../controls/expand-panel.vue"
import AccountChip from "./account-chip.vue"

const props = defineProps(["start", "end"])

const accounts = ref([])
const newAccount = ref(newAcc())

function newAcc() {
  return {
    description: "New account",
    icon: "mdi-credit-card-plus-outline",
    color: "white",
    limit: -3000,
    closureDay: 1,
    dueDay: 10
  }
}

async function doSave(acc) {
  await saveAccount(acc)
  await list()
}

async function doCancel(acc) {
  await list()
}

async function doDel(acc) {
  if(confirm("Are you sure?")){
    await delAccount(acc)
    await list()
  }
}

async function list() {
  const acc = await listAccounts(props.start, props.end)
  newAccount.value = newAcc()
  accounts.value = acc
}

watch(props, list)
onMounted(list)
</script>
