<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import { getFieldName } from '~/utils/schema'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const model = ref(null)
const { api, item, getGrupos, getGrupo } = useProcedimento()

const data = reactive({
  cd_modalidade: {
    disabled: props.id > 0
  },
  cd_grupo: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getGrupo(id)
    },
    options: async ({ search, options }) => {
      if (!search) return []
      if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      if (!model.value.cd_modalidade) return []
      return await getGrupos(model.value.cd_modalidade)
    }

  }
})

useFormKitNodeById('cd_modalidade', (node) => {
  node.on('commit', async (context) => {
    const items = context.payload ? await getGrupos(context.payload) : []
    getNode('cd_grupo').input(null)
    getNode('cd_grupo').props.options = items
  })
})

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_procedimento'
  },
  {
    $formkit: 'text',
    name: 'ds_procedimento',
    label: 'Nome',
    validation: 'required',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'text',
    name: 'ds_exame',
    label: 'Nomenclatura TUSS',
    outerClass: 'md:col-span-6'
  },
  {
    $formkit: 'text',
    name: 'ds_mn',
    label: 'Mnemônico',
    validation: 'required',
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_modalidade',
    id: 'cd_modalidade',
    label: 'Modalidade',
    validation: 'required',
    bind: '$cd_modalidade',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/gerencial/modalidade').api.getList()),
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_grupo',
    id: 'cd_grupo',
    label: 'Grupo',
    selectionRemovable: true,
    debounce: 500,
    bind: '$cd_grupo',
    outerClass: 'md:col-span-6',
    emptyMessage: 'Nenhum registro encontrado !'
  },

  {
    $formkit: 'number',
    name: 'nr_prazo_entrega',
    label: 'P. Entrega',
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'toggle',
    name: 'sn_laudar',
    label: 'Não Laudar ?',
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
    title="Cadastro de Procedimentos"
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
