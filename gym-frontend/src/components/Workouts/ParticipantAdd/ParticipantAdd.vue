<template>
  <div>
    <div class="input">
      <label for="trainerIds">Trainers: </label>
      <TrainerDropdown
        ref="trainerDropdown"
        :trainers="trainers"
        @select-trainer="updateSelectedTrainer"
      />
      <button
        v-if="isUserATrainer"
        type="button"
        @click="router.push('/add-trainer')"
      >
        Add Trainer
      </button>
    </div>
    <div class="selected-bar">
      <span
        @click="removeSelectedTrainer(trainer.id)"
        class="trainer-badge"
        v-for="trainer in selectedTrainers"
        :key="trainer.id"
        >{{ trainer.name }}</span
      >
    </div>
    <div class="input">
      <label for="traineeIds">Trainees: </label>
      <select
        class="dropdown-select"
        @change="updateTraineeList"
        id="traineeIds"
        name="traineeIds"
        ref="traineeSelect"
      >
        <option class="dropdown-option">Select Profile</option>
        <option
          class="dropdown-option"
          v-for="trainee in trainees"
          :key="trainee.id"
          :value="JSON.stringify(trainee)"
        >
          {{ trainee.name }}
        </option>
      </select>
      <button type="button" @click="router.push('/add-trainee')">
        Add Trainee
      </button>
    </div>

    <div class="selected-bar">
      <span
        @click="removeTraineeFromList(trainee.id)"
        class="trainee-badge"
        v-for="trainee in selectedTrainees"
        :key="trainee.id"
        >{{ trainee.name }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from "vue";
import TrainerDropdown from "../../Trainer/TrainerDropdown/TrainerDropdown.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStores";

const props = defineProps({
  trainers: {
    type: Array,
    required: true,
  },
  trainees: {
    type: Array,
    required: true,
  },
  resetSignal: {
    type: Boolean,
    required: true,
  },
  updatedTrainers: {
    type: Array,
  },
  updatedTrainees: {
    type: Array,
  },
});
const store = useUserStore();
const emit = defineEmits(["changeWarningText", "participantsSelected"]);
const router = useRouter();
const selectedTrainers = ref([]);
const selectedTrainees = ref([]);
const isUserATrainer = ref(store.getUser().type === "trainer");
const traineeSelect = ref(null);
const trainerDropdown = ref(null);

watch(
  () => props.resetSignal,
  (newVal) => {
    if (newVal) {
      selectedTrainers.value = [];
      selectedTrainees.value = [];
      resetDropdowns();
      emitParticipants();
    }
  }
);

const resetDropdowns = () => {
  if (traineeSelect.value) {
    traineeSelect.value.value = "Select Profile";
  }
  if (trainerDropdown.value) {
    trainerDropdown.value.reset();
  }
};

const emitParticipants = () => {
  emit("participantsSelected", {
    trainers: selectedTrainers.value,
    trainees: selectedTrainees.value,
  });
};

const updateTraineeList = (event) => {
  if (!event.target.value || event.target.value === "Select Profile") {
    emit("changeWarningText", "");
    return;
  }
  const trainee = JSON.parse(event.target.value);
  const isTraineeSelected = selectedTrainees.value.some(
    (selectedTrainee) => selectedTrainee.id === trainee.id
  );
  if (isTraineeSelected) {
    emit("changeWarningText", "Trainee already selected");
    return;
  }
  selectedTrainees.value.push(trainee);
  emit("changeWarningText", "");
  emitParticipants();
};

const removeSelectedTrainer = (trainerId) => {
  selectedTrainers.value = selectedTrainers.value.filter(
    (trainer) => trainer.id !== trainerId
  );
  emitParticipants();
};

const removeTraineeFromList = (traineeId) => {
  selectedTrainees.value = selectedTrainees.value.filter(
    (trainee) => trainee.id !== traineeId
  );
  emitParticipants();
};

const updateSelectedTrainer = (trainer) => {
  if (!trainer || trainer === "Select Profile") {
    emit("changeWarningText", "");
    return;
  }
  const trainerObj = JSON.parse(trainer);
  const isTrainerSelected = selectedTrainers.value.some(
    (selectedTrainer) => selectedTrainer.id === trainerObj.id
  );
  if (isTrainerSelected) {
    emit("changeWarningText", "Trainer already selected");
    return;
  }
  selectedTrainers.value.push(trainerObj);
  emit("changeWarningText", "");
  emitParticipants();
};

onMounted(() => {
  console.log(props.updatedTrainers);
  if (props.updatedTrainers) {
    selectedTrainers.value = props.updatedTrainers;
  }
  if (props.updatedTrainees) {
    selectedTrainees.value = props.updatedTrainees;
  }
});
</script>

<style scoped>
.trainer-badge,
.trainee-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
}

.trainer-badge:hover::after,
.trainee-badge:hover::after {
  content: " ×";
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
  font-weight: bold;
}

.trainer-badge:hover,
.trainee-badge:hover {
  background-color: #95c03a;
}
</style>
