<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['close'])
</script>

<template>
  <UModal
    :ui="{
      width: 'sm:max-w-xl md:max-w-2xl lg:max-w-6xl'
    }"
  >
    <UCommandPalette
      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
      @close="emit('close')"
    />
  </UModal>
</template>
