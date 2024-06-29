<template>
    <div v-if="!selectedWorkout" class="workout-selector">
        <select @change="chooseWorkout" class="dropdown-select">
            <option class="dropdown-option">Select Workout</option>
            <option class="dropdown-option" v-for="workout in workouts" :key="workout.id"
                :value="JSON.stringify(workout)">
                {{ workout.name }}</option>
        </select>
    </div>


</template>
<script setup>
import { ref, defineProps } from 'vue';


constWorkoutsForToday = defineProps({
    workouts: Array
});

const selectedWorkout = ref(null);



</script>