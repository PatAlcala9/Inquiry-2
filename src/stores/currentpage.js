import { defineStore } from 'pinia';

export const useCurrentPage = defineStore('currentpage', {
  state: () => ({
    value: '',
  }),

  getters: {
    getValue: (state) => state.value,
    isNull: (state) => state.value === null || state.value === undefined
  },

  actions: {
    updateValue(page) {
      this.value = page
    },
    setHome() {
      this.value = '/'
    }
  },
})
