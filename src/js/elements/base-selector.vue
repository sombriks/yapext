<template>
  <div class="content">
    <span @click="expanded = !expanded">{{ label }}</span>
    <div v-if="!expanded">
      <base-button
          :icon="current?.icon"
          :color="current?.color"
          @click="expanded = true">
        {{ current?.description || "..." }}
      </base-button>
    </div>
    <div v-else>
      <base-button
          v-for="op in options"
          :key="op.id"
          :icon="op?.icon"
          :color="op?.color"
          @click.prevent.stop="select(op)">
        {{ op?.description }}
      </base-button>
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from "vue"

import BaseButton from "./base-button.vue"

const props = defineProps(["label", "color", "options"])
const selected = defineModel()

const expanded = ref(false)

const current = computed(() => {
  return props?.options?.find(o => o.id == selected.value)
})

function select(op) {
  selected.value = op.id
  expanded.value = false
}

</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

.content > div {
  display: flex;
  flex-wrap: wrap;
}

.content > div > button {
  margin-right: 1em;
}
</style>
