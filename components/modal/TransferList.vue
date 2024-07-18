<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  options: {
    type: Array,
    required: false,
    default: () => []
  },
  value: {
    type: Array,
    required: false,
    default: () => []
  },
  master: {
    type: String,
    required: false
  },
  submit: {
    type: Function,
    required: true
  }
})
const emit = defineEmits(['close'])
// const { getMedicoSala, getSalas, useMedicoSala } = useMedico(props.id)
// const [selecao, Salas, Medico] = await Promise.all([
//   getMedicoSala(),
//   getSalas(),
//   useMedicoSala.getTitle()
// ])

const onSubmit = async (_data: any) => {
  // const insert = _data.lista.filter(item => !props.selecao.foreign.includes(item))
  // const remove = props.selecao.primary.filter(item => !_data.lista.includes(item.cd_sala))
  // const operations = [
  //   ...insert.map(item => props.controller.create({ cd_medico: props.id, cd_sala: item })),
  //   ...remove.map(item => props.controller.remove(item.cd_codigo))
  // ]
  // await Promise.all(operations)
  props.submit(_data)
  emit('close')
}
</script>

<template>
  <BaseForm
    :title
    @close="emit('close')"
  >
    <div
      v-if="id > 0"
      class="bg-emerald-600 text-white px-3 py-2 rounded mb-2 text-center"
    >
      {{ master }}
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
