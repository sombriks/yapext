<template>
  <panel-button icon="mdi-book-outline" title="Account">
    <panel-button
        v-for="account in accounts"
        :key="account.id"
        :title="account.description">
      AAAA
    </panel-button>
  </panel-button>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

import {listAccounts} from "../composables/db.js"

import PanelButton from "../controls/panel-button.vue"

const props = defineProps(["start", "end"])

const accounts = ref([])

async function list() {
  const acc = await listAccounts(props.start, props.end)
  console.log(acc)
  accounts.value = acc
}

watch(props, list)
onMounted(list)
</script>
