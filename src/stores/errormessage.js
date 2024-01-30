import { defineStore } from 'pinia';

export const useErrorMessage = defineStore('errormessage', {
  state: () => ({
    value: ''
  }),
})
