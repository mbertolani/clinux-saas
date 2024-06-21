<script setup lang="ts">
import { useMedico } from '~/composables/gerencial/useMedico'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getProcedimento, getProcedimentos, get, useMedicoProcedimento } = useMedico(props.id)
const [procedimento, listaProcedimento, medico] = await Promise.all([
  getProcedimento(),
  getProcedimentos(),
  get(props.id, 'ds_medico')
])

const onSubmit = async (_data: any) => {
  const insert = _data.procedimentos.filter(item => !procedimento.foreign.includes(item))
  const remove = procedimento.primary.filter(item => !_data.procedimentos.includes(item.cd_procedimento))
  const operations = [
    ...insert.map(item => useMedicoProcedimento.create({ cd_medico: props.id, cd_procedimento: item })),
    ...remove.map(item => useMedicoProcedimento.remove(item.cd_codigo))
  ]
  await Promise.all(operations)
  emit('close')
}
// const atualizaProcedimento = async (node) => {
//   node.on('commit', async (context: any) => {
//     listaProcedimento.value = await getProcedimentos(context.payload)
//   })
// }
</script>

<template>
  <BaseForm
    title="Associar Procedimentos"
    @close="emit('close')"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <!-- <FormKit
        id="cd_modalidade"
        type="dropdown"
        label="Modalidade"
        name="cd_modalidade"
        :options="listaModalidade"
      /> -->
      <FormKit
        name="procedimentos"
        type="transferlist"
        :label="medico.ds_medico"
        source-label="Procedimento"
        target-label="Seleção"
        :options="listaProcedimento"
        :value="procedimento.foreign"
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
