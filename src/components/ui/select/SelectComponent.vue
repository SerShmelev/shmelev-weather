<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
  label: string
  options: string[]
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

function updateValue(value: unknown) {
  emit('update:modelValue', value)
}
const hasValue = computed(() => {
  return props.modelValue
})
</script>

<template>
  <div :class="['base-select', { 'has-value': hasValue }]">
    <label class="select-label" for="city-select">
      {{ label }}
    </label>
    <select
      id="city-select"
      class="base-select__field"
      :value="modelValue"
      @change="updateValue($event.target!.value)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
        class="p-2 option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>
<style scoped>
.base-select {
  position: relative;
  display: flex;
  align-items: center;
}
.base-select__field {
  height: 48px;
  padding: 18px 12px 8px 12px;
  border: 1px solid #0277bd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  //background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='%239ca3af' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px 16px;
  color: white;
}

.base-select .select-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  padding: 0 6px;
  transition: all 0.18s cubic-bezier(0.2, 0.9, 0.3, 1);
  color: #6b7280;
  font-size: 15px;
  pointer-events: none;
}

.base-select.has-value .select-label {
  top: 2px;
  left: 7px;
  transform: translateY(0);
  font-size: 12px;
  color: white;
  //background: white;
  border-radius: 8px;
}

.base-select__field::placeholder {
  color: white; /* цвет placeholder'а */
}

.base-select__field:invalid {
  color: #8496ad; /* цвет placeholder'а */
}

.option {
  padding: 2px 4px;
  height: 20px;
  color: #181818;
}

.option:last-child {
  border-bottom-left-radius: 15px;

  border-bottom-right-radius: 15px;
}
.icon-clear {
  position: absolute;
  right: 30px;
  cursor: pointer;
  color: #8496ad;
  transition: color 0.2s;
}

.icon-clear:hover {
  color: #4c64ff;
}
</style>

