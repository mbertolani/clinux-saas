<script lang="ts" setup>
// import { ref } from 'vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.min.css'
import { AgGridVue } from 'ag-grid-vue3'
import type { GridOptions } from 'ag-grid-community'
import { LicenseManager } from 'ag-grid-enterprise'
import gridToolPanel from './gridToolPanel.vue'
import { AG_GRID_LOCALE_PT_BR } from '@/locales/grid'

LicenseManager.setLicenseKey(
  useRuntimeConfig().public.aggridKey
)
const props = defineProps({
  http: {
    type: Object,
    required: true
  }
})

const gridApi = ref()

defineExpose({
  gridApi
})

const colorMode = useColorMode()
const color = ref(null)
const getColor = () => {
  return colorMode.value === 'dark' ? 'ag-theme-quartz-auto-dark' : 'ag-theme-quartz'
}
watch(colorMode, () => {
  color.value = getColor()
})
onMounted(() => {
  color.value = getColor()
})

// const gridSideBar = ref(true)
const rowSelection = ref('multiple')

// const computedSideBar = computed(() => {
//   return gridSideBar.value ? toolPanel.value : null
// })
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

// const isFirstColumn = (params) => {
//   const displayedColumns = params.api.getAllDisplayedColumns()
//   const thisIsFirstColumn = displayedColumns[0] === params.column
//   return thisIsFirstColumn
// }

const getRowId = ({ data }) => Object.values(data)[0]

const onGridReady = () => {
  gridApi.value.api.closeToolPanel()
  restoreColumnState()
}
const onFirstDataRendered = () => {

}
const onRowDataUpdated = ({ api }) => {
  api.ensureNodeVisible(api.getSelectedNodes()[0], 'middle')
}
const saveColumnState = () => {
  const state = gridApi.value.api.getColumnState()
  props.http.gridState(state)
}
const restoreColumnState = async () => {
  const savedState = await props.http.gridState()
  if (savedState) {
    if (!gridApi.value.api) {
      useToast().add({ title: 'Grid não carregado', color: 'red' })
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
  // gridApi.value.api.applyColumnState({ state: [] })
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
defineShortcuts({
  ctrl_a: {
    handler: () => { gridApi.value.api.selectAll() }
  }
})

const menu = await props.http.menu()
const toolPanel = ref(null)

toolPanel.value = {
  toolPanels: [
    {
      id: 'custom',
      labelDefault: 'Funções',
      labelKey: 'custom',
      iconKey: 'menu',
      toolPanel: 'gridToolPanel',
      toolPanelParams: { menu }
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
</script>

<template>
  <AgGridVue
    ref="gridApi"
    style="height: 85vh; width: 100%"
    v-bind="$attrs"
    row-model-type="clientSide"
    :class="color"
    :row-selection
    :get-context-menu-items
    :components="{ gridToolPanel }"
    :side-bar="toolPanel"
    :side-bar-params="{ toolPanels: ['custom'] }"
    :default-col-def="defaultColDef"
    :get-row-id="getRowId"
    :on-grid-ready="onGridReady"
    :on-first-data-rendered="onFirstDataRendered"
    :grid-options="defaultGridOptions"
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
