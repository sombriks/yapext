<template>
  <button>
    <span v-if="icon" class="mdi" :class="icon"></span>
    <span v-if="icon">&nbsp;</span>
    <slot/>
  </button>
</template>
<script setup>
defineProps(["icon"])
</script>
