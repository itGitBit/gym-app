<template>
  <div class="main-container">
    <div class="title">
      <h1>Trainer Login</h1>
    </div>
    <FormKit class="dropdown" type="form" @submit="setTrainerLoginDetails">
      <TrainerDropdown
        :trainers="trainers"
        @select-trainer="updateSelectedTrainer"
      />
    </FormKit>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TrainerDropdown from "../TrainerDropdown/TrainerDropdown.vue";
import { getAllTrainers } from "../../../Utils/apiCalls.js";
import { useUserStore } from "../../../stores/userStores.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const store = useUserStore();
const router = useRouter();

const trainers = ref([{}]);
const selectedTrainer = ref("");

const updateSelectedTrainer = (trainer) => {
  selectedTrainer.value = trainer;
};

const getTrainerList = async () => {
  const data = await getAllTrainers();
  trainers.value = data;
};

const setTrainerLoginDetails = () => {
  if (selectedTrainer.value === "") {
    toast.error("Please select a trainer");
    return;
  }

  const user = selectedTrainer.value;
  store.setUser({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    type: "trainer",
  });
  toast.success(`Welcome back, ${user.name}`);
  router.push("/trainers/dashboard");
};

onMounted(() => {
  getTrainerList();
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
