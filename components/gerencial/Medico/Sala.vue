<script setup lang="ts">
import { useMedico } from '~/composables/gerencial/useMedico'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getMedicoSala, getSalas, useMedicoSala } = useMedico(props.id)
const [MedicoSala, listaSalas, Medico] = await Promise.all([
  getMedicoSala(),
  getSalas(),
  useMedicoSala.getTitle()
])

const onSubmit = async (_data: any) => {
  const insert = _data.lista.filter(item => !MedicoSala.foreign.includes(item))
  const remove = MedicoSala.primary.filter(item => !_data.lista.includes(item.cd_sala))
  const operations = [
    ...insert.map(item => useMedicoSala.create({ cd_medico: props.id, cd_sala: item })),
    ...remove.map(item => useMedicoSala.remove(item.cd_codigo))
  ]
  await Promise.all(operations)
  emit('close')
}
</script>

<template>
  <BaseForm
    title="Associação Médico x Sala"
    @close="emit('close')"
  >
    <div
      v-if="id > 0"
      class="bg-emerald-600 text-white px-3 py-2 rounded mb-2 text-center"
    >
      {{ Medico.ds_guerra }}
    </div>
    <FormKit
      v-slot="{ state: { dirty } }"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <FormKit
        name="lista"
        type="transferlist"
        source-label="Lista"
        target-label="Seleção"
        :options="listaSalas"
        :value="MedicoSala.foreign"
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
