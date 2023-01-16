import { defineStore } from 'pinia'

type GlobalStateType = {
  darkTheme: boolean
}

export const useGlobalStore = defineStore('gobalSetting', {
  state: (): GlobalStateType => {
    return {
      darkTheme: false
    }
  },
  actions: {
    changeTheme(val: boolean) {
      this.darkTheme = val
    }
  }
})

export {}
