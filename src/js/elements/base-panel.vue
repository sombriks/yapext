<template>
  <div class="frame">
    <div class="title">
      <button v-if="!hideBack"
              @click="emit('back')">
        <span class="mdi mdi-arrow-left"></span>
      </button>
      <span v-if="!hideBack">&nbsp;</span>
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="default"></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script setup>
defineProps(["hideBack"])
const emit = defineEmits(["back"]);
</script>
<style scoped>
.title {
  display: flex;
}

.actions {
  display: flex;
  flex-direction: row-reverse;
}
</style>
