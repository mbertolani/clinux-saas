<script setup lang="ts">
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
const abrir = async () => {
  [modelo.value, schema.value] = await Promise.all([
    useModelo().get(props.id, 'ds_modelo'),
    useModelo().getFormula(props.id)
  ])
}
const modelo = ref(null)
const schema = ref(null)
await abrir()
</script>

<template>
  <UDashboardModal
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
  </UDashboardModal>
</template>
