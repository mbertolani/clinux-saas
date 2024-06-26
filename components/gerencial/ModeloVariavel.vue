<script setup lang="ts">
import DashboardModal from '@nuxt/ui-pro/components/dashboard/DashboardModal.vue'
import { useModelo } from '~/composables/gerencial/useModelo'

const emit = defineEmits(['submit', 'close'])

// const modelValue = defineModel({ type: String, required: true })
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const salvar = async () => {
  const response = await useModelo().setFormula(props.id, schema.value)
  if (response)
    emit('close')
}

const [modelo, schema] = await Promise.all([
  useModelo().get(props.id, 'ds_modelo'),
  useModelo().getFormula(props.id)
])
</script>

<template>
  <DashboardModal
    :title="modelo.ds_modelo"
    :fullscreen="true"
  >
    <template #footer>
      <UButton
        color="primary"
        label="Salvar"
        @click="salvar"
      />
      <UButton
        color="gray"
        label="Cancelar"
        @click="emit('close')"
      />
    </template>
    <template #default>
      <BaseMonacoEditor
        v-model="schema"
      />
    </template>
  </DashboardModal>
</template>
