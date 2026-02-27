
export interface Address {
  city: string;
  country: string;
  state: string;
  region: string;
}

export interface CityData {
  address: Address
}

export interface Coords {
  lat: number;
  lon: number;
}

export interface CitySource {
  coords: Coords;
  district: string;
  name: string;
  population: number;
  subject: string;
}
