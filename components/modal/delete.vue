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
const emit = defineEmits(['success'])

function onSuccess() {
  emit('success')
}

defineShortcuts({
  enter: {
    handler: () => { onSuccess() }
  }
})
</script>

<template>
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
</template>
