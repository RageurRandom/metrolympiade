<script setup>
  import { ref } from "vue";
  import { apiUrl } from "@/main";


  const name = ref("");
  const email = ref("");
  const password = ref("");
  const teamName = ref("");

  const isLoading = ref(false);

  function register() {


    isLoading.value = true;

    fetch(apiUrl + "/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username: name.value,
      email: email.value,
      password: password.value,
      teamName: teamName.value
    }),
  })
    .then((res) => res.json())
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
    <form @submit.prevent="register">
      <label for="name">Nom : </label>
      <input type="text" id="name" v-model="name">

      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email">

      <label for="password">Mot de Passe : </label>
      <input type="password" id="password" v-model="password">

      <label for="teamName">Nom de l'Equipe : </label>
      <input type="text" id="teamName" v-model="teamName">

      <button>Connexion</button>
    </form>

    <div v-if="isLoading">
      Chargement . . .
    </div>
  </main>
</template>

<style scoped>

</style>
