<template>
  <period-selector
      v-model:start="period.start"
      v-model:end="period.end"/>
  <category-list
      v-model:expanded="active.category"
      :start="period.start"
      :end="period.end"
      :hideBack="true"
      @click="doExpand('category')"/>
  <account-list
      v-model:expanded="active.account"
      :start="period.start"
      :end="period.end"
      :hideBack="true"
      @click="doExpand('account')"/>
  <entry-list
      v-model:expanded="active.entry"
      :start="period.start"
      :end="period.end"
      :hideBack="true"
      @click="doExpand('entry')"/>
  <config-panel
      v-model:expanded="active.config"
      :hideBack="true"
      @click="doExpand('config')"/>
  <a href="privacy.html">Privacy</a>
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

const active = reactive({
  category: false,
  account: false,
  entry: false,
  config: false,
})

function doExpand(section) {
  const sections = ["category", "account", "entry", "config"]
  for (const section of sections) active[section] = false
  active[section] = true
}
</script>
