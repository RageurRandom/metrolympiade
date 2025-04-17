<script setup>

const emits = defineEmits(['remove']); //event to ask the app to close the sidebar
defineProps(["name"]);

</script>

<template>
  <div>
    <p>{{ name }}</p>
    <button class="bg-gray-800 text-white p-2 rounded shadow-lg hover:bg-gray-700 transition-colors duration-300" @click="remove">X</button>
  </div>
</template>
