<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useMaterialGrupo } from '~/composables/estoque/useMaterialGrupo'

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
    name: 'cd_grupo'
  },
  {
    $formkit: 'text',
    name: 'ds_grupo',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_grupo_pai',
    label: 'Classe',
    selectionRemovable: true,
    options: await useMaterialGrupo().getItemList(),
    outerClass: formClass(6)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_conta',
    label: 'Conta',
    selectionRemovable: true,
    options: await useMaterialGrupo().findConta(),
    outerClass: formClass(6)
  },
  {
    $formkit: 'toggle',
    name: 'sn_exame',
    label: 'Exame ?',
    outerClass: formClass(12)
  },
  {
    $formkit: 'toggle',
    name: 'sn_fluxo',
    label: 'Alto custo ?',
    outerClass: formClass(12)
  },
  {
    $formkit: 'toggle',
    name: 'sn_contraste',
    label: 'Contraste ?',
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
      :controller="useMaterialGrupo()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
