import axios from 'axios'
import type { CityData, CitySource } from '@/types/location.ts'

export const locationService = {
  async getCities() {
    const { data } = await axios.get<CitySource[]>('russian-cities.json')
    return data;
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
      const city = await this.getCityByCoords(params.lat, params.lon);
      return city;
    } else if ('cityName' in params) {
      const cities = await this.getCities();
      const city = cities.find((city) => city.name === params.cityName)
      if (city) {
        return city;
      }
      return undefined;
    }
  },
  async detectLocation(): Promise<{lat: number; lon: number} | undefined> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.log('current location wasn’t detected:', error);
          resolve(undefined);
        }
      )
    });
  },
}
