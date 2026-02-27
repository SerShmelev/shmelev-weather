import { defineStore } from 'pinia'
import axios from 'axios'
import type { CityData, CitySource } from '@/types/location.ts'


interface LocationStorageState {
  currentCity: Partial<CitySource> | null;
  cities: CitySource[];
}

export const useLocationStore = defineStore('location',{
  state: ():LocationStorageState => ({
    currentCity: null,
    cities: [] as CitySource[],
  }),
  getters: {
    getCurrentCity(state): Partial<CitySource> | null {
      return state.currentCity ?? null
    },
    getCities(state): CitySource[] {
      return state.cities
    },
  },
  actions: {
    async getAllCities() {
      const { data } = await axios.get<CitySource[]>('russian-cities.json')
      this.cities = data.filter((city) => city.population > 300000);
    },
    async getCityByCoords(latitude: number, longitude: number): Promise<Partial<CitySource>> {
      const params = new URLSearchParams();
      params.append('accept-language', 'ru');
      params.append('format', 'json');
      params.append('lat', latitude.toString());
      params.append('lon', longitude.toString());

      const url = 'https://nominatim.openstreetmap.org/reverse';
      const { data } = await axios.get<CityData>(url, { params })
      const cityName = data.address.city;
      return {
        coords: {
          lat: latitude,
          lon: longitude,
        },
        name: cityName,
      }
    },
    async setCurrentCity<T extends {lat: number, lon: number} | {cityName: string}>(params: T){
      if ('lat' in params && 'lon' in params) {
        this.currentCity = await this.getCityByCoords(params.lat, params.lon);
      } else if ('cityName' in params) {
        const city = this.cities.find((city) => city.name === params.cityName)
        if (city) {
          this.currentCity = city;
        }
      }
    }
  }
});
