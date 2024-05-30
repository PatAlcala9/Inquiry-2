import { defineStore } from 'pinia'

export const useDivision = defineStore('division', {
  state: () => ({
    value: '',
  }),

  getters: {
    getValue: (state) => state.value,
    isBuilding: (state) =>  state.value === 'Building',
    isOccupancy: (state) => state.value === 'Occupancy',
    isElectrical: (state) => state.value === 'Electrical',
    isSignage: (state) => state.value === 'Signage',
    isMechanical: (state) => state.value === 'Mechanical',
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
    }
  },
})
