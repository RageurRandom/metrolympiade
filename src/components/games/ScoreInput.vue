<script setup>
defineProps({
  team1Score: {
    type: Number,
    required: true,
  },
  team2Score: {
    type: Number,
    required: true,
  },
  team1Name: {
    type: String,
    default: "Équipe 1",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:team1Score", "update:team2Score"]);
</script>

<template>
  <div class="space-y-4 border-t pt-4 !mt-5 !mb-5">
    <h2 class="font-bold">Scores finaux</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="block">{{ team1Name }}</label>
        <input
          type="number"
          :value="team1Score"
          @input="emit('update:team1Score', $event.target.valueAsNumber)"
          min="0"
          class="w-full p-2 border rounded bg-gray-700 text-white"
          :disabled="disabled"
        />
      </div>
      <div class="space-y-2">
        <label class="block">Adversaire</label>
        <input
          type="number"
          :value="team2Score"
          @input="emit('update:team2Score', $event.target.valueAsNumber)"
          min="0"
          class="w-full p-2 border rounded bg-gray-700 text-white"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>
