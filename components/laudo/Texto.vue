<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useTexto } from '~/composables/laudo/useTexto'
import { useMedico } from '~/composables/gerencial/useMedico'
import { useModalidade } from '~/composables/gerencial/useModalidade'

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
    name: 'cd_chave'
  },
  {
    $formkit: 'text',
    name: 'ds_chave',
    label: 'Descrição',
    validation: 'required',
    inputClass: '!lowercase',
    outerClass: formClass(12)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_modalidade',
    id: 'cd_modalidade',
    label: 'Modalidade',
    options: await useModalidade().getItemList(),
    selectionRemovable: true,
    outerClass: formClass(6)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_medico',
    id: 'cd_medico',
    label: 'Médico',
    options: await useMedico().getItemList(),
    selectionRemovable: true,
    outerClass: formClass(6)
  },
  {
    $formkit: 'text',
    name: 'ds_observacao',
    label: 'Observação',
    inputClass: '!lowercase',
    outerClass: formClass(12)
  }
]

const data = reactive({
  cd_medico: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useMedico().getItem(id)
    },
    options: async () => {
      return await useMedico().getItemList()
    }
  },
  cd_modalidade: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useModalidade().getItem(id)
    },
    options: async () => {
      return await useModalidade().getItemList()
    }
  }
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
      :controller="useTexto()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
