<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFormulario } from '~/composables/gerencial/useFormulario'

const emit = defineEmits(['submit', 'close'])
const moduloOptions = await useFormulario().findModulo()
const masterOptions = await useFormulario().findMaster()
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
    name: 'ds_caption',
    label: 'Descrição',
    inputClass: '!normal-case',
    outerClass: formClass(12)
  },
  {
    $formkit: 'text',
    name: 'ds_form',
    label: 'Classe',
    outerClass: formClass(6)
  },
  {
    $formkit: 'text',
    name: 'ds_atual',
    label: 'Cadastro',
    outerClass: formClass(6)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_modulo',
    label: 'Módulo',
    options: moduloOptions,
    outerClass: formClass(6)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_pai',
    label: 'Janela',
    options: masterOptions,
    outerClass: formClass(4)
  },
  {
    $formkit: 'number',
    name: 'nr_menu',
    label: 'Ordem',
    outerClass: formClass(2)
  }
]
const data = ref({})
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
      :data
      :controller="useFormulario()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
