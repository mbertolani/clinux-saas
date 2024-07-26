<script setup lang="ts">
import { useTexto } from '~/composables/laudo/useTexto'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const salvar = async () => {
  const response = await useTexto().setFormula(props.id, schema.value)
  if (response)
    emit('close')
}

const abrir = async () => {
  [texto.value, schema.value] = await Promise.all([
    useTexto().get(props.id, 'ds_chave'),
    useTexto().getFormula(props.id)
  ])
}
const texto = ref(null)
const schema = ref(null)
await abrir()
</script>

<template>
  <UDashboardModal
    :title="texto.ds_chave"
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
