<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useMedico } from '~/composables/gerencial/useMedico'

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
    name: 'cd_medico'
  },
  {
    $formkit: 'text',
    name: 'ds_medico',
    label: 'Nome',
    validation: 'required',
    outerClass: formClass(8)
  },
  {
    $formkit: 'text',
    name: 'ds_guerra',
    label: 'Apelido',
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'mask',
    name: 'ds_cpf',
    id: 'ds_cpf',
    mask: '###.###.###-##',
    label: 'CPF',
    unmaskValue: true,
    outerClass: formClass(3)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_usuario',
    label: 'Usuário',
    validation: 'required',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/gerencial/usuario').getList()),
    outerClass: formClass(9)
  },
  {
    $formkit: 'text',
    name: 'ds_conselho',
    label: 'Conselho',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'text',
    name: 'ds_crm_nr',
    label: 'Nº Conselho',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'text',
    name: 'ds_crm_uf',
    label: 'UF',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'text',
    name: 'ds_rqe',
    label: 'Rqe',
    outerClass: formClass(3)
  },
  {
    $formkit: 'text',
    name: 'ds_cnes',
    label: 'Cnes',
    outerClass: formClass(3)
  },
  {
    $formkit: 'text',
    name: 'ds_leo_token',
    label: 'Token LEO',
    outerClass: formClass(4),
    inputClass: '!lowercase'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_fila',
    label: 'Fila de Trabalho',
    selectionRemovable: true,
    options: [{ label: 'FILA', value: 1 }], // getFieldList(await useBaseStore('/financeiro/centro').getList()),
    outerClass: formClass(8)
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
    outerClass: formClass(12) // 'md:col-span-12 md:items-end inline-flex items-center'
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
      :controller="useMedico()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
