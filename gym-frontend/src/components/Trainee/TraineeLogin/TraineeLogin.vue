<template>
  <div class="main">
    <h1>Trainee Login</h1>
    <label for="email">Enter your email please</label>
    <input v-model="email" type="email" placeholder="Enter your email" required />
    <button @click="submitLoginForm">Submit</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { traineeLogin } from "../../../Utils/apiCalls.js";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStores.js";
import { useToast } from 'vue-toastification';

const toast = useToast();
const store = useUserStore();
const router = useRouter();
const email = ref("");

const submitLoginForm = async () => {
  const trainee = await traineeLogin(email.value);
  if (!trainee) {

    return;
  }
  store.clearUser();
  store.setUser({
    id: trainee.id,
    name: trainee.name,
    email: trainee.email,
    phone: trainee.phone,
    type: "trainee",
  });
  toast.success(`Welcome back, ${trainee.name}`);
  router.push("dashboard");
};

onMounted(() => {

});
</script>
<style scoped>
label {
  margin-bottom: 10px;
}

input::placeholder {
  color: white;
}
</style>
