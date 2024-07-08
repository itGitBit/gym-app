<template>
  <div class="main">
    <h1>Create a New Trainee</h1>
    <form @submit.prevent="onSubmit" class="form-create">
      <div class="input">
        <label for="traineeName">Name: </label>
        <input
          v-model="name"
          type="text"
          id="traineeName"
          name="traineeName"
          required
        />
      </div>
      <div class="input">
        <label for="traineeEmail">Email: </label>
        <input
          v-model="email"
          type="email"
          id="traineeEmail"
          name="traineeEmail"
          required
        />
      </div>
      <div class="input">
        <label for="traineePhone">Phone: </label>
        <input
          v-model="phone"
          type="tel"
          id="traineePhone"
          name="traineePhone"
          required
        />
      </div>
      <div class="form-buttons">
        <button class="submit-button" type="submit">Submit</button>
        <button @click="onResetForm" class="reset-button" type="reset">
          Resest
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createTrainee } from "../../../Utils/apiCalls.js";
import { useRouter } from "vue-router";
import { validateTrainee } from "../../../Utils/validations.js";
import { useToast } from "vue-toastification";
import { errorHandler } from "../../../Utils/errorHandler.js";

const name = ref("");
const email = ref("");
const phone = ref("");
const router = useRouter();
const toast = useToast();

const onSubmit = async () => {
    if (
      !validateTrainee({
        name: name.value,
        email: email.value,
        phone: phone.value,
      })
    ) {
      return;
    }
    const newTrainee = {
      name: name.value,
      email: email.value,
      phone: phone.value,
    };
    const response = await createTrainee(newTrainee);
    if (response && !response.error) {
      toast.success(`Trainee ${response.name} created successfully`);
      onResetForm();
    }
};

const onResetForm = () => {
  name.value = "";
  email.value = "";
  phone.value = "";
};

</script>
