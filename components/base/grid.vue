<script lang="ts" setup>
import gridToolPanel from './gridToolPanel.vue'

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

const handleGrid = () => {
  return gridApi.value?.coreApi.api
}

const gridApi = ref()

const gotoPage = (node) => {
  const pageSize = handleGrid().paginationGetPageSize()
  const rowIndex = handleGrid().getRowNode(node.id).rowIndex
  const pageNumber = Math.floor(rowIndex / pageSize)
  handleGrid().paginationGoToPage(pageNumber)
}

const applyTransaction = (transaction) => {
  const response = handleGrid().applyTransaction(transaction)
  response.add.forEach((node) => {
    node.setSelected(true, true)
    gotoPage(node)
  })
}

const applyTransactionDelete = (transaction) => {
  if (!transaction.length)
    return
  const remove = handleGrid().applyTransaction({
    remove: transaction
  }).remove
  const rowIndex = remove[0].childIndex
  const rowLast = handleGrid().getLastDisplayedRowIndex()
  const nodeToSelect = handleGrid().getDisplayedRowAtIndex(rowIndex > rowLast ? rowLast : rowIndex)
  if (nodeToSelect) {
    nodeToSelect.setSelected(true, true)
  }
}

const getSelectedNodes = () => {
  return handleGrid().getSelectedNodes()
}
const selectFirst = () => {
  handleGrid()?.getDisplayedRowAtIndex(0)?.setSelected(true)
}

defineExpose({
  selectFirst,
  applyFilterChanged,
  applyTransaction,
  applyTransactionDelete,
  getSelectedNodes
})

const defaultColDef = ref({
  // flex: 1,
  // minWidth: 100,
  editable: false,
  filter: true,
  enableRowGroup: false,
  enableCellChangeFlash: true
})

const getRowId = ({ data }) => String(Object.values(data)[0])

const onGridReady = async ({ api }) => {
  await restoreColumnState()
  api.getDisplayedRowAtIndex(0)?.setSelected(true, true)
  api.closeToolPanel()
}

const onRowDataUpdated = ({ api }) => {
  (api.getSelectedNodes().length === 0)
    ? api.getDisplayedRowAtIndex(0)?.setSelected(true)
    : api.ensureNodeVisible(api.getSelectedNodes()[0], 'middle')
}
const saveColumnState = () => {
  const state = handleGrid().getColumnState()
  props.http?.getState(state)
}
const restoreColumnState = async () => {
  const savedState = await props.http?.getState()
  if (savedState) {
    if (!handleGrid()) {
      useMessage().showError('Grid não carregado')
      return
    }
    handleGrid()?.applyColumnState({
      state: savedState,
      applyOrder: true
    })
  }
}
const autoSizeColumn = (skipHeader: boolean) => {
  const allColumnIds = []
  handleGrid().getColumns().forEach((column) => {
    allColumnIds.push(column.getId())
  })
  handleGrid().autoSizeColumns(allColumnIds, skipHeader)
}
const gridSizeColumn = () => {
  handleGrid().sizeColumnsToFit()
}
const gridResetColumn = () => {
  handleGrid().resetColumnState()
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
//     handler: () => { handleGrid().selectAll() }
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
const customMenu = props.menu.length
  ? {
      id: 'custom',
      labelDefault: 'Funções',
      labelKey: 'custom',
      iconKey: 'menu',
      toolPanel: 'gridToolPanel',
      toolPanelParams: { menu: props.menu }
    }
  : null
toolPanel.value = {
  toolPanels: [
    { ...customMenu },
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
  handleGrid().setGridOption('quickFilterText', payload)
}

// function navigateToNextCell(params: NavigateToNextCellParams): CellPosition | null {
//   const suggestedNextCell = params.nextCellPosition

//   const KEY_UP = 'ArrowUp'
//   const KEY_DOWN = 'ArrowDown'

//   const noUpOrDownKey = params.key !== KEY_DOWN && params.key !== KEY_UP
//   if (noUpOrDownKey || !suggestedNextCell) {
//     return suggestedNextCell
//   }

//   const nodeToSelect = params.api.getDisplayedRowAtIndex(suggestedNextCell.rowIndex)
//   if (nodeToSelect) {
//     nodeToSelect.setSelected(true, true)
//   }

//   return suggestedNextCell
// }
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
//   const node = handleGrid().getDisplayedRowAtIndex(rowIndex)
//   if (node) {
//     node.setSelected(true, true)
//   }
// }
</script>

<template>
  <BaseGridCore
    ref="gridApi"
    style="height: 85vh; width: 100%"
    row-model-type="clientSide"
    row-selection="multiple"
    :row-class-rules
    :get-context-menu-items
    :components="{ gridToolPanel }"
    :side-bar="toolPanel"
    :side-bar-params="{ toolPanels: ['custom'] }"
    :default-col-def="defaultColDef"
    :get-row-id="getRowId"
    :on-grid-ready="onGridReady"
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
    @row-data-updated="onRowDataUpdated"
  />
</template>

<!-- <style>
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
</style> -->
