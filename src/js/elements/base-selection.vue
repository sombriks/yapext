<template>
  <div class="content">
    <span>{{label}}</span>
    <div v-if="!expanded">
      <base-button @click="expanded = !expanded">
        {{current?.label}}
      </base-button>/
    </div>
    <div v-else>

    </div>
  </div>
</template>
<script setup>
import {computed, ref, watch} from "vue"
import BaseButton from "./base-button.vue";

const props = defineProps(["label", "options"])
const selected = defineModel()

const expanded = ref(false)

const current = computed(() => {
  return props?.options.find(o => o.value == selected.value)
})
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>
