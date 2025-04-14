<script setup>
  import { ref } from "vue";

  const name = ref("");
  const email = ref("");
  const password = ref("");

  const teams = [
    {
      name: "test 1",
      id : 1
    },
    {
      name : "test 2",
      id: 2
    }
  ];

  function register() {

  }
</script>

<template>
  <main>
    <form @submit.prevent="register">
      <label for="name">Nom : </label>
      <input type="text" id="name" v-model="name">

      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email">

      <label for="password">Mot de Passe : </label>
      <input type="password" id="password" v-model="password">

      <label for="team">Equipe : </label>
      <select id="team" v-for="(teamName, id) in teams"
      :key="id">
        <option value="{{id}}">{{ teamName }}</option>
      </select>

      <button>Connexion</button>
    </form>
  </main>
</template>
