<template>
  <form @submit.prevent.stop="emit('save', _category)">
    <base-input label="Description" v-model="_category.description"/>
    <base-input label="Color" v-model="_category.color"/>
    <base-input label="Expected income/expense" type="number" v-model="_category.limit"/>
    <div>
      <base-button icon="mdi-check-outline" color="green" type="submit"/>
      <base-button icon="mdi-close-outline" color="orange" type="button"
                   @click="emit('cancel', _category)"/>
      <base-button v-if="_category.id"  icon="mdi-trash-can-outline"
                   color="red" type="button"
                   @click="emit('del', _category)"/>
    </div>
  </form>
</template>
<script setup>
import {ref} from "vue"

import BaseInput from "../elements/base-input.vue"
import BaseButton from "../elements/base-button.vue"

const props = defineProps(["category"])
const emit = defineEmits(["save", "cancel", "del"])

const _category = ref({...props.category})

</script>
<style scoped>
div {
  display: flex;
  flex-direction: row-reverse;
}

div > button {
  margin-left: 1rem;
}
</style>
