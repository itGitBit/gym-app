<template>
  <div v-if="workoutModalVisible">
    <div class="overlay"></div>
    <div class="workout-modal">
      <WorkoutModal
        @closeModal="workoutModalVisible = false"
        :workouts="workoutsForDayRef"
        @workoutsUpdated="fetchMonthWorkouts"
      />
    </div>
  </div>
  <div class="container">
    <aside>
      <h1>Filter Workouts:</h1>
      <div class="filter">
        <div class="trainer-filter">
          <h2>By Trainer:</h2>
          <TrainerDropdown
            :trainers="trainers"
            @select-trainer="filterWorkoutsByTrainer"
          />
        </div>
        <div class="trainee-filter">
          <h2>By Trainee:</h2>
          <select @change="filterWorkoutsByTrainee" class="dropdown-select">
            <option>Select Trainee</option>
            <option
              v-for="trainee in trainees"
              :key="trainee.id"
              :value="JSON.stringify(trainee)"
            >
              {{ trainee.name }}
            </option>
          </select>
          
        </div>
      </div>
    </aside>
    <div class="monthly-calendar">
      <div class="header">
        <button @click="previousMonth">&lt;</button>
        <button class="current-month" @click="setCurrent">
          {{ `go to ${dayjs().format("MMMM")}` }}
        </button>
        <h2>{{ currentMonth.format("MMMM YYYY") }}</h2>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="days-of-week">
        <div v-for="day in daysOfWeek" :key="day" class="day">{{ day }}</div>
      </div>
      <div class="days">
        <div
          v-for="day in daysInMonth"
          :key="day.date"
          class="day"
          :class="{ 'has-workout': day.hasWorkout }"
        >
          {{ day.day }}
          <span
            @click="openWorkoutModal(day.workoutsForDay)"
            v-if="day.hasWorkout"
            class="workout-times"
          >
            {{
              day.workoutsForDay.length > 1
                ? `${day.workoutsForDay.length} workouts`
                : day.startTime
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <button
      v-if="user.type === 'trainer'"
      @click="router.push('/workouts/create')"
    >
      Add Workout
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import dayjs from "dayjs";
import WorkoutModal from "../WorkoutModal/WorkoutModal.vue";
import { getMonthWorkouts } from "../../../Utils/apiCalls";
import { useUserStore } from "../../../stores/userStores";
import { useRouter } from "vue-router";
import TrainerDropdown from "../../Trainer/TrainerDropdown/TrainerDropdown.vue";
import { getAllTrainers, getAllTrainees } from "../../../Utils/apiCalls";

const router = useRouter();
const store = useUserStore();
const currentMonth = ref(dayjs());
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const workouts = ref([]);
const workoutsForDayRef = ref([]);
const workoutModalVisible = ref(false);
const user = ref(store.getUser());
const filteredTrainer = ref("");
const trainers = ref([]);
const data = ref([]);
const trainees = ref([]);

const daysInMonth = computed(() => {
  const firstDayOfMonth = currentMonth.value.startOf("month").day();
  const totalDaysInMonth = currentMonth.value.daysInMonth();
  const days = [];

  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = currentMonth.value.date(i);
    const workoutsForDay = workouts.value
      ? workouts.value.filter((workout) =>
          dayjs(workout.date).isSame(date, "day")
        )
      : [];
    const hasWorkout = workoutsForDay.length > 0;
    const startTime = hasWorkout
      ? workoutsForDay
          .map((workout) =>
            workout.start_time.substring(0, workout.start_time.length - 3)
          )
          .join(" ")
      : "";

    days.push({
      date: date.format("YYYY-MM-DD"),
      day: i,
      hasWorkout: hasWorkout,
      startTime: startTime,
      workoutsForDay: workoutsForDay,
    });
  }

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.unshift({
      date: null,
      day: "",
      hasWorkout: false,
      startTime: "",
    });
  }

  return days;
});

const setCurrent = () => {
  currentMonth.value = dayjs();
  fetchMonthWorkouts();
};

const previousMonth = () => {
  currentMonth.value = currentMonth.value.subtract(1, "month");
  fetchMonthWorkouts();
};

const nextMonth = () => {
  currentMonth.value = currentMonth.value.add(1, "month");
  fetchMonthWorkouts();
};

const fetchMonthWorkouts = async () => {
  const year = currentMonth.value.year();
  const month = currentMonth.value.month() + 1;
  workouts.value = await getMonthWorkouts(year, month);
  data.value = workouts.value;
};

const openWorkoutModal = (todaysWorkouts) => {
  workoutsForDayRef.value = todaysWorkouts;
  workoutModalVisible.value = true;
};

const fetchTrainers = async () => {
  const data = await getAllTrainers();
  trainers.value = data;
};

const fetchTrainees = async () => {
  const data = await getAllTrainees();
  trainees.value = data;
};

const filterWorkoutsByTrainer = (trainer) => {
  filteredTrainer.value = trainer;
  workouts.value = data.value;
  if (trainer == "") {
    return;
  }
  workouts.value = workouts.value.filter((workout) =>
    workout.trainer_workouts.some(
      (trainerWorkout) => trainerWorkout.trainer.id === trainer.id
    )
  );
};
const filterWorkoutsByTrainee = (event) => {
  workouts.value = data.value;
  if (event.target.value === "Select Trainee") {
    return;
  }
  const trainee = JSON.parse(event.target.value);
  workouts.value = data.value;

  workouts.value = workouts.value.filter((workout) =>
    workout.trainee_workouts.some(
      (traineeWorkout) => traineeWorkout.trainee.id === trainee.id
    )
  );
};

onMounted(() => {
  if (filteredTrainer.value) {
    filterWorkoutsByTrainer(filteredTrainer.value);
  }
  if (!store.isUserLoggedIn()) {
    router.push("/");
    return;
  }
  fetchMonthWorkouts();
  fetchTrainers();
  fetchTrainees();
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
}

aside {
  flex: 1;
  max-width: 300px;
  padding: 20px;
  border: #95c03a solid 1px;
  display: flex;
  flex-direction: column;
}

.monthly-calendar {
  flex: 3;
  max-width: 800px;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
}

.days-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  text-align: center;
  padding: 10px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  text-align: center;
  padding: 10px;
}

.has-workout {
  background-color: #95c03a;
  font-weight: bold;
  color: white;
}

.workout-times {
  display: block;
  overflow: auto;
  font-weight: lighter;
  overflow: hidden;
  cursor: pointer;
  font-size: small;
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

.workout-modal {
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

.trainee-filter {
  margin-top: 50px;
}

.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  aside {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .monthly-calendar {
    max-width: 100%;
  }
}
</style>
