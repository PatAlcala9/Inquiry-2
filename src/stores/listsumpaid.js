import { defineStore } from 'pinia';

export const useListSumPaid = defineStore('listsumpaid', {
  state: () => ({
    value: []
  }),

  getters: {
    getTotal (state) {
      let total = 0
      state.value.map((sum) => {
        total += sum
      })
      return total
    }
  },

  actions: {
    addSum (sum) {
      this.value.push(sum)
    }
  }
})
