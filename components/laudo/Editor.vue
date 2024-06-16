<script setup lang="ts">
import { ModalFullScreen } from '#components'

defineProps({
  id: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['close', 'loadEditor'])
</script>

<template>
  <ModalFullScreen
    title="Editor de Laudo"
    :fullscreen="true"
    @close="emit('close')"
  />
</template>
