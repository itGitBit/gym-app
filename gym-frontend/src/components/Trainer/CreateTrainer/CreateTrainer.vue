<template>
    <div class="main">
        <h1>Create a New Trainer</h1>
        <form @submit.prevent="onSubmit" class="form-create">
            <div class="input">
                <label for="trainerName">Name: </label>
                <input v-model="name" type="text" id="trainerName" name="trainerName" required>
            </div>
            <div class="input">
                <label for="trainerEmail">Email: </label>
                <input v-model="email" type="email" id="trainerEmail" name="trainerEmail" required>
            </div>
            <div class="input">
                <label for="trainerPhone">Phone: </label>
                <input v-model="phone" type="tel" id="trainerPhone" name="trainerPhone" required>
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
import { createTrainer } from '../../../Utils/apiCalls.js';
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

    const newTrainer = {
        name: name.value,
        email: email.value,
        phone: phone.value
    }

    const response = await createTrainer(newTrainer);
    onResetForm();
    router.push('/trainer-dashboard');
}

const onResetForm = () => {
    name.value = '';
    email.value = '';
    phone.value = '';
}

</script>
