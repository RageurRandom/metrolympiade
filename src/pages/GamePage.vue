<script setup>
import { ref } from "vue";
import GameForm from "@/components/games/GameForm.vue";
import { useUserData } from "@/composables/useUserData";

const { user } = useUserData();
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6">Nouveau match</h1>
    <GameForm :user-team="user.team" />
    </div>
  </div>
</template>
