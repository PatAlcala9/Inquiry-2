import { defineStore } from 'pinia';

export const useCurrentPage = defineStore('currentpage', {
  state: () => ({
    value: '',
  }),

  getters: {
    getCurrentPage: (state) => state.value,
    isNull: (state) => state.value === null || state.value === undefined
  },

  actions: {
    updatePage(page) {
      this.value = page
    },
  },
})
