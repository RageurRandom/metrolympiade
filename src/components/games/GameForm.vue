<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGameData } from "@/composables/useGameData.js";
import TeamSelect from "@/components/games/TeamSelect.vue";
import ActivitySelect from "@/components/games/ActivitySelect.vue";
import ScoreInput from "@/components/games/ScoreInput.vue";

const props = defineProps({
  userTeam: {
    type: Object,
    default: null,
  },
});

const router = useRouter();
const { teams, activities, isLoading, error, createMatch } = useGameData();

const form = ref({
  team2Id: "",
  activityId: "",
  startedAt: "",
  team1Score: 0,
  team2Score: 0,
});

const showErrorPopup = ref(false);

async function handleSubmit() {
  await createMatch(form.value);
  if (error.value) {
    showErrorPopup.value = true; // Affiche la popup si une erreur existe
  } else {
    router.push("/games");
  }
}

function closeErrorPopup() {
  showErrorPopup.value = false;
}
</script>

<template>
  <div class="">
    <form @submit.prevent="handleSubmit" class="space-y-6 p-8 rounded-lg shadow-lg text-white">
      <TeamSelect
        v-model="form.team2Id"
        :teams="teams"
        :disabled="isLoading"
        :user-team-id="userTeam?.id"
      />

      <ActivitySelect v-model="form.activityId" :activities="activities" :disabled="isLoading" />

      <div class="space-y-2">
        <label class="block font-medium">Heure de début</label>
        <input
          type="time"
          v-model="form.startedAt"
          class="w-full p-2 border rounded "
          :disabled="isLoading"
          required
        />
      </div>

      <ScoreInput
        v-model:team1Score="form.team1Score"
        v-model:team2Score="form.team2Score"
        :team1-name="userTeam?.name || 'Votre équipe'"
        :disabled="isLoading"
      />

      <button
        type="submit"
        class="w-full cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Enregistrer</span>
        <span v-else>Enregistrement en cours...</span>
      </button>
    </form>
  </div>

  <!-- Error Popup -->
  <div
    v-if="showErrorPopup"
    class="fixed inset-0 flex items-center justify-center bg-black/50"
  >
    <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
      <button
        @click="closeErrorPopup"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Fermer"
      >
        ✖
      </button>
      <h2 class="text-lg font-bold mb-4 text-red-600">Erreur</h2>
      <p class="text-sm text-gray-700 mb-4">{{ error }}</p>
      <button
        @click="closeErrorPopup"
        class="w-full cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
