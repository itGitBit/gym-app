<template>
    <div class="main-container">
        <h1>Welcome to the Home Page</h1>
        <h2>Are you a trainer or a trainee?</h2>

        <span class="user-type-btn">
            <RouterLink to="/trainerlogin"><button>Trainer</button></RouterLink>
        </span>
        <span class="user-type-btn">
            <RouterLink to="/traineelogin"><button>Trainee</button></RouterLink>
        </span>
    </div>
</template>
<script setup>

</script>

<style scoped>



.user-type-btn {
    margin-top: 20px;
}


</style>