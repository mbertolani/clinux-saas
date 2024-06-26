<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useHorario } from '~/composables/gerencial/useHorario'

const emit = defineEmits(['submit', 'close'])

defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_horario'
  },
  {
    $formkit: 'time',
    name: 'dt_inicio',
    label: 'Início',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'time',
    name: 'dt_fim',
    label: 'Fim',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'text',
    name: 'ds_observacao',
    label: 'Observação',
    outerClass: formClass(12)
  }
]
const onSubmit = async (...args) => {
  emit('submit', ...args)
}
</script>

<template>
  <BaseForm
    :title
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema
      :controller="useHorario()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
