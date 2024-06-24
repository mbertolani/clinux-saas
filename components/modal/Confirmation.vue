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
    v-model="isOpen"
    prevent-close
    :title="config?.title"
    :description="config?.description"
    icon="i-heroicons-exclamation-circle"
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
