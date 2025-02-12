<template>
  <period-selector></period-selector>
  <category-button-panel></category-button-panel>
  <account-button-panel></account-button-panel>
  <entry-button-panel></entry-button-panel>
  <config-button-panel></config-button-panel>
</template>
<script setup>
import {ref} from "vue"

import PeriodSelector from "./controls/period-selector.vue"
import CategoryButtonPanel from "./components/category-button-panel.vue"
import AccountButtonPanel from "./components/account-button-panel.vue"
import EntryButtonPanel from "./components/entry-button-panel.vue"
import ConfigButtonPanel from "./components/config-button-panel.vue"

const count = ref(0)
</script>