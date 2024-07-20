<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useMaterial } from '~/composables/estoque/useMaterial'
import { useMaterialGrupo } from '~/composables/estoque/useMaterialGrupo'
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
    name: 'cd_material'
  },
  {
    $formkit: 'text',
    name: 'ds_material',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(10)
  },
  {
    $formkit: 'text',
    name: 'ds_codigo',
    label: 'Código',
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_grupo',
    label: 'Grupo',
    validation: 'required',
    options: await useMaterialGrupo().getItemList(),
    outerClass: formClass(12)
  },
  {
    id: 'cd_unidade',
    $formkit: 'dropdown',
    name: 'cd_unidade',
    label: 'Unidade',
    validation: 'required',
    options: await useUnidade().findMinimo(),
    outerClass: formClass(6)
  },
  {
    id: 'cd_report',
    $formkit: 'dropdown',
    name: 'cd_report',
    options: async () => await useUnidade().findApresentacao(getNode('cd_unidade').value as number),
    label: 'Unidade de Apresentação',
    selectionRemovable: true,
    outerClass: formClass(6)
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
    outerClass: formClass(12)
  }
]
const onSubmit = async (...args) => {
  emit('submit', ...args)
}
useFormKitNodeById('cd_unidade', (node) => {
  node.on('commit', async (context) => {
    const items = context.payload ? await useUnidade().findApresentacao(context.payload) : []
    getNode('cd_report').input(null)
    getNode('cd_report').props.options = items
  })
})
</script>

<template>
  <BaseForm
    :title
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema
      :controller="useMaterial()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
