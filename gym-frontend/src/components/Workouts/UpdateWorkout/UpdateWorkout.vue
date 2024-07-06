<template>
  <div class="main">
    <h1>Edit Workout</h1>
    <div class="workout-edit" v-if="workout">
      <form @submit.prevent="handleSubmit" class="form-create">
        <div class="input">
          <label for="workoutDuration">Workout Duration in Minutes: </label>
          <input v-model="workout.duration_in_minutes" type="number" id="workoutDuration" name="workoutDuration"
            required />
        </div>
        <div class="input">
          <label for="workoutDate">Workout Date</label>
          <input v-model="workout.date" type="date" id="workoutDate" name="workoutDate" required />
        </div>
        <div class="input">
          <label for="workoutStartTime">Workout Start Time</label>
          <input v-model="workout.start_time" type="time" id="workoutStartTime" name="workoutStartTime" required />
        </div>
        <AddParticipants @changeWarningText="handleWarningText" @participantsSelected="updateParticipants"
          :trainers="trainers" :trainees="trainees" :resetSignal="resetSignal" :updatedTrainers="trainersFromWorkout"
          :updatedTrainees="traineesFromWorkout" />
        <div class="form-buttons">
          <p class="warning" v-if="warning">{{ warning }}</p>
          <button class="reset-button" @click="obliterateWorkout(workout.id)">
            Delete Workout
          </button>
          <button type="submit">Update Workout</button>
          <RouterLink to="/">
            <button class="nav-button" title="Trainee login">Trainee Login</button>
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getWorkoutById, updateWorkout, getAllTrainees, getAllTrainers } from "../../../Utils/apiCalls.js";
import AddParticipants from "../ParticipantAdd/ParticipantAdd.vue";
import { validateWorkout } from "../../../Utils/validations.js";


const router = useRouter();
const route = useRoute();
const workoutId = route.params.workoutId;
const workout = ref(null);
const trainers = ref([]);
const trainees = ref([]);
const warning = ref("");
const resetSignal = ref(false);
const trainersIds = ref([]);
const traineesIds = ref([]);
const traineesFromWorkout = ref([]);
const trainersFromWorkout = ref([]);


const getWorkoutAndRefIt = async () => {
  workout.value = await getWorkoutById(workoutId);
  for (const trainer of workout.value.trainer_workouts) {
    trainersFromWorkout.value.push(trainer.trainer);
  }
  for (const trainee of workout.value.trainee_workouts) {
    traineesFromWorkout.value.push(trainee.trainee);
  }

};
const handleSubmit = async () => {
  const updatedWorkout = {
    id: workout.value.id,
    date: workout.value.date,
    start_time: workout.value.start_time,
    duration_in_minutes: workout.value.duration_in_minutes,
    trainer_ids: trainersIds.value,
    trainee_ids: traineesIds.value
  };
  if (!validateWorkout(updatedWorkout)) {
    return;
  }
  const response = await updateWorkout(updatedWorkout);
  router.push("/workouts");
}

const getTraineesAndTrainers = async () => {
  const trainersResponse = await getAllTrainers();
  const traineesResponse = await getAllTrainees();
  trainers.value = trainersResponse;
  trainees.value = traineesResponse;
};

const handleWarningText = (warningText) => {
  warning.value = warningText;
};

const updateParticipants = ({ trainers, trainees }) => {
  trainersIds.value = trainers.map((trainer) => trainer.id);
  traineesIds.value = trainees.map((trainee) => trainee.id);
};

onMounted(() => {
  getWorkoutAndRefIt();
  getTraineesAndTrainers();

});
</script>

<style scoped>
.workout-edit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.input-field {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
}

input[type="number"] {
  width: 5vw;
}
</style>
