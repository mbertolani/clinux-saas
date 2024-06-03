<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
// const model = ref(props.data)
const emit = defineEmits(['success', 'close'])

function onClose() {
  emit('close')
}

// async function submitHandler(_data: any) {
//   emit('success', model.value)
// }

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => { onClose() }
  }
})
</script>

<template>
  <UModal
    prevent-close
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
    </UCard>
  </UModal>
</template>
