<template>
  <div class="trainers-container">
    <h1>Trainers</h1>
    <div class="trainer-list">
      <div class="trainer" v-for="trainer in trainers" :key="trainer.id">
        <p class="trainer-name">Name: {{ trainer.name }}</p>
        <p class="trainer-email">Email: {{ trainer.email }}</p>
        <p class="trainer-phone">Phone: {{ trainer.phone }}</p>
        <div class="trainer-buttons">
          <button @click="obliterateTrainer(trainer.id)" class="trainer-button">
            Delete
          </button>
          <RouterLink
            :to="{ name: 'UpdateTrainer', params: { trainerId: trainer.id } }"
            ><button class="trainer-button">Edit</button></RouterLink
          >
        </div>
      </div>
    </div>
    <button @click="router.push('/add-trainer')">Add New Trainer</button>
    <div class="pagination">
      <button
        @click="fetchTrainers(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="fetchTrainers(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  getTrainersWithPagination,
  deleteTrainer,
} from "../../../Utils/apiCalls.js";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStores.js";

const store = useUserStore();
const router = useRouter();
const trainers = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchTrainers = async (page) => {
  if (page < 1 || page > totalPages.value) return;
  const data = await getTrainersWithPagination(page);
  trainers.value = data.trainers;
  currentPage.value = data.current_page;
  totalPages.value = data.total_pages;
};

const obliterateTrainer = async (id) => {
  if (confirm("Are you sure you want to delete this trainer?")) {
    await deleteTrainer(id);
    await fetchTrainers(currentPage.value);
  }
};

onMounted(() => {
  if (store.getUser().type !== "trainer") {
    router.push("/");
  }
  fetchTrainers(currentPage.value);
});
</script>
<style scoped>
.trainers-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2f302f;
  color: #95c03a;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #95c03a;
}

.trainer-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.trainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #333;
  border: 1px solid #95c03a;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.trainer:hover {
  background-color: #444;
  transform: scale(1.05);
}

.trainer p {
  margin: 5px 0;
}

.trainer-name {
  font-weight: bold;
  font-size: 1.2em;
}

.trainer-email,
.trainer-phone,
.trainer-last-workout {
  font-size: 1em;
  color: #95c03a;
}

.trainer-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
}

.trainer-button {
  padding: 8px 16px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #95c03a;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.trainer-button:hover {
  background-color: #789a2e;
  transform: scale(1.05);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #95c03a;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:disabled {
  background-color: #444;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1.2em;
  color: #95c03a;
}
</style>
