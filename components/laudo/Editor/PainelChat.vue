<script setup lang="ts">
import { useLaudo } from '~/composables/laudo/useLaudo'
import { formatDateTime } from '@/utils/masks'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const columnDefs = [
  // { field: 'dt_data', headerName: 'Data', width: 85, valueFormatter: p => formatDateTime(p.value) },
  // { field: 'ds_funcionario', headerName: 'Funcionário', width: 200 },
  {
    field: 'ds_mensagem',
    headerName: 'Mensagem'
    // tooltipValueGetter: (params) => {
    //   return `[Enviado por: ${params.data.ds_funcionario}] ${params.data.ds_mensagem}`
    // }
  }
]

const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}

const rowData = ref()
useLaudo().doChatLista(props.data.cd_atendimento).then((response) => {
  rowData.value = response.data
})

const onRowDoubleClicked = async (params) => {
  useMessage().showMessage(params.data.ds_mensagem, `Enviado por: ${params.data.ds_funcionario} em ${formatDateTime(params.data.dt_data)}`)
}
</script>

<template>
  <BaseGridCore
    style="height: 100%; width: 100%;"
    :column-defs
    :row-data
    :pagination="false"
    :tooltip-show-delay="500"
    :on-row-double-clicked="onRowDoubleClicked"
    @first-data-rendered="onFirstDataRendered"
  />
</template>
