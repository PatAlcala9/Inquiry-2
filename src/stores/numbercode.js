import { defineStore } from 'pinia'

export const useNumberCode = defineStore('numbercode', {
  state: () => ({
    value: '0',
  }),

  getters: {
    check: (state) => state.value === process.env.PIN_CODE,
    getValue: (state) => state.value,
  },

  actions: {
    updateValue(code) {
      this.value = code.toString()
    },
    clear() {
      this.value = '0'
    },
  },
})
