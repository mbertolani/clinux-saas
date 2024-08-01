<script setup lang="ts">
const props = defineProps({
  header: {
    type: Object,
    required: true
  },
  controller: {
    type: Object,
    required: false
  },
  rowClassRules: {
    type: Object,
    default: null
  },
  filter: {
    type: Object,
    required: false
  },
  filterDate: {
    type: Object,
    default: () => ({
      dt_de: useDateFormat(new Date(), 'YYYY-MM-DD').value,
      dt_ate: useDateFormat(new Date(), 'YYYY-MM-DD').value
    })
  },
  appendColumnDefs: {
    type: Array,
    required: false,
    default: () => []
  },
  mergeColumnDefs: {
    type: Object,
    required: false,
    default: () => ({})
  }
})
const emit = defineEmits(['submit'])
const apiGrid = ref(null)
const rowData = ref([])
const columnDefs = ref([])
// const { loadUser } = useRouterStore()
// const { api, items: rowData, grid: columnDefs } = props.controller
const inputSearch = ref({ text: '', dt_de: props.filterDate?.dt_de, dt_ate: props.filterDate?.dt_ate })
watch(inputSearch, () => {
  apiGrid.value?.applyFilterChanged(inputSearch.value.text)
})
const setColumnDefs = async () => {
  const columns = await props.controller.getGrid()
  const appendColumns = columns.concat(props.appendColumnDefs)
  const mergedColumns = appendColumns.map((column) => {
    return (props.mergeColumnDefs[column.field]) ? Object.assign(column, props.mergeColumnDefs[column.field]) : column
  })
  return mergedColumns
}
const buttonSearch = async () => {
  // rowData.value = await props.controller.getView(replaceEmptyStringWithNull(props.filter))
  await setRowData()
  apiGrid.value?.selectFirst()
}
const setRowData = async () => {
  const payload = { ...props.filter }
  if (inputSearch.value.dt_de)
    payload.dt_de = inputSearch.value.dt_de
  if (inputSearch.value.dt_ate)
    payload.dt_ate = inputSearch.value.dt_ate
  rowData.value = (props.filter || props.filterDate) ? await props.controller.getView(StrToNull(payload)) : await props.controller.getAll()
}
const onSubmit = async (...args) => {
  emit('submit', ...args)
}
// const [_rowData, _columnDefs] = await Promise.all([setRowData(), setColumnDefs()])
// rowData.value = _rowData
// columnDefs.value = _columnDefs
columnDefs.value = await setColumnDefs()
</script>

<template>
  <UPage class="mx-4">
    <UPageHeader
      :title="header.title"
      :headline="header.title"
      :ui="{ strategy: 'override', wrapper: 'relative border-b border-gray-200 dark:border-gray-800 py-2' }"
      :links="[
        { label: 'Pesquisar', icon: 'i-heroicons-magnifying-glass', click: buttonSearch }
      ]"
    >
      <template #icon>
        <icon
          :name="header.icon"
          size="36px"
        />
      </template>
      <template #title>
        <!-- <UInput
          v-model="inputSearch"
          placeholder="Pesquisa..."
          icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off"
          input-class="uppercase"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="inputSearch !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="inputSearch = ''"
            />
          </template>
        </UInput> -->
        <FormKit
          v-model="inputSearch"
          type="form"
          :actions="false"
          @submit="onSubmit()"
        >
          <div class="flex flex-wrap gap-2">
            <FormKit
              v-if="'dt_de' in filterDate"
              type="datepicker"
              name="dt_de"
              value-format="YYYY-MM-DD"
              class="flex-col"
            />
            <FormKit
              v-if="'dt_ate' in filterDate"
              type="datepicker"
              name="dt_ate"
              value-format="YYYY-MM-DD"
              class="flex-col"
            />
            <FormKit
              type="search"
              prefix-icon="search"
              name="text"
              class="flex-col w-full"
              placeholder="Pesquisa..."
            />
          </div>
        </FormKit>
      </template>
      <slot name="filter" />
    </UPageHeader>
    <UPageBody class="mt-0">
      <BaseGrid
        ref="apiGrid"
        :row-data
        :column-defs
        :row-class-rules
        :http="controller"
      />
      <slot />
    </UPageBody>
  </UPage>
</template>
