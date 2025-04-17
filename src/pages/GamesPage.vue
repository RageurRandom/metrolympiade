<script setup>
import { onMounted, ref } from "vue";
import { apiUrl } from "@/main";
import { useUserData } from "@/composables/useUserData";
import MatchList from "@/components/games/MatchList.vue";

const { user } = useUserData();
const matches = ref([]);
const isLoading = ref(false);
const error = ref(null);

function fetchMatches() {
  isLoading.value = true;
  error.value = null;

  fetch(`${apiUrl}/matches/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.value.token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Échec du chargement des matchs");
      }
      return res.json();
    })
    .then((data) => {
      matches.value = data;
    })
    .catch((err) => {
      error.value = "Erreur lors du chargement des matchs : " + err.message;
      console.error("Erreur matchs:", err);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => {
  fetchMatches();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Mes matchs</h1>

    <div v-if="isLoading" class="text-center py-8">
      <p>Chargement en cours...</p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <MatchList v-else :matches="matches" :team-name="user.team?.name" />

    <div class="mt-6">
      <router-link
        to="/game"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <span>Ajouter un match</span>
      </router-link>
    </div>
  </div>
</template>
