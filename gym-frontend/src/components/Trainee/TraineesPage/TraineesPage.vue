<template>
    <div class="trainees-container">
      <h1>Trainees</h1>
      <div class="trainee-list">
        <div class="trainee" v-for="trainee in trainees" :key="trainee.id">
          <p class="trainee-name">Name: {{ trainee.name }}</p>
          <p class="trainee-email">Email: {{ trainee.email }}</p>
          <p class="trainee-phone">Phone: {{ trainee.phone }}</p>
          <p class="trainee-last-workout">Last Workout: {{ trainee.last_workout_date || 'Never' }}</p>
          <div class="trainee-buttons">
            <button @click="obliterateTrainee(trainee.id)" class="trainee-button">Delete</button>
            <RouterLink :to="{ name: 'TraineeEdit', params: { traineeId: trainee.id } }"><button class="trainee-button">Edit</button></RouterLink>
          </div>
        </div>
      </div>
      <button @click="router.push('/add-trainee')" >Add New Trainee</button>
      <div class="pagination">
        <button @click="fetchTrainees(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="fetchTrainees(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import { getTraineesWithPagination, deleteTrainee } from '../../../../Utils/apiCalls.js';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/userStores.js';

const store = useUserStore();
const router = useRouter();
const trainees = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchTrainees = async (page) => {
  if (page < 1 || page > totalPages.value) return;
  const data = await getTraineesWithPagination(page);
  trainees.value = data.trainees;
  currentPage.value = data.current_page;
  totalPages.value = data.total_pages;
};

const obliterateTrainee = async (id) => {
  if (confirm('Are you sure you want to delete this trainee?')) {
    await deleteTrainee(id);
    fetchTrainees(currentPage.value);
  }
};



onMounted(() => {
  if (store.getUser().type !== 'trainer') {
    router.push('/');
  }
  fetchTrainees(currentPage.value);
});
</script>
<style scoped>
.trainees-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2f302f;
  color: #95C03A;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #95C03A;
}

.trainee-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.trainee {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #333;
  border: 1px solid #95C03A;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.trainee:hover {
  background-color: #444;
  transform: scale(1.05);
}

.trainee p {
  margin: 5px 0;
}

.trainee-name {
  font-weight: bold;
  font-size: 1.2em;
}

.trainee-email,
.trainee-phone,
.trainee-last-workout {
  font-size: 1em;
  color: #95C03A;
}

.trainee-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
}

.trainee-button {
  padding: 8px 16px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #95C03A;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.trainee-button:hover {
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
  background-color: #95C03A;
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
  color: #95C03A;
}
</style>
