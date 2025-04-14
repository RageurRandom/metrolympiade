<script setup>
  import { ref } from "vue";
  import {apiUrl} from "constants"

  const email = ref("");
  const password = ref("");
  const isLoading = ref(false);

  function login() {
    isLoading.value = true;

    fetch(apiUrl + "/auth/login", {
      method : "POST",
      body : JSON.stringify({
        email: email.value,
        password: password.value
      })
    }).then((res) => res.json())
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isLoading.value = false;
    });

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
    <div v-if="isLoading">
      Chargement . . .
    </div>
  </main>
</template>

<style scoped>

</style>
