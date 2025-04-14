

// returns user data from local storage
export function useUserData() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    return localStorageData; 
  }