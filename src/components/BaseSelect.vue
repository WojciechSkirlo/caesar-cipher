<template>
  <div class="flex flex-col" v-click-outside="hideOptions">
    <label :for="`base-select-${id}`" class="mb-1 text-xs text-gray-500 first-letter:uppercase">
      <slot />
    </label>
    <div class="relative">
      <button type="button" :id="`base-select-${id}`"
        class="w-full cursor-default px-4 items-center py-1.5 text-sm bg-gray-50 border border-black rounded-md flex justify-between gap-x-2"
        @click="isOpen = !isOpen">
        <span class="font-semibold">{{ modelValue.name }}</span>
        <div class="p-1 -m-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 ">
            <path fill-rule="evenodd"
              d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </button>
      <ul v-show="isOpen"
        class="absolute right-0 w-full overflow-y-auto translate-y-2 border border-black rounded-md max-h-36 lg:max-h-40 bg-gray-50 top-full"
        role="list">
        <li v-for="item in options" :key="item.id"
          :class="item.value === modelValue.value && 'font-semibold bg-gray-200'"
          class="px-3 py-1.5 text-sm transition-colors cursor-pointer duration-300 rounded-md hover:bg-gray-200"
          @click="isOpen = false; $emit('update:modelValue', item)">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

interface Options {
  id: number,
  value: number | string | boolean,
  name: string,
}

defineEmits<{
  (e: 'update:modelValue', value: Options): void
}>();

defineProps<{
  modelValue: Options,
  id: number,
  options: Options[]
}>()

const isOpen = ref(false);

const hideOptions = () => {
  isOpen.value = false;
}
</script>