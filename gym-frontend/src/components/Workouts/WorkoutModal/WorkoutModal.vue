<template>
    <div v-if="!selectedWorkout" class="workout-selector">
        <select @change="chooseWorkout" class="dropdown-select">
            <option class="dropdown-option">Select Workout</option>
            <option class="dropdown-option" v-for="workout in workouts" :key="workout.id" :value="workout.id">
                {{ workout.start_time }}
            </option>
        </select>
    </div>
    <div v-if="selectedWorkout" class="workout-display">
        <h3>{{formatWorkoutDate(selectedWorkout.date) }}</h3>
        <h2>{{ selectedWorkout.start_time }}</h2>
        <h3>Coaches : </h3>
        <p v-for="trainer in selectedWorkout.trainer_workouts" :key="trainer.trainer.id">{{ trainer.trainer.name }}</p>
        <h3>Who's joinning the party : </h3>
        <p v-for="trainee in selectedWorkout.trainee_workouts" :key="trainee.trainee.id">{{ trainee.trainee.name }}</p>
        <button @click="selectedWorkout=null">Go back</button>
    </div>
    <div class="close-button">
        <button @click="$emit('closeModal')">Close</button>
        
    </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, onMounted, defineEmits } from 'vue';
import { getTrainees, getTrainers } from '../../../../Utils/apiCalls.js'

const props = defineProps({
    workouts: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['closeModal'])

const selectedWorkout = ref(null);
const trainers = ref([])
const trainersInWorkout = ref([])
const trainees = ref([])
const traineesInWorkout = ref([])


const chooseWorkout = (event) => {
    const selectedId = Number(event.target.value);
    selectedWorkout.value = props.workouts.find(workout => workout.id === selectedId);
    
}

const formatWorkoutDate = (date) => {
  return dayjs(date).format('DD MM YYYY');
};

const getRefs = async () => {
    trainees.value = await getTrainees();
    trainers.value = await getTrainers();
}

onMounted(() => {
    getRefs();
})
</script>