<template>
  <button>
    <span class="mdi" :class="icon"></span>
    &nbsp;
    <slot/>
  </button>
</template>
<script setup>
defineProps(["icon"])
</script>
