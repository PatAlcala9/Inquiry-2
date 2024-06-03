import { defineStore } from 'pinia'

export const useSearchValue = defineStore('searchvalue', {
  state: () => ({
    value: '',
  }),

  getters: {
    getValue: (state) => state.value,
    getLength: (state) => state.value.length
  },

  actions: {
    updateValue(val) {
      this.value = val
    },
  },
})
