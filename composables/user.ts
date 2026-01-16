import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userName = ref('修改看看!這是來自pinia的默認值,同時也是title的值')
  function setNewName(name: string) {
    userName.value = name
  }

  return {
    setNewName,
    userName,
  }
})

// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
