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
  <main class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-8">Inscription</h1>
      
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-2">Nom d'utilisateur</label>
          <input
            type="text"
            v-model="name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Nom d'équipe</label>
          <input
            type="text"
            v-model="teamName"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">J'inscris mon équipe</span>
          <span v-else>Inscription en cours...</span>
        </button>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </form>

      <p class="mt-4 text-center text-gray-600">
        Déjà inscrit ? 
        <router-link to="/login" class="text-blue-500 hover:underline">
          Me connecter
        </router-link>
      </p>
    </div>
  </main>
</template>