<script setup>
// import { ref } from 'vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.min.css'
import { AgGridVue } from 'ag-grid-vue3'
import { LicenseManager } from 'ag-grid-enterprise'

LicenseManager.setLicenseKey(
  'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-051714}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Genesis_Tecnologia}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Clinux}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{Clinux}_need_to_be_licensed___{Clinux}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{1_January_2025}____[v3]_[0102]_MTczNTY4OTYwMDAwMA==3be157b75b26c094fd0faf3609d46ba5'
)

const topGrid = ref()
const bottomGrid = ref()
const topGridOptions = ref(null)
const bottomGridOptions = ref(null)
const topData = ref(null)
const bottomData = ref(null)
const columnDefs = ref(null)
const rowStyle = { fontWeight: 'bold' }

const colorMode = useColorMode()

const color = computed(() =>
  colorMode.value === 'dark' ? 'ag-theme-balham-dark' : 'ag-theme-balham'
)

// const { data } = await useFetch('https://www.ag-grid.com/example-assets/olympic-winners.json')

// An example of using with promise all
const { data } = await useAsyncData(
  // , error, execute, pending, refresh, status
  'post-card',
  async () => {
    const [rows, posts, users, comments] = await Promise.all([
      $fetch('https://www.ag-grid.com/example-assets/olympic-winners.json'),
      $fetch('https://jsonplaceholder.typicode.com/posts'),
      $fetch('https://jsonplaceholder.typicode.com/users'),
      $fetch('https://jsonplaceholder.typicode.com/comments')
    ])
    return { rows, posts, users, comments }
  }
)

onMounted(() => {
  topData.value = data.value.rows
  calculateSum(topData.value)
})

topGridOptions.value = {
  // alignedGrids: () => [bottomGrid],
  defaultColDef: {
    filter: true,
    flex: 1,
    minWidth: 100
  },
  suppressHorizontalScroll: true,
  alwaysShowVerticalScroll: true,
  autoSizeStrategy: {
    type: 'fitCellContents'
  }
}
bottomGridOptions.value = {
  // alignedGrids: () => [topGrid],
  // alwaysShowVerticalScroll: true
  suppressHorizontalScroll: true
}

columnDefs.value = [
  { field: 'athlete', width: 200 },
  { field: 'age', width: 150 },
  { field: 'country', width: 150 },
  { field: 'year', width: 120 },
  { field: 'date', width: 150 },
  { field: 'sport', width: 150 },
  {
    headerName: 'Total',
    colId: 'total',
    valueGetter: 'data.gold + data.silver + data.bronze',
    width: 200,
    type: 'numericColumn'
  },
  { field: 'gold', width: 100, type: 'numericColumn' },
  { field: 'silver', width: 100, type: 'numericColumn' },
  { field: 'bronze', width: 100, type: 'numericColumn' }
]

const calculateSum = (data) => {
  const sum = {}
  data.forEach((row) => {
    Object.keys(row).forEach((key) => {
      // console.log(row, key);
      if (
        columnDefs.value.find(
          col => col.field === key && col.type === 'numericColumn'
        )
      ) {
        sum[key] = (sum[key] || 0) + row[key]
      }
      // return;
    })
  })
  // sum.athlete = 'Total'
  bottomData.value = [sum]
}
const onGridReady = () => {}
</script>

<template>
  <div>
    <AgGridVue
      ref="topGrid"
      style="height: 78vh; width: 100%"
      :class="color"
      :on-grid-ready="onGridReady"
      :aligned-grids="() => [bottomGrid]"
      :grid-options="topGridOptions"
      :column-defs="columnDefs"
      :row-data="topData"
      :pagination="true"
      :pagination-page-size="100"
      :pagination-page-size-selector="[10, 100, 1000]"
      :pagination-auto-page-size="false"
    />
    <AgGridVue
      ref="bottomGrid"
      style="height: 60px"
      :class="color"
      :grid-options="bottomGridOptions"
      :aligned-grids="() => [topGrid]"
      :header-height="0"
      :column-defs="columnDefs"
      :row-data="bottomData"
      :row-style="rowStyle"
    />
  </div>
</template>

<style>
.top .ag-root-wrapper {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.bottom .ag-root-wrapper {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
