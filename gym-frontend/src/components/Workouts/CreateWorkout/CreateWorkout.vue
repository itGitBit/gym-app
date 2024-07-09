<template>
  <div class="main">
    <h1>Create a New Workout</h1>
    <form @submit.prevent="onSubmit" class="form-create">
      <div class="input">
        <label for="workoutDuration">Workout Duration in Minutes: </label>
        <input
          v-model="durationInMinutes"
          type="number"
          id="workoutDuration"
          name="workoutDuration"
          required
          max="180"
        />
      </div>
      <div class="input">
        <label for="workoutDate">Workout Date</label>
        <input
          v-model="date"
          type="date"
          id="workoutDate"
          name="workoutDate"
          required
        />
      </div>
      <div class="input">
        <label for="workoutStartTime">Workout Start Time</label>
        <input
          v-model="startTime"
          type="time"
          id="workoutStartTime"
          name="workoutStartTime"
          required
        />
      </div>
      <AddParticipants
        @changeWarningText="handleWarningText"
        @participantsSelected="updateParticipants"
        :trainers="trainers"
        :trainees="trainees"
        :resetSignal="resetSignal"
      />

      <div class="form-buttons">
        <p class="warning" v-if="warning">{{ warning }}</p>
        <button class="submit-button" type="submit">Submit</button>
        <button type="button" @click="onResetForm" class="reset-button">
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  createWorkout,
  getAllTrainees,
  getAllTrainers,
} from "../../../Utils/apiCalls";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStores";
import AddParticipants from "../ParticipantAdd/ParticipantAdd.vue";
import { validateWorkout } from "../../../Utils/validations";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useUserStore();
const router = useRouter();
const trainers = ref([]);
const trainees = ref([]);
const date = ref("");
const startTime = ref("");
const durationInMinutes = ref("");
const warning = ref("");
const resetSignal = ref(false);
const trainersIds = ref([]);
const traineesIds = ref([]);

const onResetForm = () => {
  date.value = "";
  startTime.value = "";
  durationInMinutes.value = "";
  warning.value = "";
  trainersIds.value = [];
  traineesIds.value = [];
  resetSignal.value = !resetSignal.value;
};

const updateParticipants = ({ trainers, trainees }) => {
  trainersIds.value = trainers.map((trainer) => trainer.id);
  traineesIds.value = trainees.map((trainee) => trainee.id);
};

const onSubmit = async () => {
  const workout = {
    workout: {
      date: formatDate(),
      start_time: `${startTime.value}:00`,
      duration_in_minutes: durationInMinutes.value,
      trainer_ids: trainersIds.value,
      trainee_ids: traineesIds.value,
    },
  };
  if (!validateWorkout(workout.workout)) {
    return;
  }
  const response = await createWorkout(workout);
  toast.success(`Workout created successfully! on ${formatDate()} at ${startTime.value}
  `);
  router.push("/trainers/dashboard");
};

const formatDate = () => {
  const formattedDate = new Date(date.value).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};

const getTraineesList = async () => {
  const data = await getAllTrainees();
  trainees.value = data;
};

const handleWarningText = (warningText) => {
  warning.value = warningText;
};

const getTrainerList = async () => {
  const data = await getAllTrainers();
  trainers.value = data;
};

onMounted(() => {
  if (store.getUser().type !== "trainer") {
    router.push("/");
  }
  getTrainerList();
  getTraineesList();
});
</script>

<style scoped>
.warning {
  color: red;
  font-weight: bold;
}
</style>
