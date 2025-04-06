<template>
  <button :disabled>
    <span v-if="icon" class="mdi" :class="icon"></span>
    <span v-if="icon">&nbsp;</span>
    <slot/>
    <span v-if="secondaryIcon">&nbsp;</span>
    <span v-if="secondaryIcon" class="mdi" :class="secondaryIcon"></span>
  </button>
</template>
<script setup>
defineProps(["icon", "secondaryIcon", "color", "border", "disabled"]);
</script>
<style scoped>
button {
  white-space: nowrap;
  color: var(--fg);
  border-color: v-bind(color);
}

button[disabled] {
  border-style: dashed;
}
</style>
