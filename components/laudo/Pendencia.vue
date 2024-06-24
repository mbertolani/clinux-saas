<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
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

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_atendimento'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_complemento',
    label: 'Classificação',
    options: options,
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'textarea',
    name: 'bb_complemento',
    label: 'Observação',
    outerClass: formClass(12)
  }
]

const onSubmit = async (_data: any) => {
  const response = await useLaudo().execPendencia(_data)
  if (!response.error)
    emit('submit', response.data)
}

const model = ref(null)
model.value = props.id ? await useAtendimento().get(props.id, getFieldName(schema)) : {}
model.value.bb_complemento = Decode64(model.value.bb_complemento)
</script>

<template>
  <BaseForm
    title="Pendência"
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema
      :value="model"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
