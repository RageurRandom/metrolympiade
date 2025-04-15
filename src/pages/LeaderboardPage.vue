<script setup>
import { ref, onMounted } from 'vue'

const ranking = ref([])
const isLoading = ref(false)
const error = ref(null)

const fetchLeaderboard = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await fetch('http://localhost:3000/ranking')
    ranking.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Erreur:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLeaderboard()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <main class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-black border-b-2 border-green-500 pb-4 mb-6">
        Classement générale
      </h1>

      <div v-if="isLoading" class="text-center text-gray-500">Chargement...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2 text-left text-gray-600">#</th>
              <th class="px-4 py-2 text-left text-gray-600">Nom</th>
              <th class="px-4 py-2 text-left text-gray-600">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(team, index) in ranking" 
              :key="index" 
              class="odd:bg-white even:bg-gray-50"
            >
            <td 
                class="px-4 py-2 text-black"
                :class="{
                  'text-yellow-500 font-bold': index === 0, // Or
                  'text-gray-400 font-bold': index === 1,  // Argent
                  'text-orange-500 font-bold': index === 2 // Bronze
                }"
              >
                {{ index + 1 }}
              </td>
              <td
                class="px-4 py-2 text-black"
                :class="{
                  'text-yellow-500 font-bold': index === 0, // Or
                  'text-gray-400 font-bold': index === 1,  // Argent
                  'text-orange-500 font-bold': index === 2 // Bronze
                }">{{ team.team }}
              </td>
              <td                 
                class="px-4 py-2 text-black"
                :class="{
                  'text-yellow-500 font-bold': index === 0, // Or
                  'text-gray-400 font-bold': index === 1,  // Argent
                  'text-orange-500 font-bold': index === 2 // Bronze
                }">{{ team.points }}
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>