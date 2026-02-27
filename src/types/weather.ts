import type { Coords } from '@/types/location.ts'

export interface Clouds {
  all: number;
}

export interface SunInfo {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface WeatherMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface Wind {
  deg: number;
  gust: number; // порыв
  speed: number;
}

export interface WeatherCommon {
  base: string;
  con: number;
  dt: number;
  id: number;
  name: string;
  timezone: number;
  visibility: number;
  main: WeatherMain;
  coord: Coords;
  sys: SunInfo;
  wind: Wind;
}


export interface WeatherCommon2 {
  clouds: Clouds; //Облачность, %
  visibility: number;
  dt: number;
  dt_txt: string;
  pop: number; // вероятность осадков
  main: WeatherMain;
  weather: [{description: string}],
  wind: Wind;
}

export interface WeatherCityInfo {
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  coord: Coords;
}

export interface WeekWeather {
  city: WeatherCityInfo;
  list: WeatherCommon2[];
}
