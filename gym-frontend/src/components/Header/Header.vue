<template>
  <nav>
    <RouterLink to="/"><button title="ET go home">Home</button></RouterLink>
    <div v-if="!loggedIn" class="logged-out-links">
      <RouterLink to="/trainer-login"
        ><button class="nav-button" title="Trainer login">
          Trainer Login
        </button></RouterLink
      >
      <RouterLink to="/trainee-login"
        ><button class="nav-button" title="Trainee login">
          Trainee Login
        </button></RouterLink
      >
    </div>

    <div v-if="loggedIn" class="logged-in-links">
      <p>Welcome, {{ user.name }}</p>
      <RouterLink v-if="user.type === 'trainer'" to="/trainer-dashboard"
        ><button class="nav-button" title="Trainer dashboard">
          Trainer Dashboard
        </button></RouterLink
      >
      <RouterLink v-if="user.type === 'trainee'" to="/trainee-dashboard"
        ><button class="nav-button" title="Trainee dashboard">
          Trainee Dashboard
        </button></RouterLink
      >
      <button @click="logout" class="nav-button" title="Logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../../stores/userStores.js";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();
const loggedIn = ref(store.isUserLoggedIn());
const user = ref(store.getUser());

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
  store.clearUser();
  loggedIn.value = false;
  router.push("/");
};
</script>
