import { defineStore } from 'pinia'

export const useListDate = defineStore('listdate', {
  state: () => ({
    value: '',
  }),
})
