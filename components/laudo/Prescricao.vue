<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { usePrescricao } from '~/composables/laudo/usePrescricao'
import { getFieldName } from '~/utils/schema'

const emit = defineEmits(['submit', 'close', 'documento'])
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const { get, update, create, usePrescricaoMaterial, getMaterial, getUnidade, getMateriais, getUnidades, getPaciente, getPacientes, getExames, findExame } = usePrescricao(props.id)
const { get: _get, update: _update, create: _create, getAll: _getAll, remove: _remove } = usePrescricaoMaterial
const { moduleId } = useRouterStore()

// const optionsMaterial = await getMateriais()
// const optionsUnidade = await getUnidades(0)
// useFormKitNodeById('cd_material', (node) => {
//   node.on('commit', async (context) => {
//     console.log('commit', context)
//     const items = context.payload ? await getUnidades(context.payload) : []
//     console.log(items)
//     console.log(getNode('cd_unidade'))
//     getNode('cd_unidade').input(null)
//     getNode('cd_unidade').props.options = items
//   })
// })
const data = reactive({
  cd_paciente: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getPaciente(id)
    },
    options: async ({ search }) => {
      if (!search) return []
      return await getPacientes(search, getNode('dt_prescricao').value as string)
    }
  },
  cd_unidade: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getUnidade(id)
    },
    options: async (payload) => {
      if (!payload.node.parent.value.cd_material)
        return []
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      // if (!model.value.material.cd_material) return []
      return await getUnidades(payload.node.parent.value.cd_material)
    }
  },
  cd_material: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getMaterial(id)
    },
    options: async () => {
      return await getMateriais()
    }
  },
  cd_exame: {
    options: async () => {
      return await listaExames()
    }
  },
  ds_exame: (node) => {
    return setExame(node)
  }
})
const setExame = (node) => {
  node.on('commit', async () => {
    getNode('cd_exame').input(null)
    getNode('cd_exame').props.options = await listaExames()
  })
}
const listaExames = async () => {
  if (!getNode('cd_paciente').value || !getNode('dt_prescricao').value) return []
  return await getExames(Number(getNode('cd_paciente').value), String(getNode('dt_prescricao').value))
}
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_prescricao'
  },
  {
    $formkit: 'datepicker',
    id: 'dt_prescricao',
    name: 'dt_prescricao',
    label: 'Data',
    validation: 'required',
    format: 'DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    onNode: '$ds_exame',
    outerClass: formClass(4)
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_paciente',
    id: 'cd_paciente',
    label: 'Paciente',
    bind: '$cd_paciente',
    validation: 'required',
    debounce: 500,
    onNode: '$ds_exame',
    outerClass: formClass(8)
  },
  {
    $formkit: 'dropdown',
    id: 'cd_exame',
    name: 'cd_exame',
    bind: '$cd_exame',
    validation: 'required',
    multiple: true,
    label: 'Exame',
    outerClass: formClass(12)
  },
  {
    $formkit: 'textarea',
    name: 'bb_observacao',
    label: 'Observação',
    outerClass: formClass(12)
  }
]
const schemaFilho: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_prescricao'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_material',
    label: 'Material',
    bind: '$cd_material',
    validation: 'required',
    outerClass: formClass(6)
  },
  {
    $formkit: 'number',
    name: 'nr_quantidade',
    label: 'Quantidade',
    if: moduleId === 'clinux' ? '1' : '0',
    // number
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    if: moduleId === 'clinux' ? '1' : '0',
    name: 'cd_unidade',
    bind: '$cd_unidade',
    label: 'Unidade',
    validation: 'required',
    outerClass: formClass(4)
  }
]
const schemaRepeater: FormKitSchemaDefinition = [
  {
    $formkit: 'repeater',
    name: 'material',
    contentClass: formClass(),
    outerClass: formClass(12),
    children: schemaFilho
  }
]

const model = ref({})
const itensMaterial = await _getAll()
if (props.id === 0) {
  model.value = { prescricao: { dt_prescricao: useDateFormat(useNow(), 'YYYY-MM-DD').value } }
} else {
  const prescricao = await get(props.id, getFieldName(schema))
  prescricao.bb_observacao = Decode64(prescricao.bb_observacao)
  prescricao.cd_exame = prescricao.cd_exame?.split(',').map((item: string) => parseInt(item))
  model.value = {
    prescricao,
    material: itensMaterial
  }
}
const onSubmit = async (_data: any) => {
  _data.prescricao.bb_observacao = Encode64(_data.prescricao.bb_observacao)
  _data.prescricao.cd_exame = _data.prescricao.cd_exame.join(',')
  let response = null
  if (props.id === 0) {
    response = await create(_data.prescricao)
    _data.material.forEach(async (item: any) => {
      item.cd_prescricao = response.cd_prescricao
      await _create(item)
    })
  } else {
    response = await update(props.id, _data.prescricao)
    _data.material.forEach(async (item: any) => {
      if (item.cd_codigo) {
        await _update(item.cd_codigo, item)
      } else {
        item.cd_prescricao = props.id
        await _create(item)
      }
    })
    // verifica excluidos
    const remove = itensMaterial.filter((item1) => {
      return !_data.material.some(item2 => item2.cd_codigo === (item1 as any).cd_codigo)
    })
    remove.forEach(async (item: any) => {
      await _remove(item.cd_codigo)
    })
  }
  // comparar o array items com _data.material pela chave cd_codigo e apagar do banco
  if (response) {
    emit('submit', props.id, response)
  }
}
// const columnDefs = ref()
// const rowData = ref()
// await apiMaterial.getAll()
// rowData.value = itemsMaterial.value
// columnDefs.value = [
//   { field: 'ds_material', headerName: 'Material', width: useGrid().dataTypeWidth('ftString', 64) },
//   { field: 'nr_quantidade', headerName: 'Qte', width: useGrid().dataTypeWidth('ftInteger') },
//   { field: 'ds_unidade', headerName: 'Unidade', width: useGrid().dataTypeWidth('ftString', 32) }
// ]

// useFormKitNodeById('form-repeat', (node) => {
//   console.log(node.value)
//   node.on('childRemoved', async (context) => {
//     console.log('childRemoved', context)
//     console.log(context.payload)
//     if (context.payload.cd_prescricao) {
//       await apiMaterial.remove(context.payload.cd_prescricao)
//     }
//   })
//   node.on('commit', async (context) => {
//     console.log('commit', context)
//   })
// })
const onDocumentos = async () => {
  const response = await findExame(Number(getNode('cd_paciente').value), String(getNode('dt_prescricao').value))
  if (response.length)
    emit('documento', response[0].cd_atendimento)
  else
    useMessage().showMessage('Atendimento não selecionado !')
}
</script>

<template>
  <BaseForm
    title="Prescrição"
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema="schemaRepeater"
      :value="model"
      :data
      @submit="onSubmit"
    >
      <FormKit
        type="group"
        name="prescricao"
      >
        <FormKitSchema
          :schema="schema"
          :data
        />
        <FormKit
          type="button"
          label="Documentos"
          @click="onDocumentos"
        />
      </FormKit>
    </BaseFormLayout>
    <!-- <template #default>
      <FormKit
        v-slot="{ state: { dirty } }"
        :value="model"
        dirty-behavior="compare"
        type="form"
        :actions="false"
        @submit="onSubmit"
      >
        <div class="flex items-center justify-center">
          <div class="container max-w-screen-lg mx-auto">
            <div class="grid gap-x-4 grid-cols-1 md:grid-cols-12">
              <FormKit
                type="group"
                name="prescricao"
              >
                <FormKitSchema
                  :schema="schema"
                  :data
                />
              </FormKit>
              <FormKitSchema
                :schema="schemaRepeater"
                :data
              />
              <FormKit
                type="submit"
                label="Salvar"
                :disabled="!dirty"
              />
            </div>
          </div>
        </div>
      </FormKit>
    </template> -->
  </BaseForm>
</template>
