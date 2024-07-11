<template>
  <select
    @change="updateSelectedTrainer"
    ref="trainerSelect"
    class="dropdown-select"
  >
    <option class="dropdown-option">Select Profile</option>
    <option
      class="dropdown-option"
      v-for="trainer in trainers"
      :key="trainer.id"
      :value="JSON.stringify(trainer)"
    >
      {{ trainer.name }}
    </option>
  </select>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  trainers: Array,
});

const reset = () => {
  if (trainerSelect.value) {
    trainerSelect.value.value = "Select Profile";
  }
};

const emit = defineEmits(["select-trainer"]);
const trainerSelect = ref(null);

const updateSelectedTrainer = (event) => {
  if (event.target.value === "Select Profile") {
    emit("select-trainer", "");
    return;
  }
  const selectedTrainer = JSON.parse(event.target.value);
  emit("select-trainer", selectedTrainer);
};

defineExpose({ reset });
</script>
<style scoped></style>
