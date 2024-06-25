<script setup lang="ts">
import { useAnexo } from '~/composables/atendimento/useAnexo'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const { doAnexoLista } = useAnexo(props.data.cd_atendimento)
const rowData = ref()
const columnDefs = [
  { field: 'ds_documento', headerName: 'Tipo Documento' }
]

const onRowDoubleClicked = async () => {
  // const response = await doAnexoDownload(params.data.cd_documento)
  // saveFile(response.filename, response.stream.data)
}
const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}
const response = await doAnexoLista()
rowData.value = response.data
</script>

<template>
  <BaseGridCore
    style="height: 100%; width: 100%;"
    :column-defs
    :row-data
    :pagination="false"
    :on-row-double-clicked="onRowDoubleClicked"
    @first-data-rendered="onFirstDataRendered"
  />
</template>
