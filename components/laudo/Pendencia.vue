<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { useLaudo } from '~/composables/laudo/useLaudo'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const response = await useLaudo().execPendencia({ cd_atendimento: props.id })
const options = getFieldList(response.data)
const onSubmit = async (_data: any) => {
  // _data.bb_complemento = _data.bb_complemento ? atob(_data.bb_complemento) : null
  const response = await useLaudo().execPendencia({ cd_atendimento: props.id, cd_complemento: _data.cd_complemento, bb_complemento: _data.bb_complemento })
  if (!response.error)
    emit('submit', response.data)
}

const data = reactive({
  // cd_complemento: {
  //   disabled: '$cd_complemento > 0'
  // }
})

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_atendimento'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_complemento',
    label: 'Descrição',
    options: options,
    validation: 'required',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'textarea',
    name: 'bb_complemento',
    label: 'Observação',
    outerClass: 'md:col-span-12'
  }

]
const { api, item } = useAtendimento()
const model = ref(null)
await api.get(props.id, getFieldName(schema))
model.value = item.value
model.value.bb_complemento = model.value.bb_complemento ? atob(model.value.bb_complemento) : null
</script>

<template>
  <BaseForm
    title="Pendência"
    @close="emit('close')"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      :value="model"
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
