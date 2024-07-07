<script setup lang="ts">
import Header from './components/Header/Header.vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  router.push('/');
};

</script>

<template>
<header>
  <Header @logout="logout" />
</header>
  <main >
    <span>
      <RouterLink to="/"><img title="Badass logo right?! Click to go home, E.T!" class="logo"
          src="./assets/android-chrome-192x192.png" alt="logo" /></RouterLink>

    </span>
    <RouterView />
  </main>
</template>