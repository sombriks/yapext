<template>
  <div class="container'">
    <button>{{title}}</button>
  </div>
</template>
<script setup>
defineProps(["title"])

</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>
