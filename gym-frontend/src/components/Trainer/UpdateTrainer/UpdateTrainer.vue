<template>
  <div class="main">
    <h1>Edit Your Details</h1>
    <div v-if="!isEditting" class="options">
      <h2>Your Details:</h2>
      <div class="trainer-details">
        <p>Name: {{ trainer.name }}</p>
        <p>Email: {{ trainer.email }}</p>
        <p>Phone: {{ trainer.phone }}</p>
      </div>

      <button @click="onEditDetails" class="edit-button">Edit Details</button>
    </div>

    <div v-if="isEditting" class="edit-form">
      <h2>Edit Your Details:</h2>
      <form @submit.prevent="onSubmitForm" class="edit-form">
        <label class="edit-field" for="name">Name:</label>
        <input
          class="edit-field"
          type="text"
          id="name"
          v-model="trainer.name"
        />
        <label class="edit-field" for="email">Email:</label>
        <input
          class="edit-field"
          type="email"
          id="email"
          v-model="trainer.email"
        />
        <label class="edit-field" for="phone">Phone:</label>
        <input
          class="edit-field"
          type="tel"
          id="phone"
          v-model="trainer.phone"
        />
        <button class="edit-field" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { updateTrainer, getTrainerById } from "../../../Utils/apiCalls.js";
import { useUserStore } from "../../../stores/userStores.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useUserStore();
const trainer = ref({});
const isEditting = ref(false);
const trainerId = route.params.trainerId;

const onEditDetails = () => {
  isEditting.value = true;
};

const onSubmitForm = async () => {
  const response = await updateTrainer(trainer.value);
  trainer.value = response;
  if(trainer.value.id === store.getUser().id) {
    store.setUser({...trainer.value, type: 'trainer'});
  }
  isEditting.value = false;
};

const getTrainerDetails = async () => {
  trainer.value = await getTrainerById(trainerId);
};

onMounted(() => {
  if (trainerId !== store.getUser().id) {
    getTrainerDetails();
  } else {
    trainer.value = store.getUser();
  }
});
</script>

<style scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-field button {
  margin: 10px;
}

label {
  margin: 8px;
}
</style>
