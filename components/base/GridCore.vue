<script lang="ts" setup>
// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-quartz.min.css'
import { AgGridVue } from 'ag-grid-vue3'
import type { GridOptions, CellPosition, NavigateToNextCellParams } from 'ag-grid-community'
import { LicenseManager } from 'ag-grid-enterprise'
import { AG_GRID_LOCALE_PT_BR } from '@/locales/grid'

LicenseManager.setLicenseKey(
  useRuntimeConfig().public.aggridKey
)
const props = defineProps({
  rowClassRules: {
    type: Object,
    default: null
  },
  gridOptions: {
    type: Object,
    default: () => ({})
  }
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
const defaultGridOptions: GridOptions = props.gridOptions || {
  suppressHorizontalScroll: false,
  alwaysShowVerticalScroll: false,
  autoSizeStrategy: {
    type: 'fitCellContents'
  }
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
const selectFirst = () => {
  coreApi.value.getDisplayedRowAtIndex(0)?.setSelected(true)
}
const coreApi = ref(null)
defineExpose({
  coreApi,
  selectFirst
})
</script>

<template>
  <AgGridVue
    ref="coreApi"
    row-model-type="clientSide"
    row-selection="multiple"
    :class="color"
    :navigate-to-next-cell="navigateToNextCell"
    :row-class-rules
    :grid-options="defaultGridOptions"
    :suppress-row-deselection="false"
    :suppress-row-click-selection="false"
    :suppress-cell-focus="false"
    :suppress-row-hover-highlight="true"
    :suppress-header-focus="true"
    :suppress-copy-rows-to-clipboard="true"
    :pagination="true"
    :pagination-page-size="25"
    :pagination-page-size-selector="[10, 25, 50, 100, 1000]"
    :pagination-auto-page-size="false"
    :locale-text="AG_GRID_LOCALE_PT_BR"
  />
</template>

<style>
.custom-row-alert {
  color: rgb(255, 150, 150);
}
.custom-row-disable {
  color: rgb(150, 150, 150);
}
.ag-theme-quartz, .ag-theme-quartz-auto-dark {
    --ag-grid-size: 6px;
    --ag-list-item-height: 20px;
}
</style>
