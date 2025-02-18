<template>
  <button>
    <span v-if="icon" class="mdi" :class="icon"></span>
    <span v-if="icon">&nbsp;</span>
    <slot/>
    <span v-if="secondaryIcon">&nbsp;</span>
    <span v-if="secondaryIcon" class="mdi" :class="secondaryIcon"></span>
  </button>
</template>
<script setup>
defineProps(["icon", "secondaryIcon", "color"]);
</script>
<style scoped>
button {
  white-space: nowrap;
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>
