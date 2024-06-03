<script setup lang="ts">
import { FormKitSchema } from '@formkit/vue'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

function getFieldName(schema) {
  return schema.map(item => item.name).join(',')
}
const schema = [
  {
    $formkit: 'text',
    name: 'cd_empresa',
    label: 'Código',
    if: 'false'
  },
  {
    $formkit: 'text',
    name: 'ds_empresa',
    label: 'Descrição',
    validation: 'required',
    autofocus: true
  },
  {
    $formkit: 'text',
    name: 'ds_razao',
    label: 'Razão Social'
  },
  {
    $formkit: 'mask',
    name: 'ds_cnpj',
    mask: '##.###.###/####-##',
    label: 'CNPJ'
  },
  {
    $formkit: 'checkbox',
    name: 'sn_empresa',
    label: 'Ativo ?'
  }
]
const onSubmit = async (_data: any) => {
  if (props.id === 0) {
    await api.create(_data)
  } else {
    await api.update(props.id, _data)
  }
  if (api.status.value) {
    emit('submit', props.id, item.value)
  } else {
    useToast().add({
      title: 'Error !',
      color: 'red',
      description: JSON.stringify(api.errors.value.error)
    })
  }
}
const onClose = () => {
  // todo: verificar se dados foram modificados
  emit('close')
}
const emit = defineEmits(['submit', 'close'])
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
// const codigo = toRef(props, 'id')
const { api, item } = useEmpresa()
const model = ref(null)
const data = ref(null)

if (props.id === 0) {
  model.value = {}
} else {
  await api.get(props.id, getFieldName(schema))
  model.value = item.value
}
// const { getId, incId } = useEmpresa()
// const clique = () => {
//   incId()
// }

function setNode(node) {
  // Wait until the form is mounted
  node.on('mounted', () => {
    // Now we can listen to form commit values and reasonably
    // expect they come from user inputs.
    node.on('commit', ({ payload }) => {
      console.log('form values', payload)
    })
    node.on('change', ({ payload }) => {
      console.log('form change', payload)
    })
  })
}
</script>

<template>
  <BaseForm
    title="Cadastro de Empresas"
    @close="onClose"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      v-model="model"
      dirty-behavior="compare"
      type="form"
      :data="data"
      :actions="false"
      :plugins="[setNode]"
      @submit="onSubmit"
      @close="onClose"
    >
      <FormKitSchema
        :schema="schema"
      />
      <FormKit
        type="submit"
        label="Salvar"
        :disabled="!dirty"
      />
    </FormKit>
    <pre
      v-if="true"
      wrap
    >{{ model }}</pre>
  </BaseForm>
</template>
