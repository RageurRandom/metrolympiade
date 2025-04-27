<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  activities: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="space-y-2">
    <label class="block font-medium">Activité</label>
    <select
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
      class="w-full p-2 border rounded bg-gray-700 text-white"
      :disabled="disabled"
      required
    >
      <option value="" disabled>Sélectionner une activité</option>
      <option v-for="activity in activities" :key="activity.id" :value="activity.id">
        {{ activity.name }}
      </option>
    </select>
  </div>
</template>
