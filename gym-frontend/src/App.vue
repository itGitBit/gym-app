<template>
  <nav>
    <RouterLink to="/"><button>Home</button></RouterLink>
  </nav>
  <main>
    <span>
      <RouterLink to="/"><img title="Badass logo right?! Click to go home, E.T!" class="logo"
          src="./assets/android-chrome-192x192.png" alt="logo" /></RouterLink>

    </span>
    <RouterView />
  </main>
</template>