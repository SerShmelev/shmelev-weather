<script setup lang="ts">
import SelectComponent from '@/components/ui/select/SelectComponent.vue'
import { computed } from 'vue'
import type { CitySource } from '@/types/location.ts'

interface Props {
  city: CitySource | null,
  cities: CitySource[],
}
const props = defineProps<Props>()

const options = computed(() => props.cities.length ? props.cities.map((city) => city.name) : []);

const emit = defineEmits<{(e: 'update:current-city', arg: string): void}>()

const onChange = (cityName: string): void => {
  console.log('qwe', cityName)
  emit('update:current-city', cityName)
}
</script>

<template>
  <div class="w-full flex header">
    <SelectComponent
      v-if="city && city.name"
      label="Город"
      :model-value="city.name"
      :options="options"
      @update:model-value="onChange"
    />
  </div>
</template>

<style scoped>
.header {
  height: 48px;
  background-color: #039be5;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
