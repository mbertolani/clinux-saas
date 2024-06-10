<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
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
    $formkit: 'dropdown',
    name: 'cd_paciente',
    label: 'Paciente',
    validation: 'required',
    outerClass: 'md:col-span-8'
  },
  {
    $formkit: 'textarea',
    name: 'bb_observacao',
    label: 'Observação',
    outerClass: 'md:col-span-12'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_material',
    label: 'Material',
    outerClass: 'md:col-span-12'
  },
  {
    $formkit: 'number',
    name: 'nr_quantidade',
    label: 'Quantidade',
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_unidade',
    label: 'Unidade',
    outerClass: 'md:col-span-10'
  }

]
const model = ref({})
const { api, item } = usePrescricao()

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
const rowData = ref([])
const columnDefs = [
  { field: 'ds_material', headerName: 'Material', width: useGrid().dataTypeWidth('ftString', 64) },
  { field: 'nr_quantidade', headerName: 'Qte', width: useGrid().dataTypeWidth('ftInteger') },
  { field: 'ds_unidade', headerName: 'Unidade', width: useGrid().dataTypeWidth('ftString', 32) }
]
</script>

<template>
  <BaseForm
    title="Prescrição"
    @close="emit('close')"
  >
    <template #default>
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
                :schema="schema"
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
    </template>
    <template #grade>
      <BaseGridCore
        style="height: 200px; width: 100%;"
        :column-defs
        :row-data
      />
    </template>
  </BaseForm>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
