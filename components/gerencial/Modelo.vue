<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useModelo } from '~/composables/gerencial/useModelo'
import { getFieldName } from '~/utils/schema'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const model = ref(null)
const { api, item, getMedico, getEmpresa, getModalidade, getMedicos, getEmpresas, getModalidades } = useModelo()

const data = reactive({
  cd_modalidade: {
    disabled: props.id > 0,
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
      if (!model.value.cd_modalidade) return []
      return await getMedicos(model.value.cd_modalidade)
    }
  }
})

useFormKitNodeById('cd_modalidade', (node) => {
  node.on('commit', async (context) => {
    const items = context.payload ? await getMedicos(context.payload) : []
    getNode('cd_medico').input(null)
    getNode('cd_medico').props.options = items
  })
})

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_modelo'
  },
  {
    $formkit: 'text',
    name: 'ds_modelo',
    label: 'Descrição',
    validation: 'required',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'text',
    name: 'ds_observacao',
    label: 'Observação',
    outerClass: 'md:col-span-8'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_modalidade',
    id: 'cd_modalidade',
    label: 'Modalidade',
    validation: 'required',
    bind: '$cd_modalidade',
    selectionRemovable: true,
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_empresa',
    id: 'cd_empresa',
    label: 'Empresa',
    bind: '$cd_empresa',
    selectionRemovable: true,
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_medico',
    id: 'cd_medico',
    label: 'Médico',
    bind: '$cd_medico',
    selectionRemovable: true,
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
    outerClass: 'md:col-span-12 md:items-end inline-flex items-center'
  }

]

if (props.id === 0) {
  model.value = {}
} else {
  await api.get(props.id, getFieldName(schema))
  model.value = item.value
}
const onSubmit = async (_data: any) => {
  if (props.id === 0) {
    await api.create(_data)
  } else {
    await api.update(props.id, _data)
  }
  if (api.status.value) {
    emit('submit', props.id, item.value)
  } else {
    useSystemStore().showError(JSON.stringify(api.errors.value.error))
  }
}
</script>

<template>
  <BaseForm
    title="Cadastro de Modelos"
    @close="emit('close')"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      v-model="model"
      dirty-behavior="compare"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <div class="flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div class="grid gap-x-4 grid-cols-1 md:grid-cols-12">
            <FormKitSchema
              :schema
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
  </BaseForm>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
