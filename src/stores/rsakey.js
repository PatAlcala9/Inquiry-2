import { defineStore } from 'pinia'

export const useRSAKey = defineStore('rsakey', {
  state: () => {
    return {
      private: ``,
      public: ``,
    }
  },

  getters: {
    privatekey: (state) => state.private,
    publickey: (state) => state.public,
  },
})
