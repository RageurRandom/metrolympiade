<script setup>
import { useUserData } from '@/composables/useUserData';
import { ref } from 'vue';
import teamMate from '@/components/teamMate.vue';
import { apiUrl } from '@/main';

  const user = useUserData().user; //get the user data from the composable
  const teamMates = ref([]); //get the team mates from the user data
  const teamName = ref("");

  const newTeamMateName = ref("");

  const isLoading = ref(true);

  //Getting the team
  fetch(apiUrl + "/teams/me", {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + user.value.token
    }
  })
  .then((res) => {
    if (!res.ok) throw new Error("Impossible de récupérer les information de l'équipe");
    return res.json();
  })
  .then((data) => {
    console.log(data);
    console.log(user.value);
    if(data.members != null){

      data.members.forEach(element => {
        teamMates.value.push(element);
      });
    }

    teamName.value = data.name;
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    isLoading.value = false;
  });



  function removeMate(i){
    teamMates.value.splice(i, 1);
  }

  function addTeamMate(){
    teamMates.value.push(newTeamMateName.value);
    newTeamMateName.value = "";
  }

  function saveChanges(){
    const body = JSON.stringify({
      name: teamName.value,
      members: teamMates.value
    });
    console.log(body);
    fetch(apiUrl + "/teams/me", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + user.value.token,
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement des modifications");
      return res.json();
    })
    .then((data) => {
      console.log(data);
      user.value.team.name = teamName.value; //Update the team name in the user data
      localStorage.setItem("user", JSON.stringify(user.value)); //Update the user data in the local storage
      alert("Modifications enregistrées !");
    })
    .catch((err) => {
      console.error(err);
    });
  }
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Mon Équipe</h1>

      <form @submit.prevent="">
        <!-- Team name -->
        <div class="mb-4">
          <label for="team_name" class="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'équipe :
          </label>
          <input 
            type="text" 
            id="team_name" 
            v-model="teamName"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Loadings -->
        <p v-if="isLoading" class="text-center text-gray-500 mb-4">Chargement . . .</p>

        <!-- List of teammates -->
        <div v-if="!isLoading" class="space-y-2 mb-4">
          <teamMate 
            v-for="(mate, i) in teamMates"
            :key="i"
            :name="teamMates[i]"
            @remove="removeMate(i)"
          />
        </div>

        <!-- New teammate -->
        <div class="mb-4">
          <label for="newTeamMate" class="block text-sm font-medium text-gray-700 mb-1">
            Nouveau joueur :
          </label>
          <input 
            type="text" 
            id="newTeamMate" 
            v-model="newTeamMateName"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- add button -->
        <div class="flex justify-end mb-4">
          <button 
            @click="addTeamMate"
            :disabled="newTeamMateName.trim().length === 0"
            type="button"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            +
          </button>
        </div>

        <!-- validation button -->
        <div class="flex justify-center">
          <button 
            @click="saveChanges"
            :disabled="teamName.trim().length === 0"
            class="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

