<script setup lang="ts">
import { ModalDelete, ModalLog } from '#components'
// import type { ActionMenuItem } from '~/types/grid'
import { Messages } from '~/types/system'
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
    type: Array,
    required: false,
    default: () => []
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

const selectedData = () => {
  return selectedNode()?.data
}
const selectedNode = () => {
  const node = apiGrid.value.getSelectedNodes()[0]
  if (!node) {
    useMessage().showError()
    return null
  }
  return node
}
const selectedId = () => {
  return Number(selectedNode()?.id)
}

defineExpose({
  selectedId,
  selectedData,
  selectedNode,
  getSelectedNodes: () => {
    return apiGrid.value.getSelectedNodes()
  },
  applyTransaction: (transaction) => {
    apiGrid.value.applyTransaction(transaction)
  },
  applyFilter: () => {
    props.controller.getView(StrToNull(props.filter))
    apiGrid.value?.selectFirst()
  },
  applySearch: () => {
    buttonSearch()
  }
})

const emit = defineEmits(['openForm', 'selectionChanged'])

const apiGrid = ref(null)
const rowData = ref([])
const columnDefs = ref([])
// const menu = ref(null)
const modal = useModal()
const { showError, showMessage } = useMessage()

const setRowData = async () => {
  return (props.filter) ? await props.controller.getView(StrToNull(props.filter)) : await props.controller.getAll()
}
const setColumnDefs = async () => {
  const columns = await props.controller.getGrid()
  const appendColumns = columns.concat(props.appendColumnDefs)
  const mergedColumns = appendColumns.map((column) => {
    return (props.mergeColumnDefs[column.field]) ? Object.assign(column, props.mergeColumnDefs[column.field]) : column
  })
  return mergedColumns
}
// const setMenu = async () => {
//   const menu = [] // await props.controller.getMenu()
//   const remainingActionMenuItems = [...props.actionMenu]

//   const menuAction = menu?.map((item) => {
//     const actionItemIndex = remainingActionMenuItems.findIndex(action => action.name === item.name)
//     if (actionItemIndex !== -1) {
//       // Atualiza a ação do item de menu
//       item.action = remainingActionMenuItems[actionItemIndex].action
//       item.icon = remainingActionMenuItems[actionItemIndex].icon
//       item.title = remainingActionMenuItems[actionItemIndex].title || item.title
//       // Remove o item correspondente de remainingActionMenuItems
//       remainingActionMenuItems.splice(actionItemIndex, 1)
//     }
//     return item
//   }) || []

//   // Concatena os itens restantes de actionMenu que não foram encontrados
//   const result = menuAction.concat(remainingActionMenuItems)
//   return result.length ? result : props.actionMenu
// }
rowData.value = await setRowData()
columnDefs.value = await setColumnDefs()
// menu.value = await setMenu()
const buttonSearch = async () => {
  rowData.value = await setRowData()
  // apiGrid.value?.selectFirst()
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
    showError(Messages.MSG_FNF_GRID)
  }
}
const buttonDelete = async () => {
  if (!apiGrid.value.getSelectedNodes().length) {
    showError(Messages.MSG_FNF_GRID)
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
        const response = await props.controller.remove(node.id)
        if (response) {
          removedNodes.push(node.data)
          showMessage(`Registro [${node.id}] excluído com sucesso !`)
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
    showError(Messages.MSG_FNF_GRID)
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
const onSelectionChanged = () => emit('selectionChanged', selectedData())

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
      <slot name="filter" />
    </UPageHeader>
    <UPageBody class="mt-2">
      <BaseGrid
        ref="apiGrid"
        :row-data
        :column-defs
        :on-row-double-clicked="onRowDoubleClicked"
        :on-cell-key-down="onCellKeyDown"
        :on-selection-changed="onSelectionChanged"
        :row-class-rules
        :http="controller"
        :menu="actionMenu"
      />
    </UPageBody>
    <slot name="form" />
  </UPage>
</template>
