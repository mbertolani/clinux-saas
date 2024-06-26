<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useModalidade } from '~/composables/gerencial/useModalidade'

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
    name: 'cd_modalidade'
  },
  {
    $formkit: 'text',
    name: 'ds_modalidade',
    label: 'Nome',
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
      :controller="useModalidade()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
