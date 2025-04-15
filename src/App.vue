<script setup>
    import {useRouter} from 'vue-router'
    import Sidebar from './components/Sidebar.vue'
    import {ref} from 'vue'

    const sidebarIsOpen = ref(false); 

    function changeSidebarStatus() {
        sidebarIsOpen.value = !sidebarIsOpen.value;
    }

</script>

<template>

    <button @click="changeSidebarStatus">☰</button>

    <Sidebar :isOpen="sidebarIsOpen" @close-Request="changeSidebarStatus"></Sidebar>

    <RouterView></RouterView>
</template>
