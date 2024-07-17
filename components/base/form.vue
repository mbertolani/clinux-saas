<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
})
// const model = ref(props.data)
const emit = defineEmits(['close'])

const onClose = () => {
  if (!getNode('form-kit')) {
    emit('close')
    return
  }
  if (getNode('form-kit').context.state.dirty) {
    useMessage().openDialog({
      description: 'Dados foram modificados ! Deseja salvar ?',
      noClick: () => { useMessage().closeDialog(), emit('close') },
      okClick: () => { useMessage().closeDialog() }
    })
  } else {
    emit('close')
  }
}
// defineShortcuts({
//   escape: {
//     usingInput: true,
//     handler: () => { onClose() }
//   }
// })
</script>

<template>
  <UModal
    prevent-close
    :fullscreen
    :ui="{
      width: 'w-full sm:max-w-xl md:max-w-2xl lg:max-w-6xl'
    }"
  >
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </div>

          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="onClose()"
          />
        </div>
      </template>

      <slot />
      <div v-if="$slots.grade">
        <slot name="grade" />
      </div>
    </UCard>
  </UModal>
</template>
