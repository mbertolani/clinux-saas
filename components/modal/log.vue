<script setup lang="ts">
import { ModalFullScreen } from '#components'

defineProps({
  rowData: {
    type: Array,
    default: () => []
  }
})
function formatDateTime(payload: string) {
  return payload?.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$3/$2/$1 $4:$5')
}
const emit = defineEmits(['close'])
const columnDefs = [
  { field: 'dt_log', headerName: 'Data', width: useGrid().dataTypeWidth('ftDateTime'), valueFormatter: p => formatDateTime(p.value) },
  { field: 'ds_funcionario', headerName: 'Usuário', width: useGrid().dataTypeWidth('ftString', 64) },
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
