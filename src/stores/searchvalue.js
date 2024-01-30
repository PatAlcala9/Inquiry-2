import { defineStore } from 'pinia';

export const useSearchValue = defineStore('searchvalue', {
  state: () => ({
    value: ''
  }),
})
