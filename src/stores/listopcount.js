import { defineStore } from 'pinia';

export const useListOPCount = defineStore('listopcount', {
  state: () => ({
    value: 0
  }),

  getters: {
    getValue: (state) => state.value
  },

  actions: {
    updateValue (count) {
      this.value = count
    }
  }
})
