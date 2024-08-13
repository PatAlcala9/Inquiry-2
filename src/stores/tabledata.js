import { defineStore } from 'pinia';

export const useTableData = defineStore('tabledata', {
  state: () => ({
    tabledata: {},
  }),

  getters: {
    getTable: (state) => state.value,
  },

  actions: {
    updateTable(data) {
      this.value = data
    },
  },
})
