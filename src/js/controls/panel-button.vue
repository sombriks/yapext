<template>
  <div class="container">
    <base-button
        v-if="!expanded"
        :icon="icon"
        @click="expanded = true">{{ title }}
    </base-button>
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
      <template #actions>
        <slot name="actions"></slot>
      </template>
    </base-panel>
  </div>
</template>
<script setup>
import {ref} from "vue"

import BaseButton from '../elements/base-button.vue'
import BasePanel from "../elements/base-panel.vue";

defineProps(["title", "icon", "hideBack"]);

const expanded = ref(false)
</script>
<style scoped>
.container {
  margin: 1rem;
  display: flex;
  justify-content: space-between;
}

button {
  width: 100%;
}
</style>
