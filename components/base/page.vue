<script setup lang="ts">
// import { FormKitSchema } from '@formkit/vue'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'
import { BaseForm, ModalDelete } from '#components'

const props = defineProps({
  header: {
    type: Object,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  schema: {
    type: Array,
    required: true
  }
})
defineEmits(['update:title', 'update:description'])
defineExpose({
})
const toast = useToast()
const modal = useModal()

async function openCadastro() {
  modal.open(BaseForm, {
    title: props.header.title,
    schema: props.schema,
    data: rowForm.value,
    async onSuccess(data) {
      const novo = !rowForm.value
      if (novo) {
        await api.create(data)
      } else {
        await api.update(Object.values(rowForm.value)[0] as number, data)
      }
      if (api.status.value) {
        modal.close()
        toast.add({
          title: 'Success !',
          id: 'modal-success'
        })
        if (novo) {
          handleGrid().applyTransaction({ add: [item.value] }).add.forEach(node => node.setSelected(true, true))
        } else {
          handleGrid().applyTransaction({ update: [item.value] }).update.forEach(node => node.setSelected(true, true))
        }
      } else {
        toast.add({
          title: 'Error !',
          color: 'red',
          description: JSON.stringify(api.errors.value.error)
        })
      }
    },
    onClose() {
      console.log('Close')
      modal.close()
    }
  })
}
const baseApi = ref(null)
const columnDefs = ref(null)
const rowData = ref(null)
const rowForm = ref(null)
const { api, item, items, grid } = useEmpresa()
await api.getAll()
await api.getGrid()
// const menu = await api.menu()

rowData.value = items.value
columnDefs.value = grid.value
const handleGrid: any = () => baseApi.value?.gridApi.api
const onSelectionChanged = () => {
}
function getFieldName(schema) {
  return schema.map(item => item.name).join(',')
}
const onRowDoubleClicked = async params => actionEdit(params.node.id)

const actionEdit = async (id: number) => {
  await api.get(id, getFieldName(props.schema))
  rowForm.value = { ...(item.value as object) }
  if (rowForm.value)
    openCadastro()
}
const buttonNew = () => {
  rowForm.value = null
  openCadastro()
}
const buttonEdit = () => {
  console.log('Edit', handleGrid().getSelectedRows()[0])
  const id = handleGrid().getSelectedRows()[0]
  if (id) {
    actionEdit(id.cd_empresa)
  } else {
    toast.add({
      title: 'Error !',
      color: 'red',
      description: 'Nenhum registro selecionado'
    })
  }
}
const buttonDelete = async () => {
  if (!handleGrid()?.getSelectedNodes().length) {
    toast.add({
      title: 'Error !',
      color: 'red',
      description: 'Nenhum registro selecionado'
    })
    return
  }
  modal.open(ModalDelete, {
    count: handleGrid().getSelectedRows().length,
    async onSuccess() {
      const selectedNodes = handleGrid().getSelectedNodes()
      const removedNodes = []
      await Promise.all(selectedNodes.map(async (node) => {
        await api.remove(node.id)
        if (api.status.value) {
          removedNodes.push(node.data)
          toast.add({
            title: 'Exclusão',
            color: 'green',
            description: `Registro [${node.id}] excluído com sucesso !`

          })
        } else {
          toast.add({
            title: 'Erro ao excluir registro !',
            color: 'red',
            description: JSON.stringify(api.errors.value.error)
          })
        }
      }))
      modal.close()
      if (removedNodes.length) {
        const remove = handleGrid().applyTransaction({
          remove: removedNodes
        }).remove
        const rowIndex = remove[0].childIndex
        const rowLast = handleGrid().getLastDisplayedRowIndex()
        const nodeToSelect = handleGrid().getDisplayedRowAtIndex(rowIndex > rowLast ? rowLast : rowIndex)
        if (nodeToSelect) {
          nodeToSelect.setSelected(true, true)
          // handleGrid().ensureNodeVisible(nodeToSelect, 'middle')
        }
      }
    }
  })
}
const buttonSearch = async () => {
  await api.getAll()
  rowData.value = items.value
}

defineShortcuts({
  insert: {
    handler: () => { buttonNew() }
  },
  delete: {
    handler: () => { buttonDelete() }
  }
})
</script>

<template>
  <UPage class="mx-4">
    <UPageHeader
      :title="props.header.title"
      headline=""
      :icon="props.header.icon"
      :ui="{ strategy: 'override', wrapper: 'relative border-b border-gray-200 dark:border-gray-800 py-2' }"
      :links="[
        { label: 'Pesquisar', icon: 'i-heroicons-magnifying-glass', click: buttonSearch },
        { label: 'Incluir', icon: 'i-heroicons-plus-20-solid', click: buttonNew },
        { label: 'Editar', icon: 'i-heroicons-pencil-20-solid', click: buttonEdit },
        { label: 'Apagar', icon: 'i-heroicons-trash-20-solid', click: buttonDelete }
      ]"
    >
      <BaseFilter v-if="false" />
    </UPageHeader>

    <UPageBody class="mt-0">
      <BaseGrid
        ref="baseApi"
        :endpoint="props.endpoint"
        :row-data="rowData"
        :column-defs="columnDefs"
        :on-selection-changed="onSelectionChanged"
        :on-row-double-clicked="onRowDoubleClicked"
        :http="api"
      />
    </UPageBody>
  </UPage>
</template>
