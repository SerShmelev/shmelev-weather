<script setup lang="ts">

import { computed, onMounted, provide, ref, watch } from 'vue'
import MainHeader from '@/widgets/MainHeader.vue'
import weatherService from '@/services/weatherService.ts'
import { locationService } from '@/services/locationService.ts'
import type { CitySource } from '@/types/location.ts'
import type { WeekWeather } from '@/types/weather.ts'

const isLoading = ref(false);

const allCities = ref<CitySource[]>([]);

const currentCity = ref<CitySource | null>(null);


const init = async () => {
  try {
    isLoading.value = true;
    const [currentCoords, cities] = await Promise.all([locationService.detectLocation(), locationService.getCities()]);
    allCities.value = cities;
    console.log(currentCoords)
    if (!currentCoords) {
      console.log('выбор координат вручную');
      currentCity.value = allCities.value[0] as CitySource
    } else {
      currentCity.value = await locationService.getCityByCoords(currentCoords.lat, currentCoords.lon) as CitySource;
    }
    getWeather();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const updateCurrentCity = (newCityName: string) => {
  console.log('asdfasdfsf');
  const cityObject = allCities.value.find((city) => city.name === newCityName);
  if (!cityObject) {
    console.log('Город не найден');
    return;
  }
  currentCity.value = cityObject;
  getWeather();
}

const weekWeather = ref<WeekWeather | null>(null);

const getWeather = async () => {
  if (currentCity.value === null) {
    console.log('asd')
    return;
  }
  try {
    isLoading.value = true;
    const { lat, lon } = currentCity.value.coords;

    weekWeather.value = await weatherService.getWeekWeather(lat, lon);

    // const [forDay, forWeek] = await Promise.all([weatherService.getCurrentWeather(lat, lon), weatherService.getWeekWeather(lat, lon)]);
    // console.log(forDay, forWeek);
    // const data = await weatherService.getCurrentWeather(lat, lon);
    // console.log(data)
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false;
  }
}
const currentWeather = computed(() => {
  if (weekWeather.value === null) {
    return null;
  }
  const today = new Date();
  console.log(today);
  return weekWeather.value.list[0]?.main.temp ? Math.trunc(weekWeather.value.list[0]?.main.temp) : null;
})

onMounted(() => {
  init();
});
</script>

<template>
  <div class="main-layout flex flex-col justify-between">
    <div class="header">
      <MainHeader
        :cities="allCities"
        :city="currentCity"
        @update:current-city="updateCurrentCity"
      />
<!--      Выбор города, единиц измерения-->
    </div>

    <div class="body flex justify-between h-full">
      <div class="w-full p-4 flex justify-center h-full items-center">

        <div class="text-white text-6xl font-bold">
          {{currentWeather}}
        </div>
      </div>
      <div class="w-96 p-4">Доп окно с подробной инфой по дню</div>
    </div>
    <div class="w-full h-36">Лента с погодой на неделю</div>
  </div>
</template>

<style scoped>
.main-layout {
  width: 100%;
  height: 100%;
  background-color: #4fc3f7;
}
</style>
