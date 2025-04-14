<script setup>
  import { ref } from "vue";

  const email = ref("");
  const password = ref("");

  function login() {

  }
</script>

<template>
  <main>
<form @submit.prevent="login">
  <label for="email">Email :</label>
  <input type="email" id="email" v-model="email">

  <label for="password">Mot de Passe : </label>
  <input type="password" id="password" v-model="password">
  <button>Connexion</button>
</form>
  </main>
</template>
