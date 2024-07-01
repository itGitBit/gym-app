<template>
    <div class="main">
      <h1>Hello <RouterLink title="Edit your details, man!" class="router-link" to="/update-trainer">{{ trainer.name }}</RouterLink></h1>
      <h2>What would you like to do?</h2>
      <div class="options">
        <RouterLink title="View your trainees" class="router-button" to="/trainees"><button>View Trainees</button></RouterLink>
        <RouterLink title="View your workouts" class="router-button" to="/workouts"><button>View Workouts</button></RouterLink>
        <RouterLink title="Create a new workout" class="router-button" to="/create-workout"><button>Create Workout</button></RouterLink>
        <RouterLink title="Add a new trainee" class="router-button" to="/add-trainee"><button>Add Trainee</button></RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../../../stores/userStores.js';
  
  const router = useRouter();
  const store = useUserStore();
  const trainer = ref({});
  
  onMounted(() => {
    trainer.value = store.getUser();
    if (trainer.value.type !== 'trainer') {
        store.clearUser();
        router.push('/trainer-login');
    }
  });
  </script>
  
  <style scoped></style>
  