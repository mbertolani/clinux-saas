<script setup lang="ts">
import { ModalDelete, ModalLog } from '#components'
import type { ActionMenuItem } from '~/types/grid'
import { StrToNull } from '~/utils/schema'

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
  actionMenu: {
    type: Array as () => ActionMenuItem[],
    required: false,
    default: () => ([])
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
  },
  actionDelete: {
    type: Function,
    required: false
  }
})

defineExpose({
  getSelectedNodes: () => {
    return apiGrid.value.getSelectedNodes()
  },
  applyTransaction: (transaction) => {
    apiGrid.value.applyTransaction(transaction)
  },
  applyFilter: () => {
    props.controller.getView(StrToNull(props.filter))
    apiGrid.value?.selectFirst()
  }
})

const emit = defineEmits(['openForm'])

const apiGrid = ref(null)
const rowData = ref([])
const columnDefs = ref([])
const menu = ref(null)
const modal = useModal()
const { showError, showMessage } = useMessage()

rowData.value = (!props.filter) ? await props.controller.getView(StrToNull(props.filter)) : await props.controller.getAll()
columnDefs.value = await props.controller.getGrid()
columnDefs.value = columnDefs.value.concat(props.appendColumnDefs)
columnDefs.value = columnDefs.value.map((column) => {
  return (props.mergeColumnDefs[column.field]) ? Object.assign(column, props.mergeColumnDefs[column.field]) : column
})
menu.value = await props.controller.getMenu()
menu.value = menu.value?.map((item) => {
  const actionItem: ActionMenuItem = props.actionMenu.find(action => action.name === item.name)
  if (actionItem) {
    item.action = actionItem.action
  }
  return item
})
if (!menu.value?.length) {
  menu.value = props.actionMenu
}
const buttonSearch = async () => {
  !props.filter ? await props.controller.getAll() : await props.controller.getView(StrToNull(props.filter))
  apiGrid.value?.selectFirst()
}
const actionEdit = async (id: number) => {
  emit('openForm', id)
}
const buttonNew = () => {
  emit('openForm', 0)
}
const buttonEdit = () => {
  const selectedNode = apiGrid.value.getSelectedNodes()[0]?.id
  if (selectedNode) {
    actionEdit(selectedNode)
  } else {
    showError('Nenhum registro selecionado')
  }
}
const buttonDelete = async () => {
  if (!apiGrid.value.getSelectedNodes().length) {
    showError('Nenhum registro selecionado')
    return
  }
  if (props.actionDelete) {
    return await props.actionDelete()
  }
  modal.open(ModalDelete, {
    count: apiGrid.value.getSelectedNodes().length,
    async onSuccess() {
      const selectedNodes = apiGrid.value.getSelectedNodes()
      const removedNodes = []
      await Promise.all(selectedNodes.map(async (node) => {
        await props.controller.remove(node.id)
        if (props.controller.status.value) {
          removedNodes.push(node.data)
          showMessage(`Registro [${node.id}] excluído com sucesso !`)
        } else {
          showError(JSON.stringify(props.controller.errors.value.error))
        }
      }))
      modal.close()
      apiGrid.value.applyTransactionDelete(removedNodes)
    },
    onClose() {
      modal.close()
    }
  })
}
const buttonLog = async () => {
  const selectedNode = apiGrid.value.getSelectedNodes()[0]
  if (!selectedNode) {
    showError('Nenhum registro selecionado')
    return
  }
  modal.open(ModalLog, {
    rowData: await props.controller.getLog(selectedNode.id),
    onClose() {
      modal.close()
    }
  })
}
const onRowDoubleClicked = async params => actionEdit(params.node.id)

const onCellKeyDown = ({ event, api }) => {
  switch (event.key) {
    case 'Insert':
      console.log('Insert')
      buttonNew()
      break
    case 'Delete':
      console.log('Delete')
      buttonDelete()
      break
    case 'Enter':
      console.log('Enter')
      buttonEdit()
      break
    case 'a':
    case 'A':
      console.log('Ctrl + A')
      if (event.ctrlKey)
        api.selectAll()
      break
  }
}

// defineShortcuts({
//   insert: {
//     handler: () => { buttonNew() }
//   },
//   delete: {
//     handler: () => { buttonDelete() }
//   },
//   enter: {
//     handler: () => { buttonEdit() }
//   }
// })
const inputSearch = ref('')
watch(inputSearch, () => {
  apiGrid.value?.applyFilterChanged(inputSearch.value)
})
</script>

<template>
  <UPage class="mx-4">
    <UPageHeader
      :title="header.title"
      headline=""
      :ui="{ strategy: 'override', wrapper: 'relative border-b border-gray-200 dark:border-gray-800 py-2' }"
      :links="[
        { label: 'Pesquisar', icon: 'i-heroicons-magnifying-glass', click: buttonSearch },
        { label: 'Incluir', icon: 'i-heroicons-plus-20-solid', click: buttonNew },
        { label: 'Editar', icon: 'i-heroicons-pencil-20-solid', click: buttonEdit },
        { label: 'Apagar', icon: 'i-heroicons-trash-20-solid', click: buttonDelete },
        { label: 'Log', icon: 'i-heroicons-question-mark-circle', click: buttonLog }
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
      <div
        v-if="$slots.filter"
        class="mt-2"
      >
        <slot name="filter" />
      </div>
    </UPageHeader>
    <UPageBody class="mt-2">
      <BaseGrid
        ref="apiGrid"
        :row-data
        :column-defs
        :on-row-double-clicked="onRowDoubleClicked"
        :on-cell-key-down="onCellKeyDown"
        :row-class-rules
        :http="props.controller"
        :menu
      />
    </UPageBody>
    <slot name="form" />
  </UPage>
</template>
