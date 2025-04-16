<script setup>
import { ref, onMounted } from "vue";
import { apiUrl } from "@/main";
import { useRouter } from "vue-router";
import { useUserData } from "@/composables/useUserData";

const router = useRouter();
const { user } = useUserData();

// Form data
const form = ref({
  team2Id: "",
  activityId: "",
  startedAt: "",
  team1Score: 0,
  team2Score: 0,
});

// Data lists
const teams = ref([]);
const activities = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Fetch teams and activities
onMounted(async () => {
  isLoading.value = true;

  // Fetch teams
  fetch(`${apiUrl}/teams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Échec du chargement des équipes");
      return res.json();
    })
    .then((data) => {
      teams.value = data;

      // Filtrer les équipes pour éviter de sélectionner la même que l'utilisateur
      teams.value = teams.value.filter((team) => team.id !== user.value.team?.id);
    })
    .catch((err) => {
      error.value = "Erreur lors du chargement des équipes : " + err.message;
      console.error("Erreur équipes:", err);
    })
    .finally(() => {
      isLoading.value = false;
    });

  // Fetch activities
  fetch(`${apiUrl}/activities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Échec du chargement des activités");
      return res.json();
    })
    .then((data) => {
      activities.value = data;
    })
    .catch((err) => {
      error.value = "Erreur lors du chargement des activités : " + err.message;
      console.error("Erreur activités:", err);
    })
    .finally(() => {
      isLoading.value = false;
    });
});

// Format date to ISO like the JSON example
// "2025-04-01T10:00:00Z"
function formatISODate(timeString) {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

// Submit form
async function createMatch() {
  if (!form.value.team2Id || !form.value.activityId || !form.value.startedAt) {
    error.value = "Tous les champs sont obligatoires";
    return;
  }

  isLoading.value = true;
  error.value = null;

  const matchData = {
    team2Id: form.value.team2Id,
    activityId: form.value.activityId,
    startedAt: formatISODate(form.value.startedAt),
    team1Score: Number(form.value.team1Score),
    team2Score: Number(form.value.team2Score),
  };

  console.log("Données envoyées:", matchData); // Pour débogage

  fetch(`${apiUrl}/matches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.value.token}`,
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Erreur lors de la création du match");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Match créé avec succès:", data);
      router.push("/games");
    })
    .catch((err) => {
      error.value = err.message || "Erreur serveur";
      console.error("Erreur création match:", err);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Nouveau match</h1>

    <form @submit.prevent="createMatch" class="space-y-6">
      <!-- Opponent selection -->
      <div class="space-y-2">
        <label class="block font-medium">Adversaire</label>
        <select
          v-model="form.team2Id"
          class="w-full p-2 border rounded"
          :disabled="isLoading"
          required
        >
          <option value="" disabled>Sélectionner une équipe</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <!-- Activity selection -->
      <div class="space-y-2">
        <label class="block font-medium">Activité</label>
        <select
          v-model="form.activityId"
          class="w-full p-2 border rounded"
          :disabled="isLoading"
          required
        >
          <option value="" disabled>Sélectionner une activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">
            {{ activity.name }}
          </option>
        </select>
      </div>

      <!-- Start time -->
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

      <!-- Final scores -->
      <div class="space-y-4 border-t pt-4">
        <h2 class="font-bold">Scores finaux</h2>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block">{{ user.team?.name || "Votre équipe" }}</label>
            <input
              type="number"
              v-model.number="form.team1Score"
              min="0"
              class="w-full p-2 border rounded"
              :disabled="isLoading"
            />
          </div>

          <div class="space-y-2">
            <label class="block">Adversaire</label>
            <input
              type="number"
              v-model.number="form.team2Score"
              min="0"
              class="w-full p-2 border rounded"
              :disabled="isLoading"
            />
          </div>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Enregistrer</span>
        <span v-else>Enregistrement en cours...</span>
      </button>
    </form>
  </div>
</template>
