<template>
    <div class="trainees-container">
        <h1>Trainees</h1>
        <div class="trainee-list">
            <div class="trainee" v-for="trainee in trainees" :key="trainee.id">
                <p>name: {{ trainee.name }}</p>
                <p>email: {{ trainee.email }}</p>
                <p>phone: {{ trainee.phone }}</p>
                <p>{{ trainee.last_workout_date }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getTrainees } from '../../../../Utils/apiCalls.js';

const trainees = ref([]);

const setRefFromGetTrainees = async () => {
    trainees.value = await getTrainees();
}

onMounted(() => {
    setRefFromGetTrainees();
})
</script>
<style scoped>
.trainees-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.trainee-list {
    display: flex;
    flex-direction: grid;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
}
.trainee {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
}
</style>
