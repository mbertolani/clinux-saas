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

const response = await useLaudo().execAuditar({ cd_atendimento: props.id })
const options = getFieldList(response.data)

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_atendimento'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_auditoria',
    label: 'Classificação',
    options: options,
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'textarea',
    name: 'bb_auditado',
    label: 'Observação',
    outerClass: formClass(12)
  }

]

const onSubmit = async (_data: any) => {
  const response = await useLaudo().execAuditar({ ..._data, bb_auditado: Encode64(_data.bb_auditado) })
  if (!response.error)
    emit('submit', response.data)
}

const model = ref(null)
model.value = props.id ? await useAtendimento().get(props.id, getFieldName(schema)) : {}
model.value.bb_auditado = Decode64(model.value.bb_auditado)
</script>

<template>
  <BaseForm
    title="Auditoria"
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
