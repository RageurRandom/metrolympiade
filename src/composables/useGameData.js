import { ref, onMounted } from "vue";
import { apiUrl } from "@/main";
import { useUserData } from "./useUserData";

export function useGameData() {
  const { user } = useUserData();
  const teams = ref([]);
  const activities = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

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

  // Fetch teams and activities
  onMounted(() => {
    isLoading.value = true;

    // Fetch teams
    fetch(`${apiUrl}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Échec du chargement des équipes");
        }
        return res.json();
      })
      .then((data) => {
        teams.value = data;
      })
      .catch((err) => {
        error.value = "Erreur lors du chargement des équipes : " + err.message;
        console.error("Erreur équipes:", err);
      });

    // Fetch activities
    fetch(`${apiUrl}/activities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Échec du chargement des activités");
        }
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

  // Create match function
  async function createMatch(matchData) {
    if (!matchData.team2Id || !matchData.activityId || !matchData.startedAt) {
      error.value = "Tous les champs sont obligatoires";
      return;
    }

    isLoading.value = true;
    error.value = null;

    const payload = {
      team2Id: matchData.team2Id,
      activityId: matchData.activityId,
      startedAt: formatISODate(matchData.startedAt),
      team1Score: Number(matchData.team1Score),
      team2Score: Number(matchData.team2Score),
    };

    try {
      const response = await fetch(`${apiUrl}/matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.value.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de la création du match");
      }

      const data = await response.json();
      console.log("Match créé avec succès:", data);
      return data;
    } catch (err) {
      error.value = err.message || "Erreur serveur"; // Update error.value here
      console.error("Erreur création match:", err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    teams,
    activities,
    isLoading,
    error,
    createMatch,
  };
}
