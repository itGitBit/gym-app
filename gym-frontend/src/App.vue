<script setup>
import Header from './components/Header/Header.vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useUserStore } from './stores/userStores';

const router = useRouter();
const store = useUserStore();

const logoutPush = async () => {
  await router.push('/');
  store.clearUser();
};

</script>

<template>
<header>
 <Header @logout="logoutPush" />
</header>
  <main >
    <span>
      <RouterLink to="/"><img title="Badass logo right?! Click to go home, E.T!" class="logo"
          src="./assets/android-chrome-192x192.png" alt="logo" /></RouterLink>

    </span>
    <RouterView />
  </main>
</template>
