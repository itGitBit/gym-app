<template>
  <div class="main">
    <h1>Edit Workout</h1>
    <div class="workout-edit" v-if="workout">
      <form @submit.prevent="rewriteWorkout" class="form-create">
        <div class="input">
          <label for="workoutDuration">Workout Duration in Minutes: </label>
          <input
            v-model="workout.duration_in_minutes"
            type="number"
            id="workoutDuration"
            name="workoutDuration"
            required
          />
        </div>
        <div class="input">
          <label for="workoutDate">Workout Date</label>
          <input
            v-model="workout.date"
            type="date"
            id="workoutDate"
            name="workoutDate"
            required
          />
        </div>
        <div class="input">
          <label for="workoutStartTime">Workout Start Time</label>
          <input
            v-model="workout.start_time"
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
          :updatedTrainers="workout.trainers"
          :updatedTrainees="workout.trainees"
        />
        <div class="form-buttons">
          <p class="warning" v-if="warning">{{ warning }}</p>
          <button class="reset-button" @click="obliterateWorkout(workout.id)">
            Delete Workout
          </button>
          <button type="submit">Update Workout</button>
          <button type="button" @click="onResetForm" class="reset-button">
          Reset Form
        </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getWorkoutById, updateWorkout } from "../../../../Utils/apiCalls.js";
import AddParticipants from "../ParticipantAdd/ParticipantAdd.vue";

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

const onResetForm = () => {
  date.value = "";
  startTime.value = "";
  durationInMinutes.value = "";
  warning.value = "";
  trainersIds.value = [];
  traineesIds.value = [];
  resetSignal.value = !resetSignal.value;
};

const rewriteWorkout = async () => {
  const response = await updateWorkout(workout.value);
  workout.value = response;
};

const getWorkoutAndRefIt = async () => {
  workout.value = await getWorkoutById(workoutId);
  trainers.value = workout.value.trainers || [];
  trainees.value = workout.value.trainees || [];
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
