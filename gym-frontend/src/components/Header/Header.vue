<template>
  <header>
    <nav class="navbar">
      <RouterLink to="/">
        <button title="ET go home">Home</button>
      </RouterLink>
      <div v-if="!loggedIn" class="logged-out-links">
        <RouterLink to="/trainers/login">
          <button class="nav-button" title="Trainer login">Trainer Login</button>
        </RouterLink>
        <RouterLink to="/trainees/login">
          <button class="nav-button" title="Trainee login">Trainee Login</button>
        </RouterLink>
      </div>

      <div v-if="loggedIn" class="logged-in-links">
        <p>Welcome, {{ user.name }}</p>
        <RouterLink v-if="user.type === 'trainer'" to="/trainers/dashboard">
          <button class="nav-button" title="Trainer dashboard">Trainer Dashboard</button>
        </RouterLink>
        <RouterLink v-if="user.type === 'trainee'" to="/trainees/dashboard">
          <button class="nav-button" title="Trainee dashboard">Trainee Dashboard</button>
        </RouterLink>
        <button @click="logout" class="nav-button" title="Logout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../../stores/userStores.js";
import { useRouter, RouterLink } from "vue-router";


const router = useRouter();
const store = useUserStore();
const loggedIn = ref(store.isUserLoggedIn());
const user = ref(store.getUser());

const emit = defineEmits(["logout"]);

watch(
  () => store.isUserLoggedIn(),
  (newVal) => {
    loggedIn.value = newVal;
  }
);

watch(
  () => store.getUser(),
  (newVal) => {
    user.value = newVal;
  }
);

const logout = () => {
  emit("logout");
};

</script>
<style scoped>
header {
  padding: 1rem;
  height: 5vh;
  margin-bottom: 20px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar>* {
  margin-right: 1rem;
}

.logged-out-links,
.logged-in-links {
  display: flex;
  align-items: center;
}

.nav-button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;

}


.logged-in-links p {
  margin-right: 1rem;
  font-weight: bold;
}
</style>
