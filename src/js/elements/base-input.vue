<template>
  <label>
    <span>{{ label }}</span>
    <input :type v-model="text"/>
  </label>
</template>
<script setup>
defineProps(["label", "type"])
const text = defineModel()
</script>
<style scoped>
label {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}
</style>
