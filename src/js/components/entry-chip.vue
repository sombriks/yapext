<template>
  <expand-panel
      v-model:expanded="expanded"
      icon="mdi-cash-multiple"
      title="New Entry">
    <entry-form :entry @save="save" @cancel="cancel" @del="del">/>

    </entry-form>
  </expand-panel>
</template>
<script setup>
import {ref} from "vue";

import ExpandPanel from "../controls/expand-panel.vue";
import EntryForm from "./entry-form.vue";

defineProps(["entry"])

const expanded = ref(false);

function save(e){}
function cancel(e){}
function del(e){}

</script>
<style scoped>

</style>
