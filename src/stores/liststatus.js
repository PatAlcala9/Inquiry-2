import { defineStore } from 'pinia';

export const useListStatus = defineStore('liststatus', {
  state: () => ({
    value: [],
  }),

  getters: {
    allStatus(state) {
      return state.value.map((status) => status.name)
    },
    allStatusArray(state) {
      return state.value
    }
  },

  actions: {
    addStatus(text) {
      this.value.push(text)
    }
  },
})
