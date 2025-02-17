<template>
  <form @submit.prevent.stop="emit('save', _entry)">
    <base-input label="Description" v-model="_entry.description"/>
    <div>
      <base-button icon="mdi-check-outline" color="green" type="submit"/>
      <base-button icon="mdi-close-outline" color="orange" type="button"
                   @click="emit('cancel', _entry)"/>
      <base-button v-if="_entry.id"  icon="mdi-trash-can-outline"
                   color="red" type="button"
                   @click="emit('del', _entry)"/>
    </div>
  </form>
</template>
<script setup>
import {ref} from "vue";

import BaseInput from "../elements/base-input.vue"
import BaseButton from "../elements/base-button.vue"

const props = defineProps(["entry"])
const emit = defineEmits(["save", "cancel", "del"])

const _entry = ref({...props.entry})

</script>
<style scoped>

div {
  display: flex;
  flex-direction: row-reverse;
}

div > button {
  margin: 1rem;
}
</style>
