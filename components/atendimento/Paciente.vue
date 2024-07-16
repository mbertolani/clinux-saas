<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { usePaciente } from '~/composables/atendimento/usePaciente'

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
    name: 'cd_paciente'
  },
  {
    $formkit: 'text',
    name: 'ds_paciente',
    label: 'Nome',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'mask',
    name: 'ds_cpf',
    id: 'ds_cpf',
    mask: '###.###.###-##',
    label: 'CPF',
    unmaskValue: true,
    outerClass: formClass(3)
  },
  {
    $formkit: 'text',
    name: 'ds_vip',
    label: 'Vip',
    outerClass: formClass(12)
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
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
      :controller="usePaciente()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
