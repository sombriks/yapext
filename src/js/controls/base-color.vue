<template>
  <div class="content">
    <span @click="expanded = !expanded">{{ label }}</span>
    <div>
      <base-button v-if="!expanded" :color @click="expanded = true">{{ color }}</base-button>
      <fieldset v-else>
        <legend>rgb({{ r }},{{g}},{{b}})</legend>
        <input v-model="r" min="0" max="255" type="range"/>
        <input v-model="g" min="0" max="255" type="range"/>
        <input v-model="b" min="0" max="255" type="range"/>
        <div>
          <base-button
              icon="mdi-check-outline"
              color="green"
              @click.prevent.stop="done"/>
          <base-button
              icon="mdi-close-outline"
              color="orange"
              @click.prevent.stop="expanded = false"/>

        </div>
      </fieldset>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue"

import BaseButton from "./base-button.vue"

defineProps(["label"])
const color = defineModel()

const expanded = ref(false)
const r = ref(255)
const g = ref(255)
const b = ref(255)

function done() {
  expanded.value = false
  color.value = `rgb(${r.value}, ${g.value}, ${b.value})`
}

onMounted(() => {
  const comps = color.value?.replace(/rgb\((.*)\)/,"$1").split(",")
  if(comps.length === 3) {
    r.value = comps[0]
    g.value = comps[1]
    b.value = comps[2]
  }
})
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

fieldset {
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  color: rgb(v-bind(r), v-bind(g), v-bind(b));
  border-color: rgb(v-bind(r), v-bind(g), v-bind(b));
}

fieldset > div {
  display: flex;
  flex-direction: row-reverse;
}

div > button {
  margin-right: 1em;
}
</style>
