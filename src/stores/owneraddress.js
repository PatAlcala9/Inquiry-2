import { defineStore } from 'pinia'

export const useOwneraddress = defineStore('owneraddress', {
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
