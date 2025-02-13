<template>
  <period-selector
      v-model:start="period.start"
      v-model:end="period.end"/>
  <category-button-panel
      :start="period.start"
      :end="period.end"/>
  <account-button-panel
      :start="period.start"
      :end="period.end"/>
  <entry-button-panel
      :start="period.start"
      :end="period.end"/>
  <config-button-panel/>
</template>
<script setup>
import {reactive} from "vue"
import {endOfMonth, startOfMonth} from "date-fns"

import PeriodSelector from "./controls/period-selector.vue"
import CategoryButtonPanel from "./components/category-button-panel.vue"
import AccountButtonPanel from "./components/account-button-panel.vue"
import EntryButtonPanel from "./components/entry-button-panel.vue"
import ConfigButtonPanel from "./components/config-button-panel.vue"

const period = reactive({
  start: startOfMonth(new Date()),
  end: endOfMonth(new Date()),
})
</script>
