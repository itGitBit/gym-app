<template>
  <div class="main">
    <h1>Edit Trainee</h1>
    <div class="trainee-edit" v-if="trainee">
      <form @submit.prevent="rewriteTrainee" class="edit-form">
        <label class="edit-field" for="name">Name:</label>
        <input
          class="edit-field"
          type="text"
          id="name"
          v-model="trainee.name"
        />
        <label class="edit-field" for="email">Email:</label>
        <input
          class="edit-field"
          type="email"
          id="email"
          v-model="trainee.email"
        />
        <label class="edit-field" for="phone">Phone:</label>
        <input
          class="edit-field"
          type="tel"
          id="phone"
          v-model="trainee.phone"
        />
        <button
          v-if="store.getUser().type !== 'trainer'"
          type="button"
          class="reset-button"
          @click="obliterateTrainee(trainee.id)"
        >
          Delete
        </button>
        <button class="edit-field" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useUserStore } from "../../../stores/userStores.js";
import {
  getTraineeById,
  updateTrainee,
  deleteTrainee,
} from "../../../Utils/apiCalls.js";
import { validateTrainee } from "../../../Utils/validations.js";
import { useToast } from "vue-toastification";
import { errorHandler } from "../../../Utils/errorHandler.js";

const toast = useToast();
const router = useRouter();
const store = useUserStore();
const route = useRoute();
const traineeId = route.params.traineeId;
const trainee = ref(null);

const rewriteTrainee = async () => {
    if (!validateTrainee(trainee.value)) return;
    const response = await updateTrainee(trainee.value);
    trainee.value = response;
    if (store.getUser().id == traineeId) {
      store.setUser({ ...response, type: "trainee" });
      return;
    }
    toast.success(`Trainee ${response.name} updated`);
 };

const getTraineeAndRefIt = async () => {
  trainee.value = await getTraineeById(traineeId);
};

const obliterateTrainee = async (id) => {
  if (confirm("Are you sure you want to delete this trainee?")) {
    await deleteTrainee(id);
    toast.success("Trainee deleted");
    if (store.getUser().id == id) {
      store.clearUser();
      router.push("/");
      return;
    }
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
