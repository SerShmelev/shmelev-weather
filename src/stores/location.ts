import { defineStore } from 'pinia'
import type { CitySource } from '@/types/location.ts'

interface LocationState {
  currentCity: CitySource | null;

}
export const useLocationStore2 = defineStore('locationStore',{
  state: () => ({
    currentCity: null,
  }),
  actions: {
    async detectLocation() {
      navigator.geolocation.getCurrentPosition(async (position) => {

      })
    }
  }
})
