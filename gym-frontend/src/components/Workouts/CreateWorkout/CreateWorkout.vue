<template>
    <div class="main">
        <h1>Create a New Workout</h1>
        <form @submit.prevent="onSubmit" class="form-create">
            <div class="input">
                <label for="workoutDuration">Workout Duration in Minutes: </label>
                <input v-model="durationInMinutes" type="number" id="workoutDuration" name="workoutDuration" required>
            </div>
            <div class="input">
                <label for="workoutDate">Workout Date</label>
                <input v-model="date" type="date" id="workoutDate" name="workoutDate" required>
            </div>
            <div class="input">
                <label for="workoutStartTime">Workout Start Time</label>
                <input v-model="startTime" type="time" id="workoutStartTime" name="workoutStartTime" required>
            </div>
            <div class="input">
                <label for="trainerIds">Trainers: </label>
                <TrainerDropdown :trainers="trainers" @select-trainer="updateSelectedTrainer" />
            </div>
            <div class="selected-bar">

                <span @click="removeSelectedTrainer(trainer.id)" class="trainer-badge"
                    v-for="trainer in selectedTrainers" :key="trainer.id">{{ trainer.name }}</span>
            </div>
            <div class="input">
                <label for="traineeIds">Trainees: </label>
                <select class="dropdown-select" @change="updateTraineeList" id="traineeIds" name="traineeIds">
                    <option class="dropdown-option">Select Profile</option>
                    <option class="dropdown-option" v-for="trainee in trainees" :key="trainee.id"
                        :value="JSON.stringify(trainee)">{{ trainee.name }}</option>
                </select>
            </div>
            <div class="selected-bar">

                <span @click="removeTraineeFromList(trainee.id)" class="trainer-badge"
                    v-for="trainee in selectedTrainees" :key="trainee.id">{{ trainee.name }}</span>
            </div>

            <div class="form-buttons">
                <p class="warning" v-if="warning">{{ warning }}</p>
                <button class="submit-button" type="submit">Submit</button>
                <button @click="onResetForm" class="reset-button" type="reset">Resest</button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import TrainerDropdown from '../../Trainer/TrainerDropdown/TrainerDropdown.vue';
import { createWorkout, getTrainees, getTrainers } from '../../../../Utils/apiCalls';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/userStores';

const store = useUserStore();
const router = useRouter();
const trainers = ref([]);
const selectedTrainers = ref([]);
const trainees = ref([]);
const selectedTrainees = ref([]);
const date = ref('');
const startTime = ref('');
const durationInMinutes = ref('');
const warning = ref('');

const onResetForm = () => {
    selectedTrainers.value = [];
    selectedTrainees.value = [];
    date.value = '';
    startTime.value = '';
    durationInMinutes.value = '';
    warning.value = '';
};

const onSubmit = async () => {
    const workout = {
        workout: {
            date: formatDate(),
            start_time: `${startTime.value}:00`,
            duration_in_minutes: durationInMinutes.value,
            trainer_ids: selectedTrainers.value.map(trainer => trainer.id),
            trainee_ids: selectedTrainees.value.map(trainee => trainee.id)
        }
    }
    const response = await createWorkout(workout);
    onResetForm();


}

const formatDate = () => {
    const rorDate = new Date(date.value).toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
    return rorDate;
};

const getTraineesList = async () => {
    const data = await getTrainees();
    trainees.value = data;
};

const getTrainerList = async () => {
    const data = await getTrainers();
    trainers.value = data;
};

const updateTraineeList = (event) => {
    if (!event.target.value || event.target.value === 'Select Profile') {
        warning.value = '';
        return;
    }
    const trainee = JSON.parse(event.target.value);
    const isTraineeSelected = selectedTrainees.value.some(selectedTrainee => selectedTrainee.id === trainee.id);
    if (isTraineeSelected) {
        warning.value = 'Trainee already selected';
        return;
    }
    selectedTrainees.value.push(trainee);
    warning.value = '';
};

const removeSelectedTrainer = (trainerId) => {
    selectedTrainers.value = selectedTrainers.value.filter(trainer => trainer.id !== trainerId);
};

watch([selectedTrainers.value, selectedTrainees.value], () => {
    if (selectedTrainers.value.length === 0 || selectedTrainees.value.length === 0) {
        warning.value = '';
    }
});


const removeTraineeFromList = (traineeId) => {
    selectedTrainees.value = selectedTrainees.value.filter(trainee => trainee.id !== traineeId);
};

const updateSelectedTrainer = (trainer) => {
    if (!trainer || trainer === 'Select Profile') {
        warning.value = '';
        return;
    }
    const trainerObj = JSON.parse(trainer);
    const isTrainerSelected = selectedTrainers.value.some(selectedTrainer => selectedTrainer.id === trainerObj.id);
    if (isTrainerSelected) {
        warning.value = 'Trainer already selected';
        return;
    } else {
        warning.value = '';
    }
    selectedTrainers.value.push(trainerObj);
};

onMounted(() => {
    if (store.getUser().type!=='trainer') {
        router.push('/');
    }
    getTrainerList();
    getTraineesList();



});

</script>

<style scoped></style>