<script setup>
import { ref } from "vue";
import { apiUrl } from "@/main";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const teamName = ref("");
const isLoading = ref(false);
const error = ref(null);


function register() {
  if (!name.value || !email.value || !password.value || !teamName.value) {
    error.value = "Tous les champs sont obligatoires";
    return;
  }

  isLoading.value = true;
  error.value = null;
  
  fetch(apiUrl + "/auth/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: name.value,
      email: email.value,
      password: password.value,
      teamName: teamName.value
    }),
  })
  .then((response) => response.json())
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
