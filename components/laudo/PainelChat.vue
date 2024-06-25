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
  { field: 'dt_data', headerName: 'Data', width: 85, valueFormatter: p => formatDateTime(p.value) },
  // { field: 'ds_funcionario', headerName: 'Funcionário', width: 200 },
  {
    field: 'ds_mensagem',
    headerName: 'Mensagem',
    tooltipValueGetter: (params) => {
      return `[${params.data.ds_funcionario}] ${params.data.ds_mensagem}`
    }
    // cellRenderer: (params) => {
    //   return `<div class="py-0 my-0"><b>${params.data.ds_funcionario}</b> [${formatDateTime(params.data.dt_data)}]</div><div>${params.data.ds_mensagem}</div>`
    // }
  }
]

const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}

const rowData = ref()
// rowData.value = (await useLaudo().doChatLista({ cd_atendimento: props.data.cd_atendimento })).data
useLaudo().doChatLista({ cd_atendimento: props.data.cd_atendimento }).then((response) => {
  rowData.value = response.data
})
</script>

<template>
  <BaseGridCore
    style="height: 100%; width: 100%;"
    :column-defs
    :row-data
    :pagination="false"
    :tooltip-show-delay="500"
    @first-data-rendered="onFirstDataRendered"
  />
</template>
