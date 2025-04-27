<script setup>
defineProps({
  match: {
    type: Object,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 !mb-4 border-l-4 border-green-400">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold text-gray-500">{{ match.activity }}</h3>
        <p class="text-gray-500">
          {{
            new Date(match.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }}
        </p>
      </div>

      <div class="text-right">
        <div class="font-medium text-gray-500">{{ teamName }}</div>
        <div class="text-gray-600">vs {{ match.team2 }}</div>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
      <span class="font-bold text-gray-500">Score:</span>
      <span class="text-gray-500">{{ match.team1Score }} - {{ match.team2Score }}</span>
    </div>
  </div>
</template>
