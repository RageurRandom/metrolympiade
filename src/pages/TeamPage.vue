<script setup>
import { useUserData } from '@/composables/useUserData';
import { computed, ref } from 'vue';
import teamMate from '@/components/teamMate.vue';

  const userInfos = computed(()=>{
    return useUserData().user;
  });

  const teamMates = ["test1", "test2"];

  console.log(userInfos.value)
  const newTeamName = ref("")

  function removeElt(){
    console.log("test");
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


        <teamMate v-for="teammateName in teamMates" :name="teammateName" @remove="removeElt()"/>

        <div>
          <button class="bg-gray-800 text-white p-2 rounded shadow-lg hover:bg-gray-700 transition-colors duration-300">
            Valider
          </button>
        </div>

      </form>


    </div>

  </main>

  <!--mettre chaque equipier dans un component-->
</template>
