<script setup lang="ts">
import { useLaudo } from '~/composables/laudo/useLaudo'
import { formatDateTime } from '@/utils/masks'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const rowData = ref()
rowData.value = (await useLaudo().doChatLista({ cd_atendimento: props.data.cd_atendimento })).data
const columnDefs = [
  { field: 'dt_data', headerName: 'Data', width: 200, valueFormatter: p => formatDateTime(p.value) },
  { field: 'ds_funcionario', headerName: 'Funcionário', width: 200 },
  { field: 'ds_mensagem', headerName: 'Descrição', width: 600 }
]

const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}
</script>

<template>
  <BaseGridCore
    style="height: 100%; width: 100%;"
    :column-defs
    :row-data
    :pagination="false"
    @first-data-rendered="onFirstDataRendered"
  />
</template>
