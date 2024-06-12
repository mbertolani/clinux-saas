<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { number } from '@formkit/icons'
import { FormKitSchema } from '@formkit/vue'
import { usePrescricao } from '~/composables/laudo/usePrescricao'
import { getFieldName } from '~/utils/schema'

const emit = defineEmits(['submit', 'close'])
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const { api, item, usePrescricaoMaterial, getMaterial, getUnidade, getMateriais, getUnidades, getPaciente, getPacientes } = usePrescricao(props.id)
const { api: apiMaterial, items: itemsMaterial } = usePrescricaoMaterial

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
      return await getPaciente(id)
    },
    options: async ({ search }) => {
      if (!search) return []
      return await getPacientes(search)
    }
  },
  cd_unidade: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getUnidade(id)
    },
    options: async (payload) => {
      console.log(payload.node.parent.value)
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      // if (!model.value.material.cd_material) return []
      const items = await getUnidades(payload.node.parent.value.cd_material)
      return items
    }
  },
  cd_material: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getMaterial(id)
    },
    options: async (payload) => {
      console.log(payload)
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      // if (!model.value.material.cd_material) return []
      const items = await getMateriais()
      console.log(items)
      return items
    }
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_prescricao'
  },
  {
    $formkit: 'date',
    name: 'dt_prescricao',
    label: 'Data',
    validation: 'required',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_paciente',
    id: 'cd_paciente',
    label: 'Paciente',
    bind: '$cd_paciente',
    validation: 'required',
    debounce: 500,
    outerClass: 'md:col-span-8'
  },
  {
    $formkit: 'textarea',
    name: 'bb_observacao',
    label: 'Observação',
    outerClass: 'md:col-span-12'
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
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'number',
    name: 'nr_quantidade',
    label: 'Quantidade',
    number,
    validation: 'required',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_unidade',
    bind: '$cd_unidade',
    label: 'Unidade',
    validation: 'required',
    outerClass: 'md:col-span-4'
  }
]
const schemaRepeater: FormKitSchemaDefinition = [
  {
    $formkit: 'repeater',
    name: 'material',
    outerClass: 'md:col-span-12',
    children: schemaFilho
  }
]

const model = ref({})
// const modelFilho = ref({})
if (props.id === 0) {
  model.value = { prescricao: { dt_prescricao: useDateFormat(useNow(), 'YYYY-MM-DD').value } }
  console.log(model.value)
} else {
  const prescricao = await api.get(props.id, getFieldName(schema))
  prescricao.bb_observacao = prescricao.bb_observacao ? atob(prescricao.bb_observacao) : ''
  model.value = {
    prescricao,
    material: await apiMaterial.getAll()
  }
}
const onSubmit = async (_data: any) => {
  _data.prescricao.bb_observacao = _data.prescricao.bb_observacao ? btoa(_data.prescricao.bb_observacao) : null
  if (props.id === 0) {
    const response = await api.create(_data.prescricao)
    _data.material.forEach(async (item: any) => {
      item.cd_prescricao = response.cd_prescricao
      await apiMaterial.create(item)
    })
  } else {
    await api.update(props.id, _data.prescricao)
    _data.material.forEach(async (item: any) => {
      if (item.cd_codigo) {
        await apiMaterial.update(item.cd_codigo, item)
      } else {
        item.cd_prescricao = props.id
        await apiMaterial.create(item)
      }
    })
    // verifica excluidos
    const remove = itemsMaterial.value.filter((item1) => {
      return !_data.material.some(item2 => item2.cd_codigo === (item1 as any).cd_codigo)
    })
    remove.forEach(async (item: any) => {
      await apiMaterial.remove(item.cd_codigo)
    })
  }
  // comparar o array items com _data.material pela chave cd_codigo e apagar do banco
  if (api.status.value) {
    emit('submit', props.id, item.value)
  } else {
    useSystemStore().showError(JSON.stringify(api.errors.value.error))
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
</script>

<template>
  <BaseForm
    title="Prescrição"
    @close="emit('close')"
  >
    <template #default>
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
              <!-- <FormKit
                id="repeater"
                type="repeater"
                name="material"
                label="Material"
                draggable="true"
                outer-class="md:col-span-12"
              >
                <div class="grid gap-x-4 grid-cols-1 md:grid-cols-12">
                  <FormKitSchema
                    :schema="schemaFilho"
                  />
                </div>
              </FormKit> -->
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
        <!-- <div class="flex items-center justify-center">
          <div class="container max-w-screen-lg mx-auto">
            <BaseGridCore
              v-if="false"
              style="height: 200px; width: 100%;"
              :column-defs
              :row-data
            />
          </div>
        </div> -->
      </FormKit>
    </template>
  </BaseForm>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
