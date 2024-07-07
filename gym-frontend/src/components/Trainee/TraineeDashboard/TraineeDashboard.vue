<template>
    <div class="main">
        <h1>
            Hello
            <RouterLink title="Edit your details, man!" class="router-link" :to="{ name: 'TraineeEdit', params: { traineeId: store.getUser().id } }">
                {{ trainee.name }}
            </RouterLink>
        </h1>
        <h2>What would you like to do?</h2>
        <RouterLink title="View your workouts" class="router-button" to="/workouts">
            <button>View Workouts</button>
        </RouterLink>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../../stores/userStores';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();
const trainee = ref({})



onMounted(() => {
    trainee.value = store.getUser();
    if (trainee.value.type !== 'trainee') {
        store.clearUser();
        router.push('/');
    }
});
</script>