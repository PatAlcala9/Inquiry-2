import { defineStore } from 'pinia';

export const useListSumPaid = defineStore('listsumpaid', {
  state: () => ({
    value: [],
  }),

  getters: {
    getTotal(state) {
      // let total = 0
      // state.value.map((sum) => {
      //   total += sum
      // })
      const sum = state.value.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      return sum
    },
    getSums(state) {
      return state.value.map((status) => status.name)
    },
    getValue(state) {
      return state.value
    },
  },

  actions: {
    addSum(sum) {
      this.value.push(parseFloat(sum))
    }
  },
})
