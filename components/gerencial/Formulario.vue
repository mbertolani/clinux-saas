<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFormulario } from '~/composables/gerencial/useFormulario'

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
    name: 'cd_form'
  },
  {
    $formkit: 'text',
    name: 'ds_form',
    label: 'Descrição',
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
      :controller="useFormulario()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
