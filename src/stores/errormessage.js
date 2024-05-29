import { defineStore } from 'pinia'

export const useErrorMessage = defineStore('errormessage', {
  state: () => {
    return {
      message: '',
      subMessage: '',
    }
  },

  getters: {
    getMessage(state) {
      return state.message
    },
    getSubMessage(state) {
      return state.subMessage
    },
  },

  actions: {
    updateMessage(msg) {
      this.message = msg
    },
    updateSubMessage(msg) {
      this.subMessage = msg
    },
  },
})
