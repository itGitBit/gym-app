<template>
    <div class="main">
        <h1>Create a New Trainee</h1>
        <form @submit.prevent="onSubmit" class="form-create">
            <div class="input">
                <label for="traineeName">Name: </label>
                <input v-model="name" type="text" id="traineeName" name="traineeName" required>
            </div>
            <div class="input">
                <label for="traineeEmail">Email: </label>
                <input v-model="email" type="email" id="traineeEmail" name="traineeEmail" required>
            </div>
            <div class="input">
                <label for="traineePhone">Phone: </label>
                <input v-model="phone" type="tel" id="traineePhone" name="traineePhone" required>
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
import { ref } from 'vue';
import { createTrainee } from '../../../Utils/apiCalls.js';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const phone = ref('');
const warning = ref('');
const router = useRouter();

const onSubmit = async () => {
    if (!name.value || !email.value || !phone.value) {
        warning.value = 'Please fill out all fields';
        return;
    }
    warning.value = '';

    const newTrainee = {
        name: name.value,
        email: email.value,
        phone: phone.value
    }

    const response = await createTrainee(newTrainee);
    onResetForm();
    router.push('/trainer-dashboard');
}

const onResetForm = () => {
    name.value = '';
    email.value = '';
    phone.value = '';
}

</script>
