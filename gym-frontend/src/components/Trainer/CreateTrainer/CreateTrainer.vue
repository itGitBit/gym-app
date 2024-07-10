<template>
  <div class="main">
    <h1>Create a New Trainer</h1>
    <form @submit.prevent="onSubmit" class="form-create">
      <div class="input">
        <label for="trainerName">Name: </label>
        <input
          v-model="name"
          type="text"
          id="trainerName"
          name="trainerName"
          required
          min="3"
          max="15"
        />
      </div>
      <div class="input">
        <label for="trainerEmail">Email: </label>
        <input
          v-model="email"
          type="email"
          id="trainerEmail"
          name="trainerEmail"
          required
        />
      </div>
      <div class="input">
        <label for="trainerPhone">Phone: </label>
        <input
          v-model="phone"
          type="tel"
          id="trainerPhone"
          name="trainerPhone"
          required
          min="10"
          max="10"
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
import { createTrainer } from "../../../Utils/apiCalls.js";
import { useRouter } from "vue-router";
import { validateTrainer } from "../../../Utils/validations.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const name = ref("");
const email = ref("");
const phone = ref("");
const router = useRouter();

const emit = defineEmits(["trainerCreated"]);

const onSubmit = async () => {
  if (
    !validateTrainer({
      name: name.value,
      email: email.value,
      phone: phone.value,
    })
  ) {
    return;
  }
  const newTrainer = {
    name: name.value,
    email: email.value,
    phone: phone.value,
  };

  const response = await createTrainer(newTrainer);
  toast.success(`Trainer ${response.name} created successfully`);
  emit("trainerCreated");
  onResetForm();
};

const onResetForm = () => {
  name.value = "";
  email.value = "";
  phone.value = "";
};
</script>
