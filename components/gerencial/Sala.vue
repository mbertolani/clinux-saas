<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useSala } from '~/composables/gerencial/useSala'

const emit = defineEmits(['submit', 'close'])

defineProps({
  id: {
    type: Number,
    required: true
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_sala'
  },
  {
    $formkit: 'text',
    name: 'ds_sala',
    label: 'Nome',
    validation: 'required',
    outerClass: 'md:col-span-12'
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
    outerClass: 'md:col-span-12 md:items-end inline-flex items-center'
  }
]
const onSubmit = async (_id: number, _data: any) => {
  emit('submit', _id, _data)
}
</script>

<template>
  <BaseForm
    title="Cadastro de Salas"
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema
      :controller="useSala()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
