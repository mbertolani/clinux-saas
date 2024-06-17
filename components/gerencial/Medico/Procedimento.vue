<script setup lang="ts">
import { useMedico } from '~/composables/gerencial/useMedico'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const { getProcedimento, getProcedimentos, get, useMedicoProcedimento } = useMedico(props.id)
const [procedimento, procedimentos, medico] = await Promise.all([
  getProcedimento(),
  getProcedimentos(3),
  get(props.id, 'ds_medico')
])

const onSubmit = async (_data: any) => {
  const insert = _data.procedimentos.filter(item => !procedimento.foreign.includes(item))
  const remove = procedimento.primary.filter(item => !_data.procedimentos.includes(item.cd_procedimento))
  // insert.forEach(async (item: any) => {
  //   await useMedicoProcedimento.create({ cd_medico: props.id, cd_procedimento: item })
  // })
  // remove.forEach(async (item: any) => {
  //   await useMedicoProcedimento.remove(item.cd_codigo)
  // })
  const operations = [
    ...insert.map(item => useMedicoProcedimento.create({ cd_medico: props.id, cd_procedimento: item })),
    ...remove.map(item => useMedicoProcedimento.remove(item.cd_codigo))
  ]

  await Promise.all(operations)
}
</script>

<template>
  <BaseForm
    title="Associar Procedimentos"
    @close="useModal().close"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <FormKit
        name="procedimentos"
        type="transferlist"
        :label="medico.ds_medico"
        source-label="Procedimento"
        target-label="Seleção"
        :options="procedimentos"
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
