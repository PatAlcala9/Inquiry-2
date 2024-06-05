import { defineStore } from 'pinia'

export const useListYear = defineStore('listyear', {
  state: () => ({
    value: 0,
  }),

  getters: {
    getValue: (state) => state.value,
    isNull: (state) => state.value === 0 || state.value === null
  },

  actions: {
    updateValue(status) {
      this.value = status
    },
  },
})
