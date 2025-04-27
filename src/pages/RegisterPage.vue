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
  .then((res) => {
    if (!res.ok) throw new Error("Erreur lors de l'inscription");
    return res.json();
  })
  .then((data) => {
    localStorage.setItem("user", JSON.stringify(data));
    router.push("/");
  })
  .catch((err) => {
    error.value = err.message;
    console.error(err);
  })
  .finally(() => {
    isLoading.value = false;
  });
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center">
    <div class="p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-white text-center mb-8">
        Inscription</h1>
      
<form @submit.prevent="register" class="h-full flex flex-col justify-center space-y-6">
    

  <div>
    <br>
    <input
      type="text"
      v-model="name"
      placeholder="Nom d'utilisateur"
      class="w-full px-4 py-3 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 bg-transparent"
      required
    />
  </div>

  <div>
    <br>
    <input
      type="text"
      v-model="teamName"
      placeholder="Nom d'équipe"
      class="w-full px-4 py-3 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 bg-transparent"
      required
    />
  </div>

  <div>
    <br>
    <input
      type="email"
      v-model="email"
      placeholder="Email"
      class="w-full px-4 py-3 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 bg-transparent"
      required
    />
  </div>

  <div>
    <br>
    <input
      type="password"
      v-model="password"
      placeholder="Mot de passe"
      class="w-full px-4 py-3 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 bg-transparent"
      required
    />
  </div>

  <div class="mt-6">
    <br>
      <button
        type="submit"
        class="w-full cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
        :disabled="isLoading"
      >
      <span v-if="!isLoading">J'inscris mon équipe</span>
      <span v-else>Inscription en cours...</span>
      </button>
    </div>

  <div v-if="error" class="text-red-500 text-sm text-center">
    {{ error }}
  </div>

</form>


      <p class="mt-4 text-center text-gray-600">
        <br>
        Déjà inscrit ? 
        <router-link to="/login" class="text-green-400 hover:underline">
          Me connecter
        </router-link>
      </p>
    </div>
  </main>
</template>