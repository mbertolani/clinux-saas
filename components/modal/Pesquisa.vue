<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
function getFieldList(list) {
  return list
    ? list.map((result) => {
      return getFieldItem(result)
    })
    : []
}
function getFieldItem(item) {
  return item
    ? {
        id: Object.values(item)[0],
        label: Object.values(item)[1]
      }
    : {}
}
const emit = defineEmits(['cancel', 'submit'])
const rowData = getFieldList(props.data)
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
  (params.node.id)
    ? emit('submit', params.node.id)
    : emit('cancel')
}
const onKeyDown = (event) => {
  if (event.key === 'Enter') {
    const selected = gridRef.value?.coreApi?.api.getDisplayedRowAtIndex(0)
    if (selected) {
      emit('submit', selected.data.id)
    }
  }
}
const gridRef = ref()
const inputSearch = ref('')
watch(inputSearch, () => {
  gridRef.value?.applyFilterChanged(inputSearch.value)
})
</script>

<template>
  <UModal
    :ui="{
      width: 'sm:max-w-xl md:max-w-2xl'
    }"
  >
    <UInput
      v-model="inputSearch"
      placeholder="Pesquisa..."
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      input-class="uppercase"
      class="py-2 px-2"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      @keydown.enter="onKeyDown"
    />
    <BaseGridCore
      ref="gridRef"
      style="height: 400px; width: 100%;"
      :column-defs
      :row-data
      :pagination="false"
      :grid-options
      :on-row-double-clicked="onRowDoubleClicked"
      class="pb-2 px-2"
    />
  </UModal>
</template>
