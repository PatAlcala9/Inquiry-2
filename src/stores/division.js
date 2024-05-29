import { defineStore } from 'pinia'

export const useDivision = defineStore('division', {
  state: () => ({
    value: '',
  }),

  getters: {
    getValue(state) {
      return state.value
    },
    isBuilding(state) {
      return state.value === 'Building'
    },
    isOccupancy(state) {
      return state.value === 'Occupancy'
    },
    isElectrical(state) {
      return state.value === 'Electrical'
    },
    isSignage(state) {
      return state.value === 'Signage'
    },
    isMechanical(state) {
      return state.value === 'Mechanical'
    },
  },

  actions: {
    setBuilding() {
      this.value = 'Building'
    },
    setOccupancy() {
      this.value = 'Occupancy'
    },
    setSignage() {
      this.value = 'Signage'
    },
    setElectrical() {
      this.value = 'Electrical'
    },
    setMechanical() {
      this.value = 'Mechanical'
    },
    setUndefined() {
      this.value = undefined
    },
  },
})
