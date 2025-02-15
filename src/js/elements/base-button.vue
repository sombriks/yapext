<template>
  <button>
    <span v-if="icon" class="mdi" :class="icon"></span>
    <span v-if="icon">&nbsp;</span>
    <slot/>
  </button>
</template>
<script setup>
defineProps(["icon", "color"]);
</script>
<style scoped>
button {
  white-space: nowrap;
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>
