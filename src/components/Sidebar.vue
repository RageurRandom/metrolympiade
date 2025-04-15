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

const sidebarVisibilty = computed(() => { 
    return props.isOpen ? 'block' : 'none';
});

const user = useUserData(); //get the user data from the composable
const isConnected = computed(() => { //check if the user is connected
    return user != null;
});

const router = useRouter(); //get the router instance

//function to log out the user
function logOut(){
    localStorage.removeItem('user'); //remove the user data from local storage
    location.reload(); //reload the page to update the app state
}

</script>

<template>
    <div :style="{display:sidebarVisibilty}">

        <!-- button to close the sidebar -->
        <button @click="$emit('closeRequest')">Fermer &times;</button>

        <h2>Metrolympiade</h2>
        <h3 v-if="isConnected">{{ user.team.name }}</h3> <!-- show the team name if the user is connected -->
        
        <a href="/leadboard">Classement générale</a>

        <a v-if="isConnected" href="/team">Mon équipe</a>

        <a v-if="isConnected" href="/games">Mes matches</a>

        <a @click="()=>{if(isConnected) logOut(); else router.push('/login')}">
            {{ isConnected ? 'Se déconnecter' : 'Se connecter' }}
        </a>

    </div>
</template>