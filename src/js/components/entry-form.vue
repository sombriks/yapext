<template>
  <form @submit.prevent.stop="emit('save', _entry)">
    <base-selector label="Category" :options="categories" v-model="_entry.categories_id"/>
    <base-selector label="Account" :options="accounts" v-model="_entry.accounts_id"/>
    <base-input label="Description" v-model="_entry.description"/>
    <base-input label="Amount" type="number" v-model="_entry.amount"/>
    <base-date label="Due date" v-model="_entry.dueDate"/>
    <i>...</i>
    <div>
      <base-button icon="mdi-check-outline" color="green" type="submit"/>
      <base-button icon="mdi-close-outline" color="orange" type="button"
                   @click="emit('cancel', _entry)"/>
      <base-button v-if="_entry.id" icon="mdi-trash-can-outline"
                   color="red" type="button"
                   @click="emit('del', _entry)"/>
    </div>
  </form>
</template>
<script setup>
import {ref} from "vue";

import BaseDate from "../controls/base-date.vue"
import BaseInput from "../controls/base-input.vue"
import BaseButton from "../controls/base-button.vue"
import BaseSelector from "../controls/base-selector.vue"

const props = defineProps(["entry", "categories", "accounts"])
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
