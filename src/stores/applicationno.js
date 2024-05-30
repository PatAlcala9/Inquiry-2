import { defineStore } from 'pinia';

export const useApplicationNo = defineStore('applicationno', {
  state: () => ({
    value: '',
  }),

  getters: {
    getValue: (state) => state.value,
  },

  actions: {
    updateValue(appno) {
      this.value = appno
    }
  },
})
