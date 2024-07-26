<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useLaudo } from '~/composables/laudo/useLaudo'

const model = defineModel({ type: Object })
// defineProps({
//   filter: {
//     type: Object,
//     required: false
//   }
// })
const emit = defineEmits(['submit', 'historico'])

const { getMedico, getEmpresa, getModalidade, getEmpresas, getModalidades, getMedicos, find } = useLaudo()

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
      // const id = getNode('cd_modalidade').value
      // return id
      //   ? await getMedicos(Number(id))
      //   : await find('medico')
      return await getMedicos()
    }
  },
  nr_aviso: {
    options: async () => getFieldList(await find('aviso'))
  },
  nr_urgente: {
    options: async () => getFieldList(await find('urgente'))
  },
  nr_periodo: {
    options: async () => getFieldList(await find('periodo'))
  },
  nr_status: {
    options: async () => getFieldList(await find('status'))
  },
  nr_fluxo: {
    options: async () => getFieldList(await find('fluxo'))
  },
  cd_fila: {
    options: async () => getFieldList(await find('trabalho'))
  },
  nr_edicao: {
    options: async () => getFieldList(await find('edicao'))
  }
})

// useFormKitNodeById('cd_modalidade', (node) => {
//   node.on('commit', async (context) => {
//     const items = context.payload ? await getMedicos(context.payload) : []
//     getNode('cd_medico').input(null)
//     getNode('cd_medico').props.options = items
//   })
// })
// const outerClass: formClass(2) = 'md:col-span-2'
// const outerClassTree = 'md:col-span-3'
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'dropdown',
    id: 'nr_periodo',
    name: 'nr_periodo',
    placeholder: 'Período',
    bind: '$nr_periodo',
    outerClass: formClass(2)
  },
  {
    $formkit: 'date',
    name: 'dt_de',
    placeholder: 'Data',
    format: 'DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    outerClass: formClass(2)
  },
  {
    $formkit: 'date',
    name: 'dt_ate',
    placeholder: 'Até',
    format: 'DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    outerClass: formClass(2)
  },
  {
    $formkit: 'number',
    id: 'nr_controle',
    name: 'ae.nr_controle',
    placeholder: 'Protocolo',
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    id: 'cd_modalidade',
    name: 'sa.cd_modalidade',
    placeholder: 'Modalidade',
    bind: '$cd_modalidade',
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    id: 'cd_empresa',
    name: 'sa.cd_empresa',
    placeholder: 'Empresa',
    bind: '$cd_empresa',
    if: 'false',
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    id: 'cd_medico',
    name: 'ae.cd_medico',
    placeholder: 'Médico',
    bind: '$cd_medico',
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    id: 'nr_aviso',
    name: 'ae.nr_aviso',
    placeholder: 'Aviso',
    bind: '$nr_aviso',
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    id: 'nr_urgente',
    name: 'ae.nr_urgente',
    placeholder: 'Urgente',
    bind: '$nr_urgente',
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    id: 'nr_status',
    name: 'nr_status',
    placeholder: 'Status',
    if: 'true',
    bind: '$nr_status',
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    id: 'nr_edicao',
    name: 'nr_edicao',
    placeholder: 'Laudo',
    bind: '$nr_edicao',
    selectionRemovable: true,
    outerClass: formClass(3)
  },
  {
    $formkit: 'dropdown',
    id: 'cd_fila',
    name: 'cd_fila',
    placeholder: 'Fila',
    bind: '$cd_fila',
    selectionRemovable: true,
    outerClass: formClass(3)
  }
]

// if (props.id === 0) {
//   model.value = {}
// } else {
//   await get(props.id, getFieldName(schema))
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
    v-model="model"
    type="form"
    :actions="false"
    @submit="emit('submit')"
  >
    <BaseLayout>
      <FormKitSchema
        :schema
        :data
      />
      <UButton
        v-if="model.cd_paciente"
        class="col-span-12"
        color="primary"
        icon="i-mdi-trash-can"
        block
        @click="emit('historico')"
      >
        Desativar Histórico
      </UButton>
    </BaseLayout>
  </FormKit>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
