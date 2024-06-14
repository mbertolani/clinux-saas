<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useMedico } from '~/composables/gerencial/useMedico'
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
    name: 'cd_medico'
  },
  {
    $formkit: 'text',
    name: 'ds_medico',
    label: 'Nome',
    validation: 'required',
    outerClass: 'md:col-span-8'
  },
  {
    $formkit: 'text',
    name: 'ds_guerra',
    label: 'Apelido',
    validation: 'required',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'mask',
    name: 'ds_cpf',
    id: 'ds_cpf',
    mask: '###.###.###-##',
    label: 'CPF',
    unmaskValue: true,
    outerClass: 'md:col-span-3'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_usuario',
    label: 'Usuário',
    validation: 'required',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/gerencial/usuario').getList()),
    outerClass: 'md:col-span-9'
  },
  {
    $formkit: 'text',
    name: 'ds_conselho',
    label: 'Conselho',
    validation: 'required',
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'text',
    name: 'ds_crm_nr',
    label: 'Nº Conselho',
    validation: 'required',
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'text',
    name: 'ds_crm_uf',
    label: 'UF',
    validation: 'required',
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'text',
    name: 'ds_rqe',
    label: 'Rqe',
    outerClass: 'md:col-span-3'
  },
  {
    $formkit: 'text',
    name: 'ds_cnes',
    label: 'Cnes',
    outerClass: 'md:col-span-3'
  },
  {
    $formkit: 'text',
    name: 'ds_leo_token',
    label: 'Token LEO',
    outerClass: 'md:col-span-3'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_fila',
    label: 'Fila de Trabalho',
    selectionRemovable: true,
    options: [{ label: 'FILA', value: 1 }], // getFieldList(await useBaseStore('/financeiro/centro').getList()),
    outerClass: 'md:col-span-9'
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?',
    outerClass: 'md:col-span-12 md:items-end inline-flex items-center'
  }

]
const model = ref({})
const { get, create, update } = useMedico()
model.value = props.id ? await get(props.id, getFieldName(schema)) : {}

const onSubmit = async (_data: any) => {
  const item = (props.id) ? await update(props.id, _data) : await create(_data)
  if (item) {
    emit('submit', props.id, item.value)
  }
}
</script>

<template>
  <BaseForm
    title="Cadastro de Médicos"
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
  </BaseForm>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
