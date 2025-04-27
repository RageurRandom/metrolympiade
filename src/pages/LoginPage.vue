<script setup>
import { ref } from "vue";
import { apiUrl } from "@/main";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const error = ref(null);

function login() {
  if (!email.value || !password.value) {
    error.value = "Email et mot de passe sont obligatoires";
    return;
  }

  isLoading.value = true;
  error.value = null;

  fetch(apiUrl + "/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then((res) => {
    if (!res.ok) throw new Error("Identifiants incorrects");
    return res.json();
  })
  .then((data) => {
    localStorage.setItem("user", JSON.stringify(data));
    location.replace("/"); 
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
      <h1 class="text-2xl font-bold text-white text-center mb-8">Connexion</h1>
      
      <form @submit.prevent="login" class="h-full flex flex-col justify-center space-y-6">
        <div>
          <br>
    <input
      type="email"
      v-model="email"
      placeholder="Email"
      class="w-full px-4 py-3 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 bg-transparent"
      required
    />
        </div>
        
        <div>
          <br>
    <input
      type="password"
      v-model="password"
      placeholder="Mot de passe"
      class="w-full px-4 py-3 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 bg-transparent"
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
      <span v-if="!isLoading">Connexion</span>
      <span v-else>Connexion en cours...</span>
      </button>
    </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </form>

      <p class="mt-4 text-center text-gray-600">
        <br>
        Pas encore de compte ? 
        <router-link to="/register" class="text-green-400 hover:underline">
          Je m'inscris
        </router-link>
      </p>
    </div>
  </main>
</template>