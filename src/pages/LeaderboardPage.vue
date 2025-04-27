<script setup>
import { ref, onMounted } from "vue";
import LeaderboardTable from "@/components/LeaderboardTable.vue";

const ranking = ref([]);
const isLoading = ref(false);
const error = ref(null);

function fetchLeaderboard() {
  isLoading.value = true;
  fetch("http://localhost:3000/ranking")
    .then((response) => response.json())
    .then((data) => {
      ranking.value = data;
    })
    .catch((err) => {
      error.value = err.message;
      console.error("Erreur:", err);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => {
  fetchLeaderboard();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen ">
    <main class="w-full max-w-4xl p-6 rounded-lg shadow-md bg-gray-800">
      <h1 class="text-2xl font-bold text-white border-b-2 border-green-400 pb-4 mb-6">
        Classement générale
      </h1>
      <LeaderboardTable :ranking="ranking" :isLoading="isLoading" :error="error" />
    </main>
  </div>
</template>
