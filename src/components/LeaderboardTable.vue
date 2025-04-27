<script setup>
defineProps({
  ranking: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  error: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div>
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
                'text-yellow-500 font-bold': index === 0,
                'text-gray-400 font-bold': index === 1,
                'text-orange-500 font-bold': index === 2
              }"
            >
              {{ index + 1 }}
            </td>
            <td
              class="px-4 py-2 text-black"
              :class="{
                'text-yellow-500 font-bold': index === 0,
                'text-gray-400 font-bold': index === 1,
                'text-orange-500 font-bold': index === 2
              }"
            >
              {{ team.team }}
            </td>
            <td
              class="px-4 py-2 text-black"
              :class="{
                'text-yellow-500 font-bold': index === 0,
                'text-gray-400 font-bold': index === 1,
                'text-orange-500 font-bold': index === 2
              }"
            >
              {{ team.points }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
