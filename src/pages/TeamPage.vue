<script setup>
import { useUserData } from '@/composables/useUserData';
import { ref } from 'vue';
import teamMate from '@/components/teamMate.vue';
import { apiUrl } from '@/main';

  const user = useUserData().user; //get the user data from the composable
  const teamMates = ref(new Array());
  const teamName = ref("");

  const newTeamMateName = ref("");

  const isLoading = ref(true);

  console.log(user.value);

  //Récupération de l'équipe
  fetch(apiUrl + "/teams/me", {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + user.value.token
    }
  })
  .then((res) => {
    if (!res.ok) throw new Error("Identifiants incorrects");
    return res.json();
  })
  .then((data) => {
    console.log(data);

    if(data.members != undefined){

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



  function removeElt(){

  }

  function addTeamMate(){
    teamMates.value.push(newTeamMateName.value);
    newTeamMateName.value = "";
    console.log(JSON.stringify(teamMates.value));
  }

  function saveChanges(){
    fetch(apiUrl + "/teams/me", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + user.value.token
      },
      body: JSON.stringify({
        name: teamName.value,
        members: teamMates.value
      }),
    })
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de l'inscription");
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
  }
</script>

<template>
  <main class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-8">Mon Equipe</h1>

      <form @submit.prevent="" class="space-y-4">
        <div>
          <label for="team_name">Nom de l'équipe : </label>
          <input type="text" id="team_name" v-model="teamName">
        </div>


        <teamMate v-if="!isLoading" v-for="i in teamMates.lenght":key=i :name="teamMates.value[i]" @remove="removeElt()"/>
        <p v-if="isLoading">Chargement . . .</p>

        <label for="newTeamMate">Nouveau joueur : </label>
        <input type="text" id="newTeamMate" v-model="newTeamMateName">
        <button @click="addTeamMate" class="bg-gray-400 text-white p-2 rounded shadow-lg hover:bg-gray-300 transition-colors duration-300">
          +
        </button>

        <div>
          <button class="bg-gray-800 text-white p-2 rounded shadow-lg hover:bg-gray-700 transition-colors duration-300"
          @click="saveChanges">
            Valider
          </button>
        </div>

      </form>


    </div>

  </main>

  <!--mettre chaque equipier dans un component-->
</template>
