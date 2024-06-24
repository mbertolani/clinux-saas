<script setup lang="ts">
import DashboardModal from '@nuxt/ui-pro/components/dashboard/DashboardModal.vue'
import { useLaudo } from '~/composables/laudo/useLaudo'
import { formatDateTime } from '@/utils/masks'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const gridRef = ref(null)
const rowData = ref<any[]>([])
const originalVal = ref<string>('')
const modifiedVal = ref<string>('')
const _id = ref<number>(0)
const _nomeFuncionario = ref<string>('')

const columnDefs = [
  { field: 'dt_laudo', headerName: 'Data', width: 10, valueFormatter: p => formatDateTime(p.value) }
  // { field: 'ds_funcionario', headerName: 'Usuário', width: 100 }
]

const gridOptions = {
  suppressHorizontalScroll: true,
  autoSizeStrategy: {
    type: 'fitGridWidth'
  }
}

rowData.value = await useLaudo().find('merge', { cd_laudo: props.id })

const onFirstDataRendered = ({ api }) => {
  api.getDisplayedRowAtIndex(0)?.setSelected(true)
  // useFocus(gridRef).focused.value = true
}

const onSelectionChange = async ({ api }) => {
  const node = api.getSelectedNodes() ? api.getSelectedNodes()[0] : null
  if (!node) return
  _id.value = node.data.cd_codigo
  _nomeFuncionario.value = 'Modificado por: ' + node.data.ds_funcionario
  const response = await useLaudo().find('merge', { cd_laudo: props.id, cd_codigo: _id.value })
  if (response.length) {
    const [original, modified] = await Promise.all([
      response[0].bb_old ? useEditor().RtfToTxt({ bb_rtf: response[0].bb_old, format: 'ansi' }) : Promise.resolve(''),
      response[0].bb_new ? useEditor().RtfToTxt({ bb_rtf: response[0].bb_new, format: 'ansi' }) : Promise.resolve('')
    ])
    originalVal.value = original || ''
    modifiedVal.value = modified || ''
  }
}
</script>

<template>
  <DashboardModal
    title="Laudo"
    :description="_nomeFuncionario"
    :fullscreen="true"
  >
    <UPage>
      <template #left>
        <BaseGridCore
          ref="gridRef"
          style="height: 100%; width: 100%;"
          :column-defs
          :row-data
          :pagination="false"
          :grid-options
          @selection-changed="onSelectionChange"
          @first-data-rendered="onFirstDataRendered"
        />
      </template>
      <BaseMonaco
        :id="_id"
        v-model="modifiedVal"
        :original-val
      />
    </UPage>
  </DashboardModal>
</template>
