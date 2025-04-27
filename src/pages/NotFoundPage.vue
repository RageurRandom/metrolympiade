<script setup>
import { useRouter } from "vue-router";
</script>

<template>
  <main class="min-h-screen flex items-center justify-center">
    <div class="p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-white text-center mb-8">Page non trouvée</h1>
      
      <p class="mt-4 text-center text-gray-600">
        <br>
            <router-link to="/leaderboard" class="text-green-400 hover:underline">
                Revenir à la page de classement
            </router-link>
      </p>

    </div>
  </main>
</template>
