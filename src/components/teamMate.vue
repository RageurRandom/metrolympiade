<script setup>

const emits = defineEmits(['remove']); //event to ask the app to close the sidebar
defineProps(["name"]);

</script>

<template>
  <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
    <span class="text-gray-800 font-medium">{{ name }}</span>
    <button 
      @click="$emit('remove')" 
      class="text-red-500 hover:text-red-700 font-bold text-lg px-2 transition"
      title="Retirer"
    >
      ✕
    </button>
  </div>
</template>

