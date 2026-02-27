import axios, { type AxiosRequestConfig } from 'axios';
import type { WeatherCommon } from '@/types/weather.ts'

const apiKey = '6e874dfac846e6000193e24088646817';
const apiKey2 = 'dfb4ce0835828bfceb906aea5b168bbb';
const API_URL = 'https://api.openweathermap.org/data/2.5';

export default {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherCommon | null> {
    try {
      const config: AxiosRequestConfig = {
        params: {
          lat,
          lon,
          appid: apiKey,
          lang: 'ru',
          units: 'metric',
        }
      }
      const { data } = await axios.get(`${API_URL}/weather`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  async getWeekWeather(lat: number, lon: number) {
    try {
      const config: AxiosRequestConfig = {
        params: {
          lat,
          lon,
          appid: apiKey2,
          lang: 'ru',
          units: 'metric',
          cnt: 14,
        }
      }
      const { data } = await axios.get(`${API_URL}/forecast`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
