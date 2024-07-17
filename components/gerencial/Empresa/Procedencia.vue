<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useEmpresaProcedencia } from '~/composables/gerencial/useEmpresaProcedencia'
import { useProcedencia } from '~/composables/atendimento/useProcedencia'
import { Icones } from '~/types/system'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const title = 'Associação Empresa x Procedência'
const controller = useEmpresaProcedencia(props.id)
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_codigo'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_procedencia',
    label: 'Procedência',
    bind: '$cd_procedencia',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'text',
    name: 'ds_codigo',
    label: 'Código',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'text',
    name: 'ds_descricao',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(10)
  }
]
const { get, getAll } = useProcedencia()
const data = reactive({
  cd_procedencia: {
    optionLoader: async (id) => {
      if (!id) return []
      return getFieldItem(await get(id, 'cd_procedencia,ds_procedencia'))
    },
    options: async () => {
      console.log('options')
      return getFieldList(await getAll(), 'cd_procedencia', 'ds_procedencia')
    }

  }
})
</script>

<template>
  <ModalPage
    :id
    :title
    :schema
    :data
    :icon="Icones.procedencia"
    :controller
  />
</template>
