<template>
    <div  title="horrible colors?" class="main-container">
        <h1>Welcome to the Home Page</h1>
        <h2>Are you a trainer or a trainee?</h2>

        <span class="user-type-btn">
            <RouterLink to="/trainers/login"><button>Trainer</button></RouterLink>
        </span>
        <span class="user-type-btn">
            <RouterLink to="/trainees/login"><button>Trainee</button></RouterLink>
        </span>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';



</script>

<style scoped>



.user-type-btn {
    margin-top: 20px;
}


</style>