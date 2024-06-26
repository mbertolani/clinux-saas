<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useLayout } from '~/composables/gerencial/useLayout'

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
    name: 'cd_editor'
  },
  {
    $formkit: 'text',
    name: 'ds_editor',
    label: 'Descrição',
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
      :controller="useLayout()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
