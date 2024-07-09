<template>
  <div class="main">
    <h1>
      Hello
      <RouterLink title="Edit your details, man!" class="router-link"
        :to="{ name: 'UpdateTrainer', params: { trainerId: store.getUser().id } }">{{ trainer.name }}</RouterLink>
    </h1>
    <h2>What would you like to do?</h2>
    <div class="options">
      <RouterLink title="View your trainees" class="router-button" to="/trainees/all"><button>View Trainees</button>
      </RouterLink>
      <RouterLink title="View all trainers" class="router-button" to="all"><button>View Trainers</button></RouterLink>
      <RouterLink title="View your workouts" class="router-button" to="/workouts/all"><button>View Workouts</button>
      </RouterLink>
      <RouterLink title="Add a new trainee" class="router-button" to="/trainees/create"><button>Add Trainee</button>
      </RouterLink>
      <RouterLink title="Add a new trainer" class="router-button" to="create"><button>Add Trainer</button></RouterLink>
      <RouterLink title="Create a new workout" class="router-button" to="/workouts/create"><button>Add Workout</button>
      </RouterLink>


    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStores.js";

const router = useRouter();
const store = useUserStore();
const trainer = ref({});


onMounted(() => {
  trainer.value = store.getUser();
});
</script>

<style scoped>
.options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

button {
  width: 175px;
}
</style>
