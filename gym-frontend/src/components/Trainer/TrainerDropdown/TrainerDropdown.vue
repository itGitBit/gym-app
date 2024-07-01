<template>
  <select @change="updateSelectedTrainer" class="dropdown-select">
      <option class="dropdown-option">Select Profile</option>
      <option class="dropdown-option" v-for="trainer in trainers" :key="trainer.id" :value="JSON.stringify(trainer)">
          {{
              trainer.name }}</option>
  </select>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
trainers: Array
});


const emit = defineEmits(['select-trainer']);


const updateSelectedTrainer = (event) => {
emit('select-trainer', event.target.value);
};


</script>
<style scoped>

</style>