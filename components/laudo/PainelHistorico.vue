<script setup lang="ts">
import { useLaudo } from '~/composables/laudo/useLaudo'
import { LaudoAssinado } from '#components'
import { formatDateTime } from '@/utils/masks'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const { doLaudoLista } = useLaudo()
const rowData = ref()
const columnDefs = [
  { field: 'dt_data', headerName: 'Data', width: 90, valueFormatter: p => formatDateTime(p.value) },
  { field: 'ds_procedimento', headerName: 'Procedimento', width: 200 }
]

const onRowDoubleClicked = async (params) => {
  // const response = await doAnexoDownload(params.data.cd_documento)
  // saveFile(response.filename, response.stream.data)
  const { cd_atendimento, cd_exame } = params.data
  const response = await useLaudo().laudoAssinado({ cd_atendimento, cd_exame })// cd_atendimento: 1723321, cd_exame: 12834
  if (!response.error)
    useModal().open(LaudoAssinado, {
      title: params.data.ds_procedimento,
      src: URL.createObjectURL(response.data),
      onClose() {
        useModal().close()
      }
    })
}
// const onCellClicked = async ({ data }) => {
//   const response = await doAnexoDownload(data.cd_documento)
//   rowImage.value = response.stream.data instanceof Blob ? URL.createObjectURL(response.stream.data) : ''
// }
const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}
// const response = await doLaudoLista(props.data.cd_paciente)
// rowData.value = response.data
doLaudoLista(props.data.cd_paciente).then((response) => {
  rowData.value = response.data
})
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
