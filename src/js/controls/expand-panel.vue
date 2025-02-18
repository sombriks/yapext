<template>
  <div class="container">
    <div v-if="!expanded" class="row">
      <base-button
          :icon
          :color
          :border
          @click="expanded = true">{{ title }}
      </base-button>
    </div>
    <base-panel
        v-if="expanded"
        :hideBack
        @back="expanded = false">
      <template #title>
        {{ title }}
      </template>
      <template #default>
        <slot name="default"></slot>
      </template>
    </base-panel>
  </div>
</template>
<script setup>
import BaseButton from '../elements/base-button.vue'
import BasePanel from "../elements/base-panel.vue"

defineProps(["title", "icon", "color", "border", "hideBack"])

const expanded = defineModel("expanded")
</script>
<style scoped>
.container {
  margin: 1rem;
  display: flex;
  justify-content: space-between;
}

button, .row {
  width: 100%;
}
</style>
