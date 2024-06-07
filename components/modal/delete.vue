<script lang="ts" setup>
defineProps({
  count: {
    type: Number,
    default: 0
  },
  item: {
    type: String,
    default: null
  }
})
const emit = defineEmits(['success', 'close'])
const loading = ref(false)

function onSuccess() {
  emit('success')
}

defineShortcuts({
  enter: {
    handler: () => { onSuccess() }
  }
})
</script>

<!-- <template>
  <UModal>
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">
          Confirmar exclusão
        </h3>
      </template>
      <template #default>
        <p v-if="count > 1">
          Remover {{ count }} registros selecionados ?
        </p>
        <p v-else>
          Remover o registro selecionado ?
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end ">
          <UButton
            class="-my-1"
            @click="onSuccess"
          >
            Confirmar
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template> -->

<template>
  <UDashboardModal
    title="Confirmar exclusão"
    description="Tem certeza que deseja apagar este registro?"
    icon="i-heroicons-exclamation-circle"
    :ui="{
      // width: 'sm:max-w-xl md:max-w-2xl lg:max-w-4xl',
      icon: { base: 'text-red-500 dark:text-red-400' },
      footer: { base: 'ml-16' }
    }"
  >
    <template #footer>
      <UButton
        color="red"
        label="Apagar"
        :loading="loading"
        @click="onSuccess"
      />
      <UButton
        color="white"
        label="Cancelar"
        @click="emit('close')"
      />
    </template>
  </UDashboardModal>
</template>
