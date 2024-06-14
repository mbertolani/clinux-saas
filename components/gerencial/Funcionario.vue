<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useFuncionario } from '~/composables/gerencial/useFuncionario'
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
    name: 'cd_funcionario'
  },
  {
    $formkit: 'text',
    name: 'ds_funcionario',
    label: 'Nome',
    validation: 'required',
    outerClass: 'md:col-span-8'
  },
  {
    $formkit: 'text',
    name: 'ds_apelido',
    label: 'Apelido',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'mask',
    name: 'ds_cpf',
    id: 'ds_cpf',
    mask: '###.###.###-##',
    label: 'Cpf',
    unmaskValue: true,
    outerClass: 'md:col-span-3'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_usuario',
    label: 'Usuário',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/gerencial/usuario').getList()),
    outerClass: 'md:col-span-9'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_centro',
    label: 'Centro de Custo',
    validation: 'required',
    selectionRemovable: true,
    options: getFieldList(await useBaseStore('/financeiro/centro').getList()),
    outerClass: 'md:col-span-12'
  }
]
const model = ref({})
const { get, create, update } = useFuncionario()

watch(() => props.id, async () => {
  const response = props.id ? await get(props.id, getFieldName(schema)) : {}
  response.bb_portal_anexo = Decode64(response.bb_portal_anexo)
  model.value = response
})
const onSubmit = async (_data: any) => {
  const item = (props.id) ? await update(props.id, _data) : await create(_data)
  if (item)
    emit('submit', props.id, item)
}
</script>

<template>
  <BaseForm
    title="Cadastro de Funcionários"
    @close="emit('close')"
  >
    <FormKit
      id="form-kit"
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
