import { defineStore } from 'pinia';

export const useListStatus = defineStore('liststatus', {
  state: () => ({
    value: [],
  }),

  getters: {
    allStatus(state) {
      return state.value.map((status) => status.name)
    },
  },

  actions: {
    addStatus(text) {
      this.value.push(text)
    },
    reset() {
      this.value = []
    },
  },
})
