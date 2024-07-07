<template>
  <div v-if="isParticipantsModalOpen">
    <div class="overlay"></div>
    <div class="workout-modal">
      <ParticipantList
        @closeParticipantsModal="closeListModal"
        :participants="participantsForModal"
      />
    </div>
  </div>
  <div class="workout-display">
    <div class="close-container">
      <h2 class="modal-title">{{ formatWorkoutDate(workouts[0].date) }}</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>Trainers</th>
          <th>Trainees</th>
          <th>Time</th>
          <th>Duration</th>
          <th v-if="user.type==='trainer'">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workout in workouts" :key="workout.id">
          <td class="trainer-cell">
            <button
              v-if="workout.trainer_workouts.length > 1"
              @click="openTrainersModal(workout.trainer_workouts)"
            >
              Trainer List
            </button>
            <p
              v-else
              v-for="trainerWorkout in workout.trainer_workouts"
              :key="trainerWorkout.trainer.id"
            >
              {{ trainerWorkout.trainer.name }}
            </p>
          </td>
          <td class="trainee-cell">
            <button @click="openTraineesModal(workout.trainee_workouts)">
              Trainee List
            </button>
          </td>
          <td>{{ ` ${formatWorkoutTime(workout.start_time)}` }}</td>
          <td>{{ workout.duration_in_minutes }} minutes</td>
          <td>
            <RouterLink v-if="user.type==='trainer'"
              :to="{ name: 'UpdateWorkout', params: { workoutId: workout.id } }"
              ><button>Edit</button></RouterLink
            >
            <button v-if="user.type==='trainer'"
              @click="obliterateWorkout(workout.id)"
              class="delete-button"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="close-container">
      <button @click="$emit('closeModal')">Close</button>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, onMounted, defineEmits } from "vue";
import { deleteWorkout } from "../../../Utils/apiCalls.js";
import ParticipantList from "../ParticipantList/ParticipantList.vue";
import { useUserStore } from "../../../stores/userStores";


const props = defineProps({
  workouts: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["closeModal", "workoutsUpdated"]);
const store = useUserStore();
const isParticipantsModalOpen = ref(false);
const participantsForModal = ref([]);
const user = ref(store.getUser());

const openTrainersModal = (workout_trainers) => {
  let trainers = [];
  for (const trainer of workout_trainers) {
    trainers.push(trainer.trainer);
  }
  participantsForModal.value = trainers;
  isParticipantsModalOpen.value = true;
};

const closeListModal = () => {
  isParticipantsModalOpen.value = false;
};

const formatWorkoutTime = (time) => {
  return time.substring(0, 5);
};

const formatWorkoutDate = (date) => {
  return dayjs(date).format("DD MM YYYY");
};

const obliterateWorkout = async (workoutId) => {
  try {
    if (!confirm("Are you sure you want to delete this workout?")) return;
    await deleteWorkout(workoutId);
    emit("workoutsUpdated");
    emit("closeModal");
  } catch (error) {
    console.error("Error deleting workout:", error);
  }
};

const openTraineesModal = (workout_trainees) => {
  let trainees = [];
  for (const trainee of workout_trainees) {
    trainees.push(trainee.trainee);
  }

  participantsForModal.value = trainees;
  isParticipantsModalOpen.value = true;
};
</script>

<style scoped>
.workout-display {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  /* Center align text within the table */
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #797575;
  vertical-align: middle;
}

.modal-title {
  font-weight: bold;
}

thead {
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.486);
}

button {
  margin-right: 5px;
  padding: 5px 10px;
}

.delete-button {
  background-color: #db2219;
}

.delete-button:hover {
  background-color: #a71c15;
}

.close-button {
  margin-top: 20px;
  text-align: center;
}

.close-container {
  display: flex;
  justify-content: center;
}

.trainer-cell p {
  margin: 0;
  text-align: center;
  /* Center align text within the <p> tag */
}
</style>
