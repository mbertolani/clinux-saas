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
function replaceEmptyStringWithNull(obj) {
  for (const key in obj) {
    if (obj[key] === '') {
      obj[key] = null
    }
  }
  return obj
}
const apiGrid = ref(null)
// const { loadUser } = useRouterStore()
// const { api, items: rowData, grid: columnDefs } = props.controller
const inputSearch = ref('')
watch(inputSearch, () => {
  apiGrid.value?.applyFilterChanged(inputSearch.value)
})
const setColumnDefs = async () => {
  const columns = await props.controller.getGrid()
  const appendColumns = columns.concat(props.appendColumnDefs)
  const mergedColumns = appendColumns.map((column) => {
    return (props.mergeColumnDefs[column.field]) ? Object.assign(column, props.mergeColumnDefs[column.field]) : column
  })
  return mergedColumns
}
const rowData = ref()
const columnDefs = ref([])
columnDefs.value = await setColumnDefs()
const buttonSearch = async () => {
  rowData.value = await props.controller.getView(replaceEmptyStringWithNull(props.filter))
  apiGrid.value?.selectFirst()
}
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
        <UInput
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
        </UInput>
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
