<template>
    <div class="main">
        <h1>Hello <RouterLink title="Edit your details, man!" class="router-link" to="/updatetrainer">{{ trainer.name }}
            </RouterLink>
        </h1>
        <h2>What would you like to do?</h2>
        <div class="options">
            <RouterLink title="View your trainees" class="router-button" to="/trainees"><button>View Trainees</button></RouterLink>
            <RouterLink title="View your workouts" class="router-button" to="/workouts"><button>View Workouts</button></RouterLink>
            <RouterLink title="Create a new workout" class="router-button" to="/createworkout"><button>Create Workout</button></RouterLink>
            <RouterLink title="Add a new trainee" class="router-button" to="/addtrainee"><button>Add Trainee</button></RouterLink>

        </div>

    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const trainer = ref({});

onMounted(() => {
    const trainerData = localStorage.getItem('Trainer');
    if (!trainerData) {
        router.push('/trainerlogin');
    } else {
        trainer.value = JSON.parse(trainerData);
    }
});
</script>
<style scoped>
.router-link {
    padding: 2px;
    color: #209CEE;
    background-color: rgba(245, 245, 245, 0.507);
    text-decoration: none;
    border: 1px solid #209CEE;
}
</style>