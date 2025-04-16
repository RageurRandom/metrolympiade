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

const handleSubmit = async () => {
  await createMatch(form.value);
  router.push("/games");
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
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
        class="w-full p-2 border rounded"
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

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      :disabled="isLoading"
    >
      <span v-if="!isLoading">Enregistrer</span>
      <span v-else>Enregistrement en cours...</span>
    </button>
  </form>
</template>
