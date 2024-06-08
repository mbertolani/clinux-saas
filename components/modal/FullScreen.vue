<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close'])
</script>

<template>
  <UModal
    :fullscreen
    :ui="{
      width: 'w-full sm:max-w-xl md:max-w-2xl lg:max-w-6xl'
    }"
  >
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow'
        }
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="emit('close')"
          />
        </div>
      </template>
      <slot />
    </UCard>
  </UModal>
</template>
