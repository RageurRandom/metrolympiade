<script setup>
import { useUserData } from '@/composables/useUserData';
import { computed } from 'vue';
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    isOpen: { //prop to control the sidebar visibility
        type: Boolean,
        default: false,
    }
}); 

const emits = defineEmits(['closeRequest']); //event to ask the app to close the sidebar

const user = useUserData().user; //get the user data from the composable
const logout = useUserData().logout; //get the logout function from the composable

const isConnected = computed(() => { //check if the user is connected
    return user.value != null;
});

const router = useRouter(); //get the router instance
console.log(user); 

</script>

<template>
    <div         
        :class="[
            'fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-transform duration-300',
            props.isOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
        style="width: 250px;"
    >

        <!-- button to close the sidebar -->
        <button 
            @click="$emit('closeRequest')"
            class="absolute top-4 right-4 text-white text-xl"
        >
            &times;
        </button>

        <h2 class="text-2xl font-bold p-4">Metrolympiade</h2>

        <h3 v-if="isConnected" class="text-lg font-semibold p-4">{{ user.team.name }}</h3>

        <nav class="flex flex-col space-y-4 p-4">

            <!-- Link to the leaderboard page -->
            <a 
                @click="()=>{router.push('/leaderboard'); emits('closeRequest')}"
                class="hover:text-gray-300"
            >
                Classement générale
            </a> 

            <!-- Link to the team page -->
            <a 
                v-if="isConnected" 
                @click="()=>{router.push('/team'); emits('closeRequest')}"
                class="hover:text-gray-300"
            >
                Mon équipe
            </a>
            
            <!-- Link to the games' page -->
            <a 
                v-if="isConnected"
                @click="()=>{router.push('/games'); emits('closeRequest')}"
                class="hover:text-gray-300"
            >
                Mes matches
            </a>

            <!-- Link to logout the user -->
            <a v-if="isConnected" @click="logout()">
                Se déconnecter
            </a>

            <a 
                v-if="!isConnected" 
                @click="()=>{router.push('/login'); emits('closeRequest')}"
            >
                Se connecter
            </a> <!-- Link to logout the user -->
        </nav>

    </div>
</template>