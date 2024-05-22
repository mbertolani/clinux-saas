<script setup>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.min.css'
import { AgGridVue } from 'ag-grid-vue3'
import { LicenseManager } from 'ag-grid-enterprise'

LicenseManager.setLicenseKey(
  'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-051714}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Genesis_Tecnologia}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Clinux}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{Clinux}_need_to_be_licensed___{Clinux}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{1_January_2025}____[v3]_[0102]_MTczNTY4OTYwMDAwMA==3be157b75b26c094fd0faf3609d46ba5'
)

const columnDefs = ref([
  {
    field: 'period',
    chartDataType: 'category',
    headerName: 'Procedimento',
    width: 150
  },
  {
    field: 'recurring',
    chartDataType: 'series',
    headerName: 'Qte'
  },
  {
    field: 'individual',
    chartDataType: 'series',
    headerName: 'Total'
  }
])
const gridApi = ref()
const defaultColDef = ref({
  flex: 1,
  minWidth: 100
})
const popupParent = ref(null)
const chartToolPanelsDef = ref(null)

onBeforeMount(() => {
  popupParent.value = document.body
  chartToolPanelsDef.value = {
    defaultToolPanel: 'settings'
  }
})
// let chartRef;

const onFirstDataRendered = (params) => {
  chartRef = params.api.createRangeChart({
    chartContainer: document.querySelector('#myChart'),
    cellRange: {
      columns: ['period', 'recurring', 'individual']
    },
    chartType: 'groupedColumn'
  })
}
// const updateChart = (chartType) => {
//   gridApi.value.updateChart({
//     type: "rangeChartUpdate",
//     chartId: `${chartRef.chartId}`,
//     chartType,
//   });
// };

const rowData = ref(null)
const onGridReady = (params) => {
  gridApi.value = params.api

  rowData.value = [
    { period: 'Q1 2021', recurring: 485829, individual: 237438 },
    { period: 'Q2 2021', recurring: 512743, individual: 245672 },
    { period: 'Q3 2021', recurring: 521938, individual: 259371 },
    { period: 'Q4 2021', recurring: 535421, individual: 271839 },
    { period: 'Q1 2022', recurring: 558329, individual: 284738 },
    { period: 'Q2 2022', recurring: 572843, individual: 298472 },
    { period: 'Q3 2022', recurring: 589372, individual: 312849 },
    { period: 'Q4 2022', recurring: 601234, individual: 327195 },
    { period: 'Q1 2023', recurring: 615928, individual: 342839 },
    { period: 'Q2 2023', recurring: 628472, individual: 358293 },
    { period: 'Q3 2023', recurring: 642839, individual: 374829 },
    { period: 'Q4 2023', recurring: 657382, individual: 391829 }
  ]

  // params.api.setGridOption("rowData", rowData.value);
}
</script>

<template>
  <AgGridVue
    style="height: 78vh; width: 100%"
    class="ag-theme-balham"
    :row-data="rowData"
    :column-defs="columnDefs"
    :default-col-def="defaultColDef"
    :popup-parent="popupParent"
    :enable-range-selection="true"
    :enable-charts="true"
    :chart-tool-panels-def="chartToolPanelsDef"
    @grid-ready="onGridReady"
    @first-data-rendered="onFirstDataRendered"
  />
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.button-container {
  flex-wrap: wrap;
}

#myGrid {
  flex: 1;
}

#myChart {
  flex: 2;
  min-height: 530px;
}
</style>
