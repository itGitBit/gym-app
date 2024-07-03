<template>
    <div class="main-container">
        <div class="title">
            <h1>Trainer Login</h1>
        </div>
        <div class="dropdown">
            <TrainerDropdown :trainers="trainers" @select-trainer="updateSelectedTrainer" />
            <div class="select-button">
                <button class="button" @click="setTrainerLoginDetails">Select</button>
            </div>
        </div>


    </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TrainerDropdown from "../TrainerDropdown/TrainerDropdown.vue";
import { getAllTrainers } from '../../../../Utils/apiCalls';
import { useUserStore } from '../../../stores/userStores.js';


const store = useUserStore();
const router = useRouter();

const trainers = ref([{}]);
const selectedTrainer = ref('');

const updateSelectedTrainer = (trainer) => {
    selectedTrainer.value = trainer;
};

const getTrainerList = async () => {
    const data = await getAllTrainers();
    trainers.value = data;
};


const setTrainerLoginDetails = () => {
const user = JSON.parse(selectedTrainer.value)
    store.setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        type: 'trainer'
    })
    router.push('/trainer-dashboard');

}

onMounted(() => {
    if (store.isUserLoggedIn()) {
        router.push('/trainer-dashboard');
        return;
    }
    getTrainerList();
});


</script>

<style scoped>
.title {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>