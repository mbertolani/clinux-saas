<script setup lang="ts">
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

const props = defineProps({
  header: {
    type: Object,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  }
})
defineEmits(['update:title', 'update:description'])
defineExpose({
})

// const { columnDefs, rowData } = useGrid()
// const { getAll, items } = useEmpresaStore()
// const columnDefs = ref(null)
// const dataGrid = await useEmpresaStore().api.grid()
// columnDefs.value = useGrid().columnDefs.value
// console.log(columnDefs.value)
const columnDefs = ref(null)
const rowData = ref(null)
// const { DbGridColumns, getColumns, convertData } = useGrid()
// columnDefs.value = await getColumns(props.endpoint)

// console.log(columnDefs.value)
const { api, items, grid } = useEmpresa()
// await api.getAll()
// columnDefs.value = await api.getColumns()
// console.log(items.value)
// const response = await api.getGrid()
// console.log(response, api.cols)
await api.getAll()
await api.getGrid()
rowData.value = items.value
columnDefs.value = grid.value

const onSelectionChanged = (event) => {
  console.log(event.api.getSelectedRows())
}
</script>

<template>
  <UPage class="mx-4">
    <UPageHeader
      title=""
      :description="props.header.title"
    >
      <BaseFilter />
    </UPageHeader>

    <UPageBody class="mt-0">
      <BaseGrid
        :side-bar="true"
        :endpoint="props.endpoint"
        :row-data="rowData"
        :column-defs="columnDefs"
        :on-selection-changed="onSelectionChanged"
      />
      <BaseForm />
    </UPageBody>

    <!-- <template
      #right
    >
      Right
    </template>
    <template
      #left
    >
      Left
    </template> -->
  </UPage>
</template>
