<script setup>
import { ref, onMounted } from 'vue'
import { useUserData } from '../composables/useUserData'

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
  }
}

onMounted(() => {
  fetchLeaderboard()
})
</script>

<template>
    <div class="app-layout">  
      <!-- Main content -->
      <main class="main-content">
        <h1 class="leaderboard-title">Classement générale</h1>
        
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Équipe</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team, index) in ranking" :key="team.team">
              <td class="rank-cell">{{ index + 1 }}</td>
              <td class="team-cell">{{ team.team }}</td>
              <td class="points-cell">{{ team.points }}pts</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  </template>

<style scoped>
body, html {
    height: 100%;
    margin: 0;
}

.main-content {
    width: 1000px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: auto;
}

.leaderboard-container {
    max-width: 800px;
    margin: 0 auto;
}

.leaderboard-title {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #42b983;
}

.leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.leaderboard-table th {
    background-color: #42b983;
    color: white;
    padding: 12px 15px;
    text-align: left;
}

.leaderboard-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
}

.leaderboard-table tr:nth-child(even) {
    background-color: #f8f9fa;
}

.leaderboard-table tr:hover {
    background-color: #f1f1f1;
}

.rank-cell {
    font-weight: bold;
    color: #2c3e50;
    width: 50px;
}

.team-cell {
    color: #2c3e50;
    font-weight: 500;
}

.points-cell {
    font-weight: bold;
    color: #42b983;
    text-align: right;
}

/* Style pour la première place */
.leaderboard-table tr td {
    background-color: #fff9e6;
}

.leaderboard-table tr:first-child .points-cell {
    color: #ffc107;
    font-size: 1.1em;
}
</style>