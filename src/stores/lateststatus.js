import { defineStore } from 'pinia'

export const useLatestStatus = defineStore('lateststatus', {
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
