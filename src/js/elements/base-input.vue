<template>
  <label>
    <span>{{ label }}</span>
    <input type="text" v-model="text"/>
  </label>
</template>
<script setup>
defineProps(["label"])
const text = defineModel()
</script>
<style scoped>
label {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}
</style>
