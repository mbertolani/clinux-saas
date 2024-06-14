<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useSala } from '~/composables/gerencial/useSala'

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
      :controller="useSala()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
