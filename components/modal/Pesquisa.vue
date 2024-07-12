<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  api: {
    type: Function,
    required: false
  }
})
// function getFieldList(list) {
//   return list
//     ? list.map((result) => {
//       return getFieldItem(result)
//     })
//     : []
// }
// function getFieldItem(item) {
//   return item
//     ? {
//         id: Object.values(item)[0],
//         label: Object.values(item)[1]
//       }
//     : {}
// }
const emit = defineEmits(['cancel', 'submit'])
const rowData = ref()
rowData.value = getFieldList(props.data)
const columnDefs = [
  { field: 'label', headerName: 'Descrição', width: 400 }
]
const gridOptions = {
  suppressHorizontalScroll: true,
  autoSizeStrategy: {
    type: 'fitGridWidth'
  }
}
const onRowDoubleClicked = (params) => {
  emit(params.node.data.value ? 'submit' : 'cancel', params.node.data.value, params.node.data)
}
// const onInputKeyDown = (event) => {
//   if (event.key === 'Enter') {
//     const selected = gridRef.value?.coreApi?.api.getDisplayedRowAtIndex(0)
//     if (selected) {
//       emit('submit', selected.data.id, selected.data)
//     }
//   }
// }
// @keydown.enter="onInputKeyDown"
const onCellKeyDown = ({ event }) => {
  if (event.key === 'Enter') {
    const selected = gridRef.value?.coreApi?.api.getSelectedNodes()[0]
    if (selected) {
      emit('submit', selected.data.value, selected.data)
    }
  }
}
const gridRef = ref()
const inputSearch = ref('')
watch(inputSearch, () => {
  gridRef.value?.applyFilterChanged(inputSearch.value)
})
const apiSearch = async (event) => {
  if (event.key === 'Enter') {
    if (props.api) {
      rowData.value = getFieldList(await props.api(inputSearch.value, 'cd_paciente', 'ds_paciente'))
    }
  }
}
</script>

<template>
  <UModal
    :ui="{
      width: 'sm:max-w-xl md:max-w-2xl'
    }"
  >
    <UInput
      v-model="inputSearch"
      :placeholder="title"
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      input-class="uppercase"
      class="py-2 px-2"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      @keydown="apiSearch"
    />
    <BaseGridCore
      ref="gridRef"
      style="height: 400px; width: 100%;"
      :column-defs
      :row-data
      :pagination="false"
      :grid-options
      :on-row-double-clicked="onRowDoubleClicked"
      :on-cell-key-down="onCellKeyDown"
      class="pb-2 px-2"
    />
  </UModal>
</template>
