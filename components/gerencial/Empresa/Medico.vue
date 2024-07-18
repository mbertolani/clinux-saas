<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useEmpresaMedico } from '~/composables/gerencial/useEmpresaMedico'
import { useMedico } from '~/composables/gerencial/useMedico'
import { useProcedimentoGrupo } from '~/composables/gerencial/useProcedimentoGrupo'
import { Icones } from '~/types/system'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const title = 'Associação Empresa x Médico'
const controller = useEmpresaMedico(props.id)
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_escalonador'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_medico',
    label: 'Médico',
    bind: '$cd_medico',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_grupo',
    label: 'Grupo',
    bind: '$cd_grupo',
    validation: 'required',
    outerClass: formClass(8)
  },
  {
    $formkit: 'number',
    name: 'nr_percentual',
    label: 'Valor(%)',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'number',
    name: 'nr_exame',
    label: 'Qte',
    validation: 'required',
    outerClass: formClass(2)
  }
]
const data = reactive({
  cd_medico: {
    optionLoader: async (id) => {
      if (!id) return []
      return getFieldItem(await useMedico().get(id, 'cd_medico,ds_medico'))
    },
    options: async () => {
      return getFieldList(await useMedico().getAll(), 'cd_medico', 'ds_medico')
    }
  },
  cd_grupo: {
    optionLoader: async (id) => {
      if (!id) return []
      return getFieldItem(await useProcedimentoGrupo().get(id, 'cd_grupo,ds_grupo'))
    },
    options: async () => {
      return getFieldList(await useProcedimentoGrupo().getAll(), 'cd_grupo', 'ds_grupo')
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
    :icon="Icones.medico"
    :controller
  />
</template>
