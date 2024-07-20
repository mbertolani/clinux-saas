<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { usePlano } from '~/composables/faturamento/usePlano'
import { useConvenio } from '~/composables/faturamento/useConvenio'

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
    name: 'cd_plano'
  },
  {
    $formkit: 'text',
    name: 'ds_plano',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_fornecedor',
    label: 'Convênio',
    options: await useConvenio().getItemList(),
    validation: 'required',
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
      :controller="usePlano()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
