<template>
  <div v-if="workoutModalVisible">
    <div class="overlay"></div>
    <div class="workout-modal">
      <WorkoutModal
        @closeModal="workoutModalVisible = false"
        :workouts="workoutsForDayRef"
      />
    </div>
  </div>
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
          {{ day.startTime }}
        </span>
      </div>
    </div>
  </div>
  <div class="main">
    <button v-if="user.type==='trainer'" @click="router.push('/create-workout')">Add Workout</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import dayjs from "dayjs";
import WorkoutModal from "../WorkoutModal/WorkoutModal.vue";
import { getMonthWorkouts } from "../../../../Utils/apiCalls";
import { useUserStore } from "../../../stores/userStores";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();
const currentMonth = ref(dayjs());
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const workouts = ref([]);
const workoutsForDayRef = ref([]);
const workoutModalVisible = ref(false);
const user = ref(store.getUser());

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
};

const openWorkoutModal = (todaysWorkouts) => {
  workoutsForDayRef.value = todaysWorkouts;
  workoutModalVisible.value = true;
};


onMounted(() => {
  if (!store.isUserLoggedIn()) {
    router.push("/");
    return;
  }
  fetchMonthWorkouts();
});
</script>

<style scoped>
.monthly-calendar {
  max-width: 600px;
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
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(82, 82, 82, 0.84);
  z-index: 999;
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
  z-index: 1000;
  box-shadow: 5px 10px 8px rgba(0, 0, 0, 0.2);
}
</style>
