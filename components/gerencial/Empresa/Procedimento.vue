<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useEmpresaProcedimento } from '~/composables/gerencial/useEmpresaProcedimento'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import { Icones } from '~/types/system'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const title = 'Associação Empresa x Procedimento'
const controller = useEmpresaProcedimento(props.id)
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_depara'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_procedimento',
    label: 'Procedimento',
    bind: '$cd_procedimento',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'text',
    name: 'ds_codigo_externo',
    label: 'Código',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'text',
    name: 'ds_procedimento_externo',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(10)
  }
]
const { get, getAll } = useProcedimento()
const data = reactive({
  cd_procedimento: {
    optionLoader: async (id, cachedOption) => {
      // if (cachedOption) return cachedOption
      console.log('optionLoader', id, cachedOption)
      if (!id) return []
      return getFieldItem(await get(id, 'cd_procedimento,ds_procedimento'))
    },
    options: async () => {
      console.log('options')
      return getFieldList(await getAll(), 'cd_procedimento', 'ds_procedimento')
    }

  }
})
</script>

<template>
  <ModalPage
    :title
    :schema
    :data
    :icon="Icones.procedimento"
    :controller
  />
</template>
