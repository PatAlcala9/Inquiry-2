import { defineStore } from 'pinia';

export const useListSumPaid = defineStore('listsumpaid', {
  state: () => ({
    value: [],
  }),

  getters: {
    getTotal: (state) => {
      const sum = state.value.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      return sum
    },
    getSums: (state) => state.value.map((status) => status.name),
    getValue: (state) => state.value,
  },

  actions: {
    addSum(sum) {
      this.value.push(parseFloat(sum))
    }
  },
})
