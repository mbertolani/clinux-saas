<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useLaudo } from '~/composables/laudo/useLaudo'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const response = await useLaudo().execMedico({ cd_atendimento: props.id })
const options = getFieldList(response.data)

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'dropdown',
    name: 'cd_medico',
    label: 'Médico',
    options: options,
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'textarea',
    name: 'bb_mensagem',
    label: 'Observação',
    outerClass: formClass(12)
  }
]

const onSubmit = async (_data: any) => {
  const response = await useLaudo().execMedico({ cd_atendimento: props.id, cd_medico: _data.cd_medico })
  if (!response.error) {
    await useLaudo().doChatGravar({
      cd_atendimento: props.id,
      ds_mensagem: _data.bb_mensagem,
      sn_medico: useAuthStore().user.idmedico
    })
    emit('submit', response.data)
  }
}

// const model = ref(null)
// model.value = props.id ? await useExame().get(props.id, getFieldName(schema)) : {}
// model.value.bb_achado = Decode64(model.value.bb_achado)
</script>

<template>
  <BaseForm
    title="Transferir Laudo"
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema
      @submit="onSubmit"
    />
  </BaseForm>
</template>
