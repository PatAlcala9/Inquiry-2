import { defineStore } from 'pinia';

export const useListPermitCount = defineStore('listpermitcount', {
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
