<template>
    <div class="main">
        <h1>Hello <RouterLink title="Edit your details, man!" class="router-link" to="/update-trainee">{{ trainee.name }}</RouterLink></h1>
        <h2>What would you like to do?</h2>
        <RouterLink title="View your workouts" class="router-button" to="/workouts"><button>View Workouts</button></RouterLink>
   
   </div>
</template>


<script setup>
import { ref } from 'vue';
const trainee = ref(JSON.parse(localStorage.getItem('Trainee')))



</script>