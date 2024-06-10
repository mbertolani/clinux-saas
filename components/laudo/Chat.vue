<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
console.log('Chat props.id', props.id)
const rowData = ref([])
const columnDefs = [
  // { field: 'ds_mensagem', headerName: 'Descrição', width: useGrid().dataTypeWidth('ftString', 64) }
]
</script>

<template>
  <BaseForm
    title="Mensagens"
    @close="useModal().close()"
  >
    <BaseGridCore
      style="height: 400px; width: 100%;"
      :column-defs
      :row-data
    />
  </BaseForm>
</template>
