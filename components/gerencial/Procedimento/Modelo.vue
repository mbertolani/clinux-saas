<script setup lang="ts">
import { useProcedimento } from '~/composables/gerencial/useProcedimento'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getModelo, getModelos, get, useProcedimentoModelo } = useProcedimento(props.id)
const [modelo, listaModelo, procedimento] = await Promise.all([
  getModelo(),
  getModelos(),
  get(props.id, 'ds_procedimento')
])

const onSubmit = async (_data: any) => {
  const insert = _data.modelos.filter(item => !modelo.foreign.includes(item))
  const remove = modelo.primary.filter(item => !_data.modelos.includes(item.cd_modelo))
  const operations = [
    ...insert.map(item => useProcedimentoModelo.create({ cd_procedimento: props.id, cd_modelo: item })),
    ...remove.map(item => useProcedimentoModelo.remove(item.cd_codigo))
  ]
  await Promise.all(operations)
  emit('close')
}
</script>

<template>
  <BaseForm
    :title="procedimento.ds_procedimento"
    @close="emit('close')"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <FormKit
        name="modelos"
        type="transferlist"
        source-label="Modelo"
        target-label="Seleção"
        :options="listaModelo"
        :value="modelo.foreign"
        searchable
        placeholder="Pesquisar"
      />
      <FormKit
        type="submit"
        label="Salvar"
        :disabled="!dirty"
      />
    </FormKit>
  </BaseForm>
</template>
