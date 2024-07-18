<script setup lang="ts">
import { useUsuario } from '~/composables/gerencial/useUsuario'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const emit = defineEmits(['close'])
const { getUsuarioEmpresa, getEmpresas, useUsuarioEmpresa } = useUsuario(props.id)
const [usuarioEmpresa, listaEmpresa, usuario] = await Promise.all([
  getUsuarioEmpresa(),
  getEmpresas(),
  useUsuarioEmpresa.getTitle()
])

const onSubmit = async (_data: any) => {
  const insert = _data.lista.filter(item => !usuarioEmpresa.foreign.includes(item))
  const remove = usuarioEmpresa.primary.filter(item => !_data.lista.includes(item.cd_empresa))
  const operations = [
    ...insert.map(item => useUsuarioEmpresa.create({ cd_usuario: props.id, cd_empresa: item })),
    ...remove.map(item => useUsuarioEmpresa.remove(item.cd_controle))
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
      {{ usuario.ds_usuario }}
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
        :options="listaEmpresa"
        :value="usuarioEmpresa.foreign"
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
