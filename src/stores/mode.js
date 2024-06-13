import { defineStore } from 'pinia';

export const useMode = defineStore('mode', {
  state: () => ({
    mode: ''
  }),
})
