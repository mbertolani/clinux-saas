<script setup lang="ts">
import { useMedico } from '~/composables/gerencial/useMedico'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getProcedimento, getProcedimentos, useMedicoProcedimento } = useMedico(props.id)
const [procedimento, listaProcedimento, medico] = await Promise.all([
  getProcedimento(),
  getProcedimentos(),
  useMedicoProcedimento.getTitle()
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
</script>

<template>
  <BaseForm
    title="Associação Médico x Procedimento"
    @close="emit('close')"
  >
    <div
      v-if="id > 0"
      class="bg-emerald-600 text-white px-3 py-2 rounded mb-2 text-center"
    >
      {{ medico.ds_guerra }}
    </div>
    <FormKit
      v-slot="{ state: { dirty } }"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <FormKit
        name="procedimentos"
        type="transferlist"
        source-label="Lista"
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
