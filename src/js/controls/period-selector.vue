<template>
  <div class="container">
    <button @click="doPrev">
      <span class="mdi mdi-skip-previous"></span>
    </button>
    <span>{{ end?.toISOString().replace(/(\d+)-(\d+)-.*/, "$1-$2") }}</span>
    <button @click="doNext">
      <span class="mdi mdi-skip-next"></span>
    </button>
  </div>
</template>
<script setup>

import {startOfMonth, endOfMonth, addMonths} from "date-fns"

const start = defineModel("start")
const end = defineModel("end")

function doPrev() {
  start.value = startOfMonth(addMonths(start.value,-1))
  end.value = endOfMonth(addMonths(end.value,-1))
}
function doNext () {
  start.value = startOfMonth(addMonths(start.value,1))
  end.value = endOfMonth(addMonths(end.value,1))
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>
