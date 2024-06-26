<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useUsuario } from '~/composables/gerencial/useUsuario'

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
    name: 'cd_usuario'
  },
  {
    $formkit: 'text',
    name: 'ds_usuario',
    label: 'Nome',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'toggle',
    name: 'sn_login',
    label: 'Bloquear acesso concorrente ?',
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
      :controller="useUsuario()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
