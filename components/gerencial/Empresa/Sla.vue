<script setup lang="ts">
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getEmpresaSla, getSla, getSlaTitle, useEmpresaSla } = useEmpresa(props.id)
const [EmpresaSla, listaSla, Empresa] = await Promise.all([
  getEmpresaSla(),
  getSla(),
  getSlaTitle()
])

const onSubmit = async (_data: any) => {
  const insert = _data.lista.filter(item => !EmpresaSla.foreign.includes(item))
  const remove = EmpresaSla.primary.filter(item => !_data.lista.includes(item.cd_sla))
  const operations = [
    ...insert.map(item => useEmpresaSla.create({ cd_empresa: props.id, cd_sla: item })),
    ...remove.map(item => useEmpresaSla.remove(item.cd_codigo))
  ]
  await Promise.all(operations)
  emit('close')
}
</script>

<template>
  <BaseForm
    title="Associação Empresa x Sla"
    @close="emit('close')"
  >
    <div
      v-if="id > 0"
      class="bg-emerald-600 text-white px-3 py-2 rounded mb-2 text-center"
    >
      {{ Empresa }}
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
        :options="listaSla"
        :value="EmpresaSla.foreign"
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
