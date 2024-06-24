<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useExame } from '~/composables/atendimento/useExame'
import { useLaudo } from '~/composables/laudo/useLaudo'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const response = await useLaudo().execAchado({ cd_exame: props.id })
const options = getFieldList(response.data)

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_exame'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_achado',
    label: 'Classificação',
    options: options,
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'textarea',
    name: 'bb_achado',
    label: 'Observação',
    outerClass: formClass(12)
  }

]

const onSubmit = async (_data: any) => {
  const response = await useLaudo().execAchado(_data)
  if (!response.error)
    emit('submit', response.data)
}

const model = ref(null)
model.value = props.id ? await useExame().get(props.id, getFieldName(schema)) : {}
model.value.bb_achado = Decode64(model.value.bb_achado)
</script>

<template>
  <BaseForm
    title="Achado Crítico"
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
