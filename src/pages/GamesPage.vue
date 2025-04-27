<script setup>
import { onMounted, ref } from "vue";
import { apiUrl } from "@/main";
import { useUserData } from "@/composables/useUserData";
import MatchList from "@/components/games/MatchList.vue";
import { useRouter } from "vue-router";

const { user } = useUserData();
const matches = ref([]);
const isLoading = ref(false);
const error = ref(null);
const router = useRouter();

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
      <button
        @click="() => router.push('/game')"
        class="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
      >
        Ajouter un match
      </button>
    </div>
  </div>
</template>
