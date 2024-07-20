<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useUnidade } from '~/composables/estoque/useUnidade'

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
    name: 'cd_unidade'
  },
  {
    $formkit: 'text',
    name: 'ds_unidade',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'number',
    name: 'nr_multiplo',
    label: 'Fator',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_multiplo',
    label: 'Unidade Múltipla',
    options: await useUnidade().findMinimo(),
    selectionRemovable: true,
    outerClass: formClass(10)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_tiss',
    label: 'Unidade Tiss',
    selectionRemovable: true,
    options: await useUnidade().findTiss(),
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
      :controller="useUnidade()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
