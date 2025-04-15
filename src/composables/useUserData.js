import { computed } from 'vue'

export function useUserData() {
  const getLocalStorageData = () => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  }
  
  const user = computed(() => getLocalStorageData())
  
  const logout = () => {
    localStorage.removeItem('user')
    window.location.reload() // Pour rafraîchir l'état de l'application
  }
  
  return {
    user,
    logout
  }
}