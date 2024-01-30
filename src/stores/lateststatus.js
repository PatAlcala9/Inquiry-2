import { defineStore } from 'pinia';

export const useLatestStatus = defineStore('lateststatus', {
  state: () => ({
    lateststatus: ''
  })
})
