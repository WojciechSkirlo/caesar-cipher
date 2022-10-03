<template>
  <div class="flex flex-col group">
    <textarea :id="`textarea-${id}`" :value="modelValue"
      class="w-full min-h-[4.5rem] text-sm order-2 border-b border-gray-500 outline-none read-only:p-2 read-only:bg-gray-200 peer"
      :readonly="readonly" @input="$emit('update:model-value', ($event.target as HTMLInputElement).value)">
    </textarea>
    <label :for="`textarea-${id}`"
      class="order-1 block mb-2 text-xs text-gray-500 first-letter:uppercase peer-focus:text-black">
      <slot>Text</slot>
    </label>
  </div>
</template>
<script setup lang="ts">
defineEmits<{
  (e: 'update:model-value', value: string): void
}>();

defineProps<{
  id: number,
  readonly?: boolean,
  modelValue?: string,
}>();
</script>