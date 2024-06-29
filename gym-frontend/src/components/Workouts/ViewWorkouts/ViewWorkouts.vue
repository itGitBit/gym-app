<template>
    <div class="monthly-calendar">
        <div class="header">
            <button @click="previousMonth">&lt;</button>
            <button class="current-month" @click="setCurrent">{{ `go to ${dayjs().format('MMMM')}` }}</button>
            <h2>{{ currentMonth.format('MMMM YYYY') }}</h2>
            <button @click="nextMonth">&gt;</button>
        </div>
        <div class="days-of-week">
            <div v-for="day in daysOfWeek" :key="day" class="day">{{ day }}</div>
        </div>
        <div class="days">
            <div v-for="day in daysInMonth" :key="day.date" class="day" :class="{ 'has-workout': day.hasWorkout }">
                {{ day.day }}
                <span @click="openWorkoutModal(day.workoutsForDay)" v-if="day.hasWorkout" class="workout-times">{{
                    day.startTime
                }}</span>
            </div>
        </div>
    </div>
    <div v-if="workoutModalVisible" class="workout-modal">
        <WorkoutModal />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import WorkoutModal from '../WorkoutModal/WorkoutModal.vue';
import { getAllWorkouts } from '../../../../Utils/apiCalls'

const currentMonth = ref(dayjs());
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const workouts = ref([]);
const workoutsForDayRef = ref([]);
const workoutModalVisible = ref(false);

const daysInMonth = computed(() => {
    console.log(workouts.value);
    const firstDayOfMonth = currentMonth.value.startOf('month').day();
    const totalDaysInMonth = currentMonth.value.daysInMonth();
    const days = [];

    for (let i = 1; i <= totalDaysInMonth; i++) {
        const date = currentMonth.value.date(i);
        const workoutsForDay = workouts.value.filter(workout => dayjs(workout.date).isSame(date, 'day'));
        workoutsForDayRef.value = workoutsForDay;
        const hasWorkout = workoutsForDay.length > 0;

        const startTime = hasWorkout ? workoutsForDay.map(workout => workout.start_time.substring(0, workout.start_time.length - 3)).join(' ') : '';
        // startTime = startTime.substring(0, startTime.length - 2);

        days.push({
            date: date.format('YYYY-MM-DD'), // Store the date in a specific format if needed
            day: i,
            hasWorkout: hasWorkout,
            startTime: startTime,
            workoutsForDay: workoutsForDay,
        });
    }


    for (let i = 0; i < firstDayOfMonth; i++) {
        days.unshift({
            date: null,
            day: '',
            hasWorkout: false,
            startTime: '',
        });
    }

    return days;
});

const setCurrent = () => {
    currentMonth.value = dayjs();
};

const previousMonth = () => {
    currentMonth.value = currentMonth.value.subtract(1, 'month');
};

const nextMonth = () => {
    currentMonth.value = currentMonth.value.add(1, 'month');
};
const parseWorkoutsToRef = async () => {
    workouts.value = await getAllWorkouts();
};

const openWorkoutModal = (day) => {
    workoutModalVisible.value = true;

}


onMounted(() => {
    parseWorkoutsToRef();
});
</script>

<style scoped>
.monthly-calendar {
    max-width: 600px;
    margin: auto;
    font-family: Arial, sans-serif;
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
    background-color: #209cee;
    /* Example background color */
    font-weight: bold;
    color: white;
}

.workout-times {
    display: block;
    overflow: auto;
    /* font-size: 0.7rem; */
    font-weight: lighter;
    overflow: hidden;
    cursor: pointer;
}
</style>