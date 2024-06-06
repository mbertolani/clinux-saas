<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Aviso'
  },
  description: {
    type: String,
    default: 'Deseja confirmar ?'
  },
  ok: {
    type: String,
    default: 'Sim'
  },
  cancel: {
    type: String,
    default: 'Não'
  }
})
const emit = defineEmits(['yes', 'no'])
const loading = ref(false)

defineShortcuts({
  enter: {
    handler: () => { emit('yes') }
  }
})
</script>

<template>
  <UDashboardModal
    :title
    :description
    icon="i-heroicons-question-mark-circle"
    :ui="{
      width: 'sm:max-w-xl md:max-w-2xl lg:max-w-4xl',
      icon: { base: 'text-red-500 dark:text-red-400' } as any,
      footer: { base: 'ml-16' } as any
    }"
  >
    <template #footer>
      <UButton
        color="red"
        :label="ok"
        :loading="loading"
        @click="emit('yes')"
      />
      <UButton
        color="white"
        :label="cancel"
        @click="emit('no')"
      />
    </template>
  </UDashboardModal>
</template>
