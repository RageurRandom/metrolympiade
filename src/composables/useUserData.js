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
    window.location.reload() // To refresh the page and remove user data from the state
  }
  
  return {
    user,
    logout
  }
}