<script setup lang="ts">
import { useMedico } from '~/composables/gerencial/useMedico'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getSala, getSalas, get, useMedicoSala } = useMedico(props.id)
const [Sala, Salas, medico] = await Promise.all([
  getSala(),
  getSalas(),
  get(props.id, 'ds_medico')
])

const onSubmit = async (_data: any) => {
  const insert = _data.Salas.filter(item => !Sala.foreign.includes(item))
  const remove = Sala.primary.filter(item => !_data.Salas.includes(item.cd_sala))
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
    :title="medico.ds_medico"
    @close="emit('close')"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <FormKit
        name="Salas"
        type="transferlist"
        source-label="Sala"
        target-label="Seleção"
        :options="Salas"
        :value="Sala.foreign"
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
