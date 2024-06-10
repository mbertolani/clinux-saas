<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
console.log('Anexo props.id', props.id)
const rowData = ref([])
const columnDefs = [
  // { field: 'ds_arquivo', headerName: 'Arquivo', width: useGrid().dataTypeWidth('ftString', 64) }
]
</script>

<template>
  <BaseForm
    title="Documentos"
    @close="useModal().close()"
  >
    <BaseGridCore
      style="height: 400px; width: 100%;"
      :column-defs
      :row-data
    />
  </BaseForm>
</template>
