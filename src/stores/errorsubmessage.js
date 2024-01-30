import { defineStore } from 'pinia';

export const useErrorSubMessage = defineStore('errorsubmessage', {
  state: () => ({
    value: ''
  })
})
