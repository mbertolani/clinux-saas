<script lang="ts" setup>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.min.css'
import { AgGridVue } from 'ag-grid-vue3'
import type { GridOptions, CellPosition, NavigateToNextCellParams } from 'ag-grid-community'
import { LicenseManager } from 'ag-grid-enterprise'
import gridToolPanel from './gridToolPanel.vue'
import { AG_GRID_LOCALE_PT_BR } from '@/locales/grid'
// import { ModalLog } from '#components'

LicenseManager.setLicenseKey(
  useRuntimeConfig().public.aggridKey
)
const props = defineProps({
  http: {
    type: Object,
    required: false
  },
  rowClassRules: {
    type: Object,
    default: null
  },
  menu: {
    type: Array,
    default: () => []
  }
})
// const modal = useModal()
const gridApi = ref()

// const showLog = async () => {
//   if (!gridApi.value.api.getFocusedCell()) {
//     return
//   }
//   const node = gridApi.value.api.getDisplayedRowAtIndex(gridApi.value.api.getFocusedCell().rowIndex)
//   modal.open(ModalLog, {
//     id: Number(node.id),
//     rowData: await props.http.getLog(node.id),
//     onClose() {
//       modal.close()
//     }
//   })
// }
const gotoPage = (node) => {
  const pageSize = gridApi.value.api.paginationGetPageSize()
  const rowIndex = gridApi.value.api.getRowNode(node.id).rowIndex
  const pageNumber = Math.floor(rowIndex / pageSize)
  gridApi.value.api.paginationGoToPage(pageNumber)
}

const applyTransaction = (transaction) => {
  const response = gridApi.value.api.applyTransaction(transaction)
  response.add.forEach((node) => {
    node.setSelected(true, true)
    gotoPage(node)
  })
}

const applyTransactionDelete = (transaction) => {
  if (!transaction.length)
    return
  const remove = gridApi.value.api.applyTransaction({
    remove: transaction
  }).remove
  const rowIndex = remove[0].childIndex
  const rowLast = gridApi.value.api.getLastDisplayedRowIndex()
  const nodeToSelect = gridApi.value.api.getDisplayedRowAtIndex(rowIndex > rowLast ? rowLast : rowIndex)
  if (nodeToSelect) {
    nodeToSelect.setSelected(true, true)
  }
}

const getSelectedNodes = () => {
  return gridApi.value.api.getSelectedNodes()
}

defineExpose({
  applyFilterChanged,
  applyTransaction,
  applyTransactionDelete,
  getSelectedNodes,
  gridApi
})

const colorMode = useColorMode()
const color = ref(null)
const getColor = () => {
  return colorMode.value === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
}
watch(colorMode, () => {
  color.value = getColor()
})
onMounted(() => {
  color.value = getColor()
})

const defaultGridOptions: GridOptions = {
  suppressHorizontalScroll: false,
  alwaysShowVerticalScroll: false,
  autoSizeStrategy: {
    type: 'fitCellContents'
  }
}

const defaultColDef = ref({
  // flex: 1,
  // minWidth: 100,
  editable: false,
  filter: true,
  enableRowGroup: false,
  enableCellChangeFlash: true
})

const getRowId = ({ data }) => Object.values(data)[0]

const onGridReady = () => {
  gridApi.value.api.closeToolPanel()
  restoreColumnState()
}

const onRowDataUpdated = ({ api }) => {
  api.ensureNodeVisible(api.getSelectedNodes()[0], 'middle')
}
const saveColumnState = () => {
  const state = gridApi.value.api.getColumnState()
  props.http?.getState(state)
}
const restoreColumnState = async () => {
  const savedState = await props.http?.getState()
  if (savedState) {
    if (!gridApi.value?.api) {
      useSystemStore().showError('Grid não carregado')
      return
    }
    gridApi.value.api?.applyColumnState({
      state: savedState,
      applyOrder: true
    })
  }
}
const autoSizeColumn = (skipHeader: boolean) => {
  const allColumnIds = []
  gridApi.value.api.getColumns().forEach((column) => {
    allColumnIds.push(column.getId())
  })
  gridApi.value.api.autoSizeColumns(allColumnIds, skipHeader)
}
const gridSizeColumn = () => {
  gridApi.value.api.sizeColumnsToFit()
}
const gridResetColumn = () => {
  gridApi.value.api.resetColumnState()
}

const getContextMenuItems = () => {
  const builtItems = [
    'copy',
    'copyWithHeaders',
    'separator',
    'export',
    'chartRange',
    'separator'
  ]
  const customItems = [
    {
      name: 'Ajustar colunas',
      action: () => autoSizeColumn(false)
    },
    {
      name: 'Expandir colunas',
      action: () => gridSizeColumn()
    },
    {
      name: 'Resetar colunas',
      action: () => gridResetColumn()
    },
    'separator',
    {
      name: 'Salvar colunas',
      action: () => saveColumnState()
    },
    {
      name: 'Restaurar colunas',
      action: () => restoreColumnState()
    }
    // {
    //   name: 'Painel Lateral',
    //   action: () => {
    //     gridSideBar.value = !gridSideBar.value
    //   }
    // },
    // {
    //   name: 'Multi-Seleção',
    //   action: () => {
    //     rowSelection.value = rowSelection.value === 'multiple' ? 'single' : 'multiple'
    //   }
    // }
  ]
  return [...builtItems, ...customItems]
}
// defineShortcuts({
//   ctrl_a: {
//     handler: () => { gridApi.value.api.selectAll() }
//   }
// })

const toolPanel = ref(null)
// const statusBar = {
//   statusPanels: [
//     {
//       key: 'aUniqueString',
//       statusPanel: 'agSelectedRowCountComponent',
//       align: 'left'
//     }
//   ]
// }

toolPanel.value = {
  toolPanels: [
    {
      id: 'custom',
      labelDefault: 'Funções',
      labelKey: 'custom',
      iconKey: 'menu',
      toolPanel: 'gridToolPanel',
      toolPanelParams: { menu: props.menu }
    },
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel'
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel'
    }

  ]
}

// const getRowStyle = props.getRowStyle || (({ data }) => {
//   if (data && 'sn_ativo' in data)
//     if (!data?.sn_ativo) {
//       return { color: 'silver' }
//     }
//   return { color: 'black' }
// })
// const getRowClass = props.getRowClass || (({ data }) => {
//   if (data && 'sn_ativo' in data)
//     if (!data?.sn_ativo) {
//       return { color: 'silver' }
//     }
//   return { color: 'black' }
// })
const rowClassRules = props.rowClassRules || {
  'custom-row-disable': ({ data }) => ('sn_ativo' in data) && (!data?.sn_ativo)
}

function applyFilterChanged(payload: string) {
  gridApi!.value.setGridOption(
    'quickFilterText',
    payload
  )
}

function navigateToNextCell(params: NavigateToNextCellParams): CellPosition | null {
  const suggestedNextCell = params.nextCellPosition

  const KEY_UP = 'ArrowUp'
  const KEY_DOWN = 'ArrowDown'

  const noUpOrDownKey = params.key !== KEY_DOWN && params.key !== KEY_UP
  if (noUpOrDownKey || !suggestedNextCell) {
    return suggestedNextCell
  }

  const nodeToSelect = params.api.getDisplayedRowAtIndex(suggestedNextCell.rowIndex)
  if (nodeToSelect) {
    nodeToSelect.setSelected(true, true)
  }

  return suggestedNextCell
}
// const onCellKeyDown = ({ event, api, rowIndex }) => {
//   switch (event.key) {
//     case 'PageUp':
//     case 'PageDown':
//       api.getDisplayedRowAtIndex(rowIndex)?.setSelected(true, true)
//       break
//     case 'a':
//     case 'A':
//       if (event.ctrlKey)
//         api.selectAll()
//       break
//   }
// }
// function onCellFocused({ rowIndex }) {
//   const node = gridApi.value.api.getDisplayedRowAtIndex(rowIndex)
//   if (node) {
//     node.setSelected(true, true)
//   }
// }
</script>

<template>
  <AgGridVue
    ref="gridApi"
    style="height: 85vh; width: 100%"
    v-bind="$attrs"
    row-model-type="clientSide"
    row-selection="multiple"
    :navigate-to-next-cell="navigateToNextCell"
    :row-class-rules
    :class="color"
    :get-context-menu-items
    :components="{ gridToolPanel }"
    :side-bar="toolPanel"
    :side-bar-params="{ toolPanels: ['custom'] }"
    :default-col-def="defaultColDef"
    :get-row-id="getRowId"
    :on-grid-ready="onGridReady"
    :grid-options="defaultGridOptions"
    :suppress-row-deselection="false"
    :suppress-row-click-selection="false"
    :suppress-cell-focus="false"
    :suppress-row-hover-highlight="true"
    :suppress-header-focus="true"
    :suppress-copy-rows-to-clipboard="true"
    :pagination="true"
    :pagination-page-size="100"
    :pagination-page-size-selector="[10, 100, 1000]"
    :pagination-auto-page-size="false"
    :locale-text="AG_GRID_LOCALE_PT_BR"
    @row-data-updated="onRowDataUpdated"
  />
</template>

<style>
.custom-row-alert {
  color: rgb(255, 150, 150);
}
.custom-row-disable {
  color: rgb(150, 150, 150);
}
.ag-theme-quartz, .ag-theme-quartz-dark {
    --ag-grid-size: 6px;
    --ag-list-item-height: 20px;
}
</style>
