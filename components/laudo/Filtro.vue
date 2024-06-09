<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useLaudo } from '~/composables/laudo/useLaudo'
// import { getFieldName } from '~/utils/schema'
// const model = defineModel() as any
const emit = defineEmits(['submit'])

// interface FiltroLaudo {
//   nr_controle: number
//   cd_modalidade: number
//   cd_empresa: number
//   cd_medico: number
// }

defineProps({
  filter: {
    type: Object,
    required: false
  }
})
// const { filtro: model } = toRefs(props)
const { getMedico, getEmpresa, getModalidade, getMedicos, getEmpresas, getModalidades, api } = useLaudo()

const data = reactive({
  cd_modalidade: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getModalidade(id)
    },
    options: async () => {
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      // if (!model.value.cd_modalidade) return []
      return await getModalidades()
    }
  },
  cd_empresa: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getEmpresa(id)
    },
    options: async () => {
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      // if (!model.value.cd_modalidade) return []
      return await getEmpresas()
    }
  },
  cd_medico: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getMedico(id)
    },
    options: async () => {
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      const id = getNode('cd_modalidade').value
      return id
        ? await getMedicos(Number(id))
        : await api.find('medico')
    }
  },
  nr_aviso: {
    options: async () => getFieldList(await api.find('aviso'))
  },
  nr_urgente: {
    options: async () => getFieldList(await api.find('urgente'))
  },
  nr_periodo: {
    options: async () => getFieldList(await api.find('periodo'))
  },
  nr_status: {
    options: async () => getFieldList(await api.find('status'))
  },
  nr_fluxo: {
    options: async () => getFieldList(await api.find('fluxo'))
  },
  cd_fila: {
    options: async () => getFieldList(await api.find('fila'))
  },
  nr_edicao: {
    options: async () => getFieldList(await api.find('edicao'))
  }
})

// useFormKitNodeById('cd_modalidade', (node) => {
//   node.on('commit', async (context) => {
//     const items = context.payload ? await getMedicos(context.payload) : []
//     getNode('cd_medico').input(null)
//     getNode('cd_medico').props.options = items
//   })
// })
const outerClass = 'md:col-span-2 !mb-2 lg:!mb-0'
const outerClassTree = 'md:col-span-3 !mb-2 lg:!mb-0'
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'dropdown',
    id: 'nr_periodo',
    name: 'nr_periodo',
    label: 'Período',
    bind: '$nr_periodo',
    outerClass
  },
  {
    $formkit: 'date',
    name: 'dt_de',
    label: 'Data',
    format: 'DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    outerClass
  },
  {
    $formkit: 'date',
    name: 'dt_ate',
    label: 'Até',
    format: 'DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    outerClass
  },
  {
    $formkit: 'number',
    id: 'nr_controle',
    name: 'ae.nr_controle',
    label: 'Protocolo',
    outerClass
  },
  {
    $formkit: 'dropdown',
    id: 'cd_modalidade',
    name: 'sa.cd_modalidade',
    label: 'Modalidade',
    bind: '$cd_modalidade',
    selectionRemovable: true,
    outerClass
  },
  {
    $formkit: 'dropdown',
    id: 'cd_empresa',
    name: 'sa.cd_empresa',
    label: 'Empresa',
    bind: '$cd_empresa',
    if: 'false',
    selectionRemovable: true,
    outerClass
  },
  {
    $formkit: 'dropdown',
    id: 'cd_medico',
    name: 'ae.cd_medico',
    label: 'Médico',
    bind: '$cd_medico',
    selectionRemovable: true,
    outerClass
  },
  {
    $formkit: 'dropdown',
    id: 'nr_aviso',
    name: 'ae.nr_aviso',
    label: 'Aviso',
    bind: '$nr_aviso',
    selectionRemovable: true,
    outerClass
  },
  {
    $formkit: 'dropdown',
    id: 'nr_urgente',
    name: 'ae.nr_urgente',
    label: 'Urgente',
    bind: '$nr_urgente',
    selectionRemovable: true,
    outerClass
  },
  {
    $formkit: 'dropdown',
    id: 'nr_status',
    name: 'ae.nr_status',
    label: 'Status',
    if: 'true',
    bind: '$nr_status',
    selectionRemovable: true,
    outerClass
  },
  {
    $formkit: 'dropdown',
    id: 'nr_edicao',
    name: 'nr_edicao',
    label: 'Laudo',
    bind: '$nr_edicao',
    selectionRemovable: true,
    outerClass: outerClassTree
  },
  {
    $formkit: 'dropdown',
    id: 'cd_fila',
    name: 'cd_fila',
    label: 'Fila',
    bind: '$cd_fila',
    selectionRemovable: true,
    outerClass: outerClassTree
  }
]

// if (props.id === 0) {
//   model.value = {}
// } else {
//   await api.get(props.id, getFieldName(schema))
//   model.value = item.value
// }
// const getFields = () => {
//   console.log('getFields', getNode('apiform').value)
//   return getNode('apiform').value
// }
// useFormKitNodeById('apiForm', (node) => {
//   // node.on('commit', async ({ payload }) => {
//   //   console.log('schema commit', payload)
//   // })
//   node.on('submit', async ({ payload }) => {
//     console.log('onNode', payload)
//     emit('submit', payload)
//   })
// })
</script>

<template>
  <FormKit
    id="apiForm"
    :value="filter"
    type="form"
    :actions="false"
    @submit="emit('submit')"
  >
    <div class="flex justify-left pt-2">
      <div class="grid gap-x-4 grid-cols-1 lg:grid-cols-12 w-full">
        <FormKitSchema
          :schema
          :data
        />
      </div>
    </div>
  </FormKit>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
