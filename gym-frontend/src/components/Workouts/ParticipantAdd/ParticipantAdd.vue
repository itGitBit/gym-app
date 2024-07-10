<template>
  <div class="add-trainer-modal" v-if="isAddingTrainer">
    <div class="overlay"></div>
    <div class="modal">
      <CreateTrainer @trainerCreated="isAddingTrainer = false" />
      <button @click="isAddingTrainer = false" class="close-modal">Close</button>
    </div>
  </div>
  <div class="add-trainee-modal" v-if="isAddingTrainee">
    <div class="overlay"></div>
    <div class="modal">
      <CreateTrainee @traineeCreated="isAddingTrainee=false" />
      <div class="input">
        <button @click="isAddingTrainee = false" class="close-modal">Close</button>
      </div>
    </div>
  </div>
  <div>
    <div class="input">
      <label for="trainerIds">Trainers: </label>
      <TrainerDropdown ref="trainerDropdown" :trainers="trainers" @select-trainer="updateSelectedTrainer" />
      <button v-if="isUserATrainer" type="button" @click="isAddingTrainer = true">
        Create New Trainer
      </button>
    </div>
    <div class="selected-bar">
      <span @click="removeSelectedTrainer(trainer.id)" class="trainer-badge" v-for="trainer in selectedTrainers"
        :key="trainer.id">{{ trainer.name }}</span>
    </div>
    <div class="input">
      <label for="traineeIds">Trainees: </label>
      <select class="dropdown-select" @change="updateTraineeList" id="traineeIds" name="traineeIds" ref="traineeSelect">
        <option class="dropdown-option">Select Profile</option>
        <option class="dropdown-option" v-for="trainee in trainees" :key="trainee.id" :value="JSON.stringify(trainee)">
          {{ trainee.name }}
        </option>
      </select>
      <button type="button" @click="isAddingTrainee=true">
        Create New Trainee
      </button>
    </div>

    <div class="selected-bar">
      <span @click="removeTraineeFromList(trainee.id)" class="trainee-badge" v-for="trainee in selectedTrainees"
        :key="trainee.id">{{ trainee.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import TrainerDropdown from "../../Trainer/TrainerDropdown/TrainerDropdown.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStores";
import CreateTrainer from "../../Trainer/CreateTrainer/CreateTrainer.vue";
import CreateTrainee from "../../Trainee/CreateTrainee/CreateTrainee.vue";
import { getAllTrainees, getAllTrainers } from "../../../Utils/apiCalls";

const props = defineProps({
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
const trainees = ref([]);
const trainers = ref([]);
const selectedTrainers = ref([]);
const selectedTrainees = ref([]);
const isUserATrainer = ref(store.getUser().type === "trainer");
const traineeSelect = ref(null);
const trainerDropdown = ref(null);
const isAddingTrainer = ref(false);
const isAddingTrainee = ref(false);

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

watch(isAddingTrainer, (newVal) => {
  if (!newVal) {
    getTrainers();
  }
});
watch(isAddingTrainee, (newVal) => {
  if (!newVal) {
    getTrainees();
  }
});


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

const getTrainers = async () => {
  const response =await getAllTrainers();
  trainers.value = response;
}

const getTrainees = async () => {
  const response = await getAllTrainees();
  trainees.value = response;
}


onMounted(async() => {
  await getTrainers();
  await getTrainees();

  if (props.updatedTrainers) {
    selectedTrainers.value = props.updatedTrainers;

  }
  if (props.updatedTrainees) {
    selectedTrainees.value = props.updatedTrainees;
  }
});

</script>

<style scoped>
.input {
  margin-bottom: 1rem;
}

.selected-bar {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  grid-auto-flow: dense;
  /* Ensures grid items fill available space without expanding */
}

.trainer-badge,
.trainee-badge {
  display: inline-block;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
  max-height: 1.5rem;
  overflow: hidden;
  min-width: 150px;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.6rem;
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
  white-space: nowrap;
  text-overflow: clip;
  transform: scale(1.1);
  box-shadow: 5px 10px 8px rgba(0, 0, 0, 0.2);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(82, 82, 82, 0.84);
  z-index: 997;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(110, 110, 110);
  padding: 20px;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 998;
  box-shadow: 5px 10px 8px rgba(0, 0, 0, 0.2);
}
</style>
