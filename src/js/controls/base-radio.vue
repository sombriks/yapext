<template>
  <fieldset>
    <legend>{{label}}</legend>
    <label v-for="option in options" :key="option.value">
      <span>{{ option.label }}</span>
      <input
          type="radio"
          :name="label"
          :value="option.value"
          :checked="option.value == selected"
          @input="selected = option.value"/>
    </label>
  </fieldset>
</template>
<script setup>
defineProps(["label", "options"])
const selected = defineModel()
</script>
<style scoped>
label {
  margin-left: 1rem;
}

fieldset {
  border-radius: 1rem;
}
</style>
