<script setup lang="ts">
const { config, isOpen, closeDialog } = useMessage()

const emit = defineEmits(['yes', 'no', 'close'])
const loading = ref(false)

const okClick = () => {
  config.value?.okClick()
  closeDialog()
  emit('yes')
}
const noClick = () => {
  // config.value.noClick()
  closeDialog()
  emit('no')
}
// defineShortcuts({
//   enter: {
//     handler: () => { okClick() }
//   },
//   escape: {
//     handler: () => { noClick() }
//   }
// })

// Fecha modal apos F5
// closeDialog()
</script>

<template>
  <UDashboardModal
    :model-value="isOpen"
    prevent-close
    :title="config?.title"
    :description="config?.description"
    icon="i-heroicons-exclamation-circle"
    :ui="{
      // width: 'sm:max-w-xl md:max-w-2xl lg:max-w-4xl',
      // icon: { base: 'text-red-500 dark:text-red-400' },
      footer: { base: 'ml-16' }
    }"
  >
    <template #footer>
      <UButton
        :label="config?.okButton"
        :loading="loading"
        @click="okClick()"
      />
      <UButton
        color="white"
        :label="config?.noButton"
        @click="noClick()"
      />
    </template>
  </UDashboardModal>
</template>
