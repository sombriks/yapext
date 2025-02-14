<template>
  <div class="container">
    <base-button v-if="!expanded" :icon="icon" @click="expanded = true">{{title}}</base-button>
  </div>
</template>
<script setup>
import {ref} from "vue"

import BaseButton from '../elements/base-button.vue'

defineProps(["title", "icon"])

const expanded = ref(false)
</script>
<style scoped>
.container {
  margin: 1rem;
  display: flex;
  justify-content: space-between;
}
button {
  width:100%;
}
</style>
