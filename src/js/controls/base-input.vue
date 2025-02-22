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

input {
  border: 1px solid;
  border-color: var(--fg);
  border-radius: 0.5rem;
}
</style>
