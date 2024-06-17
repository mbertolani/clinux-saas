<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFuncionario } from '~/composables/gerencial/useFuncionario'

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
    name: 'cd_funcionario'
  },
  {
    $formkit: 'text',
    name: 'ds_funcionario',
    label: 'Nome',
    validation: 'required',
    outerClass: formClass(8)
  },
  {
    $formkit: 'text',
    name: 'ds_apelido',
    label: 'Apelido',
    outerClass: formClass(4)
  },
  {
    $formkit: 'mask',
    name: 'ds_cpf',
    id: 'ds_cpf',
    mask: '###.###.###-##',
    label: 'Cpf',
    unmaskValue: true,
    outerClass: formClass(3)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_usuario',
    label: 'Usuário',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/gerencial/usuario').getList()),
    outerClass: formClass(9)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_centro',
    label: 'Centro de Custo',
    validation: 'required',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/financeiro/centro').getList()),
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
      :controller="useFuncionario()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
