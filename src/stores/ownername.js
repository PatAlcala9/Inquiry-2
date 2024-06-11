import { defineStore } from 'pinia';

export const useOwnername = defineStore('ownername', {
  state: () => ({
    value: '',
  }),

  getters: {
    getValue: (state) => state.value,
  },

  actions: {
    updateValue(status) {
      this.value = status
    },
  },
})
