<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFila } from '~/composables/laudo/useFila'
import { useMedico } from '~/composables/gerencial/useMedico'

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
    name: 'cd_fila'
  },
  {
    $formkit: 'text',
    name: 'ds_fila',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(10)
  },
  // {
  //   $formkit: 'dropdown',
  //   name: 'cd_medico',
  //   id: 'cd_medico',
  //   bind: '$cd_medico',
  //   label: 'Médico',
  //   selectionRemovable: true,
  //   outerClass: formClass(10)
  // },
  {
    $formkit: 'time',
    name: 'dt_validade',
    label: 'Validade',
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    name: 'ds_data',
    id: 'ds_data',
    label: 'Data',
    options: await useFila().getData(),
    selectionRemovable: true,
    outerClass: formClass(4)
  },
  {
    $formkit: 'number',
    name: 'nr_periodo',
    id: 'nr_periodo',
    label: 'Período',
    outerClass: formClass(1)
  },
  {
    $formkit: 'dropdown',
    name: 'nr_fluxo',
    id: 'nr_fluxo',
    label: 'Fluxo',
    options: await useFila().getFluxo(),
    selectionRemovable: true,
    outerClass: formClass(3)
  },
  {
    $formkit: 'dropdown',
    name: 'nr_status',
    id: 'nr_status',
    label: 'Status',
    options: await useFila().getStatusTele(),
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'dropdown',
    name: 'ds_horario',
    id: 'ds_horario',
    label: 'Horário',
    options: await useFila().getHorario(),
    selectionRemovable: true,
    outerClass: formClass(2)
  },
  {
    $formkit: 'toggle',
    name: 'sn_filtro',
    label: 'Usar Filtro ?',
    outerClass: formClass(12)
  }
  // {
  //   $formkit: 'toggle',
  //   name: 'sn_geral',
  //   label: 'Geral ?',
  //   outerClass: formClass(10)
  // }
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
      :controller="useFila()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
