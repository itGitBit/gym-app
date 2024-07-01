<script setup lang="ts">
import Header from './components/Header/Header.vue';


</script>

<template>
<header>
  <Header />
</header>
  <main title="horrible colors?">
    <span>
      <RouterLink to="/"><img title="Badass logo right?! Click to go home, E.T!" class="logo"
          src="./assets/android-chrome-192x192.png" alt="logo" /></RouterLink>

    </span>
    <RouterView />
  </main>
</template>