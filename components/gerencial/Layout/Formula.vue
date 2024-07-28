<script setup lang="ts">
import { useLayout } from '~/composables/gerencial/useLayout'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const salvar = async () => {
  const response = await useLayout().setFormula(props.id, schema.value)
  if (response)
    emit('close')
}

const abrir = async () => {
  [texto.value, schema.value] = await Promise.all([
    useLayout().get(props.id, 'ds_editor'),
    useLayout().getFormula(props.id)
  ])
}
const texto = ref(null)
const schema = ref(null)
await abrir()
</script>

<template>
  <UDashboardModal
    :title="texto.ds_editor"
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
        lang="sql"
      />
    </template>
  </UDashboardModal>
</template>
