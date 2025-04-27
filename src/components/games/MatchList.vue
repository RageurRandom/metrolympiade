<script setup>
import MatchCard from './MatchCard.vue';

defineProps({
  matches: {
    type: Array,
    required: true
  },
  teamName: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div v-if="matches.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
    <p class="text-gray-500">Aucun match enregistré</p>
  </div>

  <div v-else>
    <MatchCard
      v-for="match in matches"
      :key="match.id"
      :match="match"
      :team-name="teamName"
    />
  </div>
</template>
