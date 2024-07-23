<script lang="ts" setup>
const props = defineProps({
  gridHeader: {
    type: Array,
    required: false
  },
  gridData: {
    type: Object,
    required: false
  }
})

function generateData(data, header) {
  return header.map(column => ({
    label: column.headerName,
    value: column.valueFormatter
      ? column.valueFormatter({ value: data[column.field] })
      : data[column.field]
  })).filter(row => row.value)
}

const rowData = generateData(props.gridData, props.gridHeader)

const emit = defineEmits(['close'])
const columnDefs = [
  {
    field: 'label',
    headerName: 'Campo',
    width: 68
  },
  {
    field: 'value',
    headerName: 'Descrição',
    cellDataType: 'text'
  }
]

const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}
</script>

<template>
  <BaseForm
    title="Atendimento"
    @close="emit('close')"
  >
    <BaseGridCore
      style="height: 100vh; width: 100%;"
      :column-defs
      :row-data
      :pagination="false"
      @first-data-rendered="onFirstDataRendered"
    />
  </BaseForm>
</template>
