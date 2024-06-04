import { defineStore } from 'pinia'

export const useListYear = defineStore('listyear', {
  state: () => ({
    value: 0,
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
