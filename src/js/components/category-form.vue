<template>
  <form @submit.prevent.stop="emit('save', _category)">
    <text-input label="Description" v-model="_category.description"/>
    <text-input label="Color" v-model="_category.color"/>
    <div>
      <input type="submit"/>
    </div>
  </form>
</template>
<script setup>
import {ref} from "vue"

import TextInput from "../controls/text-input.vue"

const props = defineProps(["category"])
const emit = defineEmits(["save"])

const _category = ref({...props.category})

</script>
<style scoped>
div {
  display: flex;
  flex-direction: row-reverse;
}
</style>
