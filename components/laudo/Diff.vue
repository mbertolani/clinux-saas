<script setup lang="ts">
import { ModalFullScreen } from '#components'

defineProps({
  src: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['close'])
</script>

<template>
  <ModalFullScreen
    title="Alterações do Laudo"
    :fullscreen="true"
    @close="emit('close')"
  >
    <div class="h-full">
      <iframe
        :src
        frameborder="0"
        style="height: 100%; width: 100%"
        allowfullscreen
      />
    </div>
  </ModalFullScreen>
</template>
