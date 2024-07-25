<script setup lang="ts">
import { useMaterial } from '~/composables/estoque/useMaterial'
import { useUnidade } from '~/composables/estoque/useUnidade'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getItemList } = useUnidade()
const { getMaterialTitle, getMaterialUnidade, useMaterialUnidade } = useMaterial(props.id)
const [MaterialUnidade, listaUnidade, Material] = await Promise.all([
  getMaterialUnidade(),
  getItemList(),
  getMaterialTitle()
])
const onSubmit = async (_data: any) => {
  const insert = _data.lista.filter(item => !MaterialUnidade.foreign.includes(item))
  const remove = MaterialUnidade.primary.filter(item => !_data.lista.includes(item.cd_unidade))
  const operations = [
    ...insert.map(item => useMaterialUnidade.create({ cd_material: props.id, cd_unidade: item })),
    ...remove.map(item => useMaterialUnidade.remove(item.cd_codigo))
  ]
  await Promise.all(operations)
  emit('close')
}
</script>

<template>
  <BaseForm
    title="Associação Material x Unidade"
    @close="emit('close')"
  >
    <div
      v-if="id > 0"
      class="bg-emerald-600 text-white px-3 py-2 rounded mb-2 text-center"
    >
      {{ Material }}
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
        :options="listaUnidade"
        :value="MaterialUnidade.foreign"
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
