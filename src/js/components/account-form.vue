<template>
  <form @submit.prevent.stop="emit('save', _account)">
    <base-radio label="Account type" :options="types" v-model="_account.icon"/>
    <base-input label="Description" v-model="_account.description"/>
    <!--    <color-chooser label="Color" v-model="_account.color"/>-->
    <base-input label="Color" v-model="_account.color"/>
    <base-input label="Account limit" type="number" v-model="_account.limit"/>
    <base-input label="Closure day" type="number" v-model="_account.closureDay"/>
    <base-input label="Due day" type="number" v-model="_account.dueDay"/>
    <div>
      <base-button icon="mdi-check-outline" color="green" type="submit"/>
      <base-button icon="mdi-close-outline" color="orange" type="button"
                   @click="emit('cancel', _account)"/>
      <base-button v-if="_account.id" icon="mdi-trash-can-outline"
                   color="red" type="button"
                   @click="emit('del', _account)"/>
    </div>
  </form>
</template>
<script setup>
import {ref} from "vue"

import BaseInput from "../elements/base-input.vue"
import BaseButton from "../elements/base-button.vue"
import BaseRadio from "../elements/base-radio.vue";

const props = defineProps(["account"])
const emit = defineEmits(["save", "cancel", "del"])

const _account = ref({...props.account})
const types = ref([
  {label: "Wallet", value: "mdi-wallet-outline"},
  {label: "Bank", value: "mdi-bank-outline"},
  {label: "Credit card", value: "mdi-credit-card-outline"},
])

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
