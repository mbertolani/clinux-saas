<script setup lang="ts">
import { ModalFullScreen } from '#components'

defineProps({
  rowData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])
const columnDefs = [
  { field: 'ds_log', headerName: 'Data', width: useGrid().dataTypeWidth('ftString', 32) },
  { field: 'ds_funcionario', headerName: 'Usuário', width: useGrid().dataTypeWidth('ftString', 32) },
  { field: 'ds_campo', headerName: 'Campo', width: useGrid().dataTypeWidth('ftString', 32) },
  { field: 'ds_before', headerName: 'Antes', width: useGrid().dataTypeWidth('ftString', 32) },
  { field: 'ds_after', headerName: 'Depois', width: useGrid().dataTypeWidth('ftString', 32) }
]
</script>

<template>
  <ModalFullScreen
    title="Log de Modificações"
    :screen="false"
    @close="emit('close')"
  >
    <template #default>
      <BaseGridCore
        style="height: 600px; width: 100%;"
        :column-defs
        :row-data
      />
    </template>
  </ModalFullScreen>
</template>
