import { defineStore } from 'pinia';

export const useOwnername = defineStore('ownername', {
  state: () => ({
    ownername: ''
  })
})
