<script lang="ts" setup>
// import { ref } from 'vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.min.css'
import { AgGridVue } from 'ag-grid-vue3'
import type { GridOptions } from 'ag-grid-community'
import { LicenseManager } from 'ag-grid-enterprise'
import { AG_GRID_LOCALE_PT_BR } from '@/locales/grid'

LicenseManager.setLicenseKey(
  'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-051714}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Genesis_Tecnologia}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Clinux}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{Clinux}_need_to_be_licensed___{Clinux}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{1_January_2025}____[v3]_[0102]_MTczNTY4OTYwMDAwMA==3be157b75b26c094fd0faf3609d46ba5'
)

// defineProps({
//   rowData: {
//     type: Array,
//     required: true
//   },
//   columnDefs: {
//     type: Array,
//     required: true
//   }
// })

const colorMode = useColorMode()
const color = ref(null)
const getColor = () => {
  return colorMode.value === 'dark' ? 'ag-theme-balham-dark' : 'ag-theme-balham'
}
watch(colorMode, () => {
  color.value = getColor()
})
onMounted(() => {
  color.value = getColor()
})
// const color = computed(() => {
//   return colorMode.value === 'dark' ? 'ag-theme-balham-dark' : 'ag-theme-balham'
// })

const gridApi = ref()
const rowSelection = ref('multiple')
const suppressRowClickSelection = ref(true)
const rowCount = ref(0)
const rowStatus = ref('')
const columnTypes = ref(null)

const defaultGridOptions: GridOptions = {
  suppressHorizontalScroll: false,
  alwaysShowVerticalScroll: true,
  autoSizeStrategy: {
    type: 'fitCellContents'
  }
}

const currencyFormatter = p =>
  parseFloat(p.value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

const fieldCurrency = {
  filter: 'agNumberColumnFilter',
  type: 'numericColumn',
  aggFunc: 'sum',
  valueFormatter: currencyFormatter
}

const fieldNumber = {
  filter: 'agNumberColumnFilter',
  type: 'numericColumn',
  cellRenderer: 'agAnimateShowChangeCellRenderer',
  aggFunc: 'sum'
}

const fieldDate = {
  filter: 'agDateColumnFilter',
  valueFormatter: p => new Date(p.value).toLocaleDateString('pt-BR')
}

const defaultColDef = ref({
  flex: 1,
  minWidth: 100,
  editable: false,
  filter: true,
  enableRowGroup: false,
  enableCellChangeFlash: true
})

const isFirstColumn = (params) => {
  const displayedColumns = params.api.getAllDisplayedColumns()
  const thisIsFirstColumn = displayedColumns[0] === params.column
  return thisIsFirstColumn
}

const convertToNativeDate = (inputDate) => {
  const parts = inputDate.split('/')
  return new Date(parts[2], parts[1] - 1, parts[0])
}

const getRowId = ({ data }) => Object.values(data)[0]

onBeforeMount(() => {
  columnTypes.value = {
    currency: {
      width: 150,
      filter: 'agNumberColumnFilter',
      valueFormatter: currencyFormatter
    },
    shaded: {
      cellClass: 'shaded-class'
    }
  }
})

const onGridReady = () => {
  console.log('Grid is ready', gridApi.value.api)
  gridApi.value.api.closeToolPanel()
}

defineExpose({
  gridApi,
  rowSelection,
  suppressRowClickSelection,
  rowCount,
  rowStatus,
  columnTypes,
  currencyFormatter,
  fieldCurrency,
  fieldNumber,
  fieldDate,
  defaultColDef,
  isFirstColumn,
  convertToNativeDate,
  onGridReady
})
</script>

<template>
  <AgGridVue
    ref="gridApi"
    style="height: 78vh; width: 100%"
    v-bind="$attrs"
    row-model-type="clientSide"
    :class="color"
    row-selection="multiple"
    :side-bar="true"
    :side-bar-params="{ toolPanels: ['columns'] }"
    :default-col-def="defaultColDef"
    :get-row-id="getRowId"
    :on-grid-ready="onGridReady"
    :grid-options="defaultGridOptions"
    :suppress-row-click-selection="false"
    :pagination="true"
    :pagination-page-size="100"
    :pagination-page-size-selector="[10, 100, 1000]"
    :pagination-auto-page-size="false"
    :locale-text="AG_GRID_LOCALE_PT_BR"
  />
</template>
