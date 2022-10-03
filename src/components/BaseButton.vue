<template>
  <button :type="type || 'button'"
    class="bg-black text-white px-5 py-1.5 rounded-md text-sm hover:bg-gray-100 border-transparent border hover:border-black hover:text-black transition-colors duration-300 first-letter:uppercase"
    @click="$emit('btn-click')">
    <slot />
  </button>
</template>
<script setup lang="ts">
defineEmits<{
  (e: 'btn-click'): void
}>();

type typeButton = 'submit' | 'button' | 'reset';
defineProps<{
  type?: typeButton,
}>();
</script>