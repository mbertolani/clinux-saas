<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useModelo } from '~/composables/gerencial/useModelo'

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

const { getMedico, getEmpresa, getModalidade, getMedicos, getEmpresas, getModalidades } = useModelo()

const validaModalidade = computed(() => props.id > 0)

const data = reactive({
  cd_modalidade: {
    disabled: validaModalidade,
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
      if (!getNode('cd_modalidade').value) return []
      return await getMedicos(Number(getNode('cd_modalidade').value))
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
    outerClass: formClass(4)
  },
  {
    $formkit: 'text',
    name: 'ds_observacao',
    label: 'Observação',
    outerClass: formClass(8)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_modalidade',
    id: 'cd_modalidade',
    label: 'Modalidade',
    validation: 'required',
    bind: '$cd_modalidade',
    selectionRemovable: true,
    outerClass: formClass(4)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_empresa',
    id: 'cd_empresa',
    label: 'Empresa',
    bind: '$cd_empresa',
    selectionRemovable: true,
    outerClass: formClass(4)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_medico',
    id: 'cd_medico',
    label: 'Médico',
    bind: '$cd_medico',
    selectionRemovable: true,
    outerClass: formClass(4)
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
    outerClass: formClass(12)
  }
]

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
      :controller="useModelo()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
