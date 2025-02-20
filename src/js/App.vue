<template>
  <period-selector
      v-model:start="period.start"
      v-model:end="period.end"/>
  <category-list
      :start="period.start"
      :end="period.end"/>
  <account-list
      :start="period.start"
      :end="period.end"/>
  <entry-list
      :start="period.start"
      :end="period.end"/>
  <config-panel/>
</template>
<script setup>
import {reactive} from "vue"
import {endOfMonth, startOfMonth} from "date-fns"

import PeriodSelector from "./controls/period-selector.vue"
import CategoryList from "./components/category-list.vue"
import AccountList from "./components/account-list.vue"
import EntryList from "./components/entry-list.vue"
import ConfigPanel from "./components/config-panel.vue"

// TODO remember period
const period = reactive({
  start: startOfMonth(new Date()),
  end: endOfMonth(new Date()),
})
</script>
