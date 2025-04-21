import { ref } from 'vue'

const getLocalStorageData = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

const user = ref(getLocalStorageData())

const logout = () => {
  localStorage.removeItem('user')
  window.location.reload() // To refresh the page and remove user data from the state
}

export function useUserData() {
  return {
    user,
    logout
  }
}