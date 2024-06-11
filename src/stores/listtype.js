import { defineStore } from 'pinia';

export const useListType = defineStore('listtype', {
  state: () => ({
    value: ''
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
