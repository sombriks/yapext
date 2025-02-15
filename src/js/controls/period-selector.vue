<template>
  <div class="container">
    <button @click="doPrev">
      <span class="mdi mdi-skip-previous"></span>
    </button>
    <div>
      <span>{{ end?.toISOString().replace(/(\d+)-(\d+)-.*/, "$1-$2") }}</span>
    </div>
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
  start.value = startOfMonth(addMonths(start.value, -1))
  end.value = endOfMonth(addMonths(end.value, -1))
}

function doNext() {
  start.value = startOfMonth(addMonths(start.value, 1))
  end.value = endOfMonth(addMonths(end.value, 1))
}
</script>
<style scoped>
.container {
  margin: 1rem;
  display: flex;
  justify-content: space-between;
}

div {
  flex-grow: 1;
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
  justify-content: center;
}
</style>
