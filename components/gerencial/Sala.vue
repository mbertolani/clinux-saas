<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useSala } from '~/composables/gerencial/useSala'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

const emit = defineEmits(['submit', 'close'])

defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_sala'
  },
  {
    $formkit: 'text',
    name: 'ds_sala',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
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
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
    outerClass: formClass(12)
  }
]
const onSubmit = async (...args) => {
  emit('submit', ...args)
}

const data = reactive({
  cd_empresa: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useEmpresa().getItem(id)
    },
    options: async () => {
      return await useEmpresa().getItemList()
    }
  }
})
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
      :controller="useSala()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
