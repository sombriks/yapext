<template>
  <panel-button icon="mdi-book-outline" title="Account">
    <panel-button v-for="account in accounts" :key="account" :title="account"></panel-button>
  </panel-button>
</template>
<script setup>
import {ref} from "vue"

import PanelButton from "../controls/panel-button.vue"

defineProps(["start", "end"])
const accounts = ref([1, 2, 3, 4])
</script>
