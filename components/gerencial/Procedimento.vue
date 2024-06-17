<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import { getFieldName } from '~/utils/schema'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
const model = ref(null)
const { get, getGrupos, getGrupo } = useProcedimento()

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
    outerClass: formClass(4)
  },
  {
    $formkit: 'text',
    name: 'ds_exame',
    label: 'Nomenclatura TUSS',
    outerClass: formClass(6)
  },
  {
    $formkit: 'text',
    name: 'ds_mn',
    label: 'Mnemônico',
    validation: 'required',
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_modalidade',
    id: 'cd_modalidade',
    label: 'Modalidade',
    validation: 'required',
    bind: '$cd_modalidade',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/gerencial/modalidade').getList()),
    outerClass: formClass(4)
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_grupo',
    id: 'cd_grupo',
    label: 'Grupo',
    selectionRemovable: true,
    debounce: 500,
    bind: '$cd_grupo',
    outerClass: formClass(6),
    emptyMessage: 'Nenhum registro encontrado !'
  },

  {
    $formkit: 'number',
    name: 'nr_prazo_entrega',
    label: 'P. Entrega',
    outerClass: formClass(2)
  },
  {
    $formkit: 'toggle',
    name: 'sn_laudar',
    label: 'Não Laudar ?',
    outerClass: formClass(12)
  }

]

watch(() => props.id, async () => {
  model.value = props.id ? await get(props.id, getFieldName(schema)) : {}
})
const onSubmit = async (...args) => {
  emit('submit', ...args)
}
</script>

<template>
  <BaseForm
    :title
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema
      :data
      :controller="useProcedimento()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
