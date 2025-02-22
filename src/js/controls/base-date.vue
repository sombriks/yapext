<template>
  <div class="content">
    <span @click="expanded = !expanded">{{ label }}</span>
    <div v-if="!expanded">
      <base-button
          @click.prevent.stop="expanded = true">
        {{ current }}
      </base-button>
    </div>
    <div v-else>
      <input v-model="year" type="number" min="1900" max="2099"/>
      <input v-model="month" type="number" min="1" max="12"/>
      <input v-model="day" type="number" min="1" max="31"/>
      <base-button
          icon="mdi-close-outline"
          color="orange"
          @click.prevent.stop="expanded = false"/>
      <base-button
          icon="mdi-check-outline"
          color="green"
          @click.prevent.stop="done"/>
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from "vue"

import BaseButton from "./base-button.vue"
import {dayFormatter} from "../composables/formatter.js";

defineProps(["label"])

const date = defineModel()

const expanded = ref(false)

const year = ref(date?.value?.getFullYear())
const month = ref(date?.value?.getMonth() + 1)
const day = ref(date?.value?.getDate())

const current = computed(() => dayFormatter(date?.value))

function done() {
  date.value = new Date(year.value, month.value -1, day.value)
  expanded.value = false
}
</script>
<style scoped>
.content, div > div {
  display: flex;
}

.content {
  flex-direction: column;
}
</style>
