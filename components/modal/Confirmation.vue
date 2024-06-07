<script setup lang="ts">
const system = useSystemStore()
const { closeDialog } = system
const { propsDialog } = storeToRefs(system)
const emit = defineEmits(['yes', 'no'])
const loading = ref(false)
const okClick = () => {
  propsDialog.value.okClick()
  closeDialog()
  emit('yes')
}
const noClick = () => {
  propsDialog.value.noClick()
  emit('no')
}
defineShortcuts({
  enter: {
    handler: () => { emit('yes') }
  }
})
</script>

<template>
  <UDashboardModal
    v-if="propsDialog.okClick"
    v-model="propsDialog.visible"
    prevent-close
    :title="propsDialog.title"
    :description="propsDialog.description"
    icon="i-heroicons-exclamation-circle"
  >
    <template #footer>
      <UButton
        color="red"
        :label="propsDialog.okButton"
        :loading="loading"
        @click="okClick()"
      />
      <UButton
        color="white"
        :label="propsDialog.noButton"
        @click="noClick()"
      />
    </template>
  </UDashboardModal>
</template>
