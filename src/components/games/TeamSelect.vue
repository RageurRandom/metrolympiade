<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  teams: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  userTeamId: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="space-y-2">
    <label class="block font-medium">Adversaire</label>
    <select
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
      class="w-full p-2 border rounded"
      :disabled="disabled"
      required
    >
      <option value="" disabled>Sélectionner une équipe</option>
      <option
        v-for="team in teams.filter((t) => t.id !== userTeamId)"
        :key="team.id"
        :value="team.id"
      >
        {{ team.name }}
      </option>
    </select>
  </div>
</template>
