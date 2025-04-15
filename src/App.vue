<script setup>
    import {useRouter} from 'vue-router'
    import Sidebar from './components/Sidebar.vue'
    import {ref} from 'vue'

    const sidebarIsOpen = ref(false); 

    function changeSidebarStatus(isOpen) {
        sidebarIsOpen.value = isOpen;
    }

</script>

<template>

    <!-- Button to open the sidebar -->
    <button 
        @click="changeSidebarStatus(true)" 
        class="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded shadow-lg hover:bg-gray-700 transition-colors duration-300"
    >
        ☰
    </button>

    <!-- Sidebar -->
    <Sidebar :isOpen="sidebarIsOpen" @close-Request="changeSidebarStatus(false)"></Sidebar>

    <!-- Router view -->
    <RouterView></RouterView>
</template>
