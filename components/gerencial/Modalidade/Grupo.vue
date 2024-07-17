<script lang="ts" setup>
import { useProcedimentoGrupo } from '~/composables/gerencial/useProcedimentoGrupo'
import { ModalDelete, ModalLog } from '#components'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  pid: {
    type: Number,
    required: false
  },
  controller: {
    type: Function,
    required: false
  }
})
const emit = defineEmits(['onClose'])
const getRowId = ({ data }) => Object.values(data)[0]
const inputSearch = ref('')
const gridRef = ref()
const controller = useProcedimentoGrupo(props.pid)
const [rowData, columnDefs, parentID] = await Promise.all([
  controller.getAll(),
  controller.getGrid(),
  controller.getTitle()
])
const gridOptions = {
  autoSizeStrategy: {
    type: 'fitGridWidth'
  }
}
const confirmarDelete = ref(false)
const nodeData = ref()

const onCellKeyDown = ({ event, data }) => {
  switch (event.key) {
    case 'Delete':
      nodeData.value = data
      confirmarDelete.value = data.cd_grupo > 0
      break
  }
}
const excluir = async () => {
  const response = await controller.remove(nodeData.value.cd_grupo)
  confirmarDelete.value = false
  if (response)
    gridRef.value?.coreApi.api.applyTransaction({ remove: [nodeData.value] })
}
const salvar = async () => {
  nodeData.value.ds_grupo = inputSearch.value
  if (nodeData.value.cd_grupo) {
    const data = await controller.update(nodeData.value.cd_grupo, nodeData.value)
    if (data) {
      gridRef.value?.coreApi.api.applyTransaction({ update: [data] })
      cancelar()
    }
  } else {
    const data = await controller.create(nodeData.value)
    if (data) {
      gridRef.value?.coreApi.api.applyTransaction({ add: [data] })
      cancelar()
    }
  }
}
const cancelar = (data = {}) => {
  nodeData.value = data
  inputSearch.value = data ? nodeData.value.ds_grupo : '' // Object.values(data)[1] as string
}

const onRowDoubleClicked = ({ data }) => {
  cancelar(data)
}

cancelar()
</script>

<template>
  <BaseForm
    :title
    @close="emit('onClose')"
  >
    <div
      class="bg-emerald-600 text-white px-1.5 py-1.5 rounded text-center"
    >
      {{ Object.values(parentID)[0] }}
    </div>
    <UInput
      v-model="inputSearch"
      placeholder="Descrição"
      autocomplete="off"
      input-class="uppercase"
      class="py-2"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      @keydown.enter="salvar()"
    >
      <template #trailing>
        <UButton
          v-show="inputSearch !== ''"
          color="gray"
          variant="link"
          icon="i-mdi-floppy"
          :padded="false"
          @click="salvar()"
        />
        <UButton
          v-show="inputSearch !== ''"
          color="gray"
          variant="link"
          icon="i-mdi-trash-can"
          :padded="false"
          @click="cancelar()"
        />
      </template>
    </UInput>
    <BaseGridCore
      ref="gridRef"
      style="height: 400px; width: 100%;"
      :column-defs="columnDefs"
      :row-data="rowData"
      :grid-options="gridOptions"
      :get-row-id="getRowId"
      :on-cell-key-down="onCellKeyDown"
      :on-row-double-clicked="onRowDoubleClicked"
    />
    <ModalDelete
      v-model="confirmarDelete"
      @success="excluir"
      @close="confirmarDelete = false"
    />
    <ModalLog />
  </BaseForm>
</template>
