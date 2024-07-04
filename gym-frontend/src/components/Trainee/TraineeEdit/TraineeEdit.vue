<template>
  <div class="main">
    <h1>Edit Trainee</h1>
    <p>Trainee ID: {{ traineeId }}</p>
    <div class="trainee-edit" v-if="trainee">
      <input v-model="trainee.name" type="text" placeholder="Name" />
      <input v-model="trainee.email" type="email" placeholder="Email" />
      <input v-model="trainee.phone" type="tel" placeholder="Phone" />
      <button class="reset-button" @click="obliterateTrainee(trainee.id)">
        Delete
      </button>
      <button @click="rewriteTrainee">Update Trainee</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import {
  getTraineeById,
  updateTrainee,
  deleteTrainee,
} from "../../../Utils/apiCalls.js";

const router = useRouter();
const route = useRoute();
const traineeId = route.params.traineeId;
const trainee = ref(null);

const rewriteTrainee = async () => {
  const response = await updateTrainee(trainee.value);
  trainee.value = response;
};

const getTraineeAndRefIt = async () => {
  trainee.value = await getTraineeById(traineeId);
};

const obliterateTrainee = async (id) => {
  if (confirm("Are you sure you want to delete this trainee?")) {
    await deleteTrainee(id);
    router.push("/trainees");
  }
};

onMounted(() => {
  getTraineeAndRefIt();
});
</script>
<style scoped>
.trainee-edit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
