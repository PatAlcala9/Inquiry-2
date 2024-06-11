import { defineStore } from 'pinia'

export const useListDate = defineStore('listdate', {
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
