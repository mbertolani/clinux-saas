<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { reset } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { Messages } from '~/types/system'

const emit = defineEmits(['close', 'reset'])
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: false
  },
  controller: {
    type: Object,
    required: false
  },
  schema: {
    type: Array as () => FormKitSchemaDefinition,
    required: true
  },
  data: {
    type: Object,
    required: false
  },
  value: {
    type: Object,
    required: false
  },
  grid: {
    type: String,
    default: 'height: 400px; width: 100%;'
  }
})
const [rowData, columnDefs, master] = await Promise.all([
  props.controller.getAll(),
  props.controller.getGrid(),
  props.controller.getTitle()
])
const titleMaster = Object.values(master)[0]
const gridOptions = {
  suppressHorizontalScroll: true,
  autoSizeStrategy: {
    type: 'fitGridWidth'
  }
}

const onRowDoubleClicked = async (params) => {
  // value.value = params.data
  reset('form-modal-page', params.data)
}

const onSubmit = async (_data: any) => {
  const id = Object.values(_data)[0]
  const response = (id) ? await props.controller.update(id, _data) : await props.controller.create(_data)
  if (!response)
    return
  if (id)
    gridRef.value?.coreApi.api.applyTransaction({ update: [response] })
  else
    gridRef.value?.coreApi.api.applyTransaction({ add: [response] })
  cancelar()
}
const cancelar = () => {
  reset('form-modal-page', props.value || {})
}
const confirmarDelete = ref(false)
const nodeData = ref()
const gridRef = ref()
const confirmarExclusao = () => {
  if (JSON.stringify(getNode('form-modal-page').value) !== JSON.stringify(props.value || {})) {
    return cancelar()
  }
  const selection = gridRef.value?.coreApi.api.getSelectedRows()
  nodeData.value = selection[0]
  confirmarDelete.value = selection.length > 0
  if (!selection.length)
    useMessage().showMessage(Messages.MSG_FNF_GRID)
}
const excluir = async () => {
  const response = await props.controller.remove(Object.values(nodeData.value)[0])
  confirmarDelete.value = false
  if (response)
    gridRef.value?.coreApi.api.applyTransaction({ remove: [nodeData.value] })
}
const showLog = ref(false)
const dataLog = ref()
const log = async () => {
  const selectedNode = gridRef.value?.coreApi.api.getSelectedNodes()[0]
  if (!selectedNode) {
    useMessage().showError(Messages.MSG_FNF_GRID)
    return
  }
  dataLog.value = await props.controller.getLog(selectedNode.id)
  showLog.value = true
}
const getRowId = ({ data }) => String(Object.values(data)[0])
const setNode = (node) => {
  node.on('reset', () => {
    emit('reset')
  })
  node.on('mounted', () => {
    console.log('mounted', node)
  })
}
</script>

<template>
  <BaseForm
    :title
    @close="emit('close')"
  >
    <!-- <BaseFormLayout
      :id="0"
      :schema
      :data
      :controller
      :value
      @submit="onSubmit"
    /> -->
    <FormKit
      id="form-modal-page"
      v-slot="{ state: { dirty } }"
      :value
      dirty-behavior="compare"
      type="form"
      :actions="false"
      @node="setNode"
      @submit="onSubmit"
    >
      <div :class="formClass()">
        <div
          v-if="id > 0"
          :class="`bg-emerald-600 text-white px-3 py-2 rounded mb-2 text-center ${formClass($slots.buttons ? 11 : 12)}`"
        >
          {{ titleMaster }}
        </div>
        <slot
          name="buttons"
          :class="formClass(1)"
        />
        <slot />
        <FormKitSchema
          :schema
          :data
        />
        <FormKit
          type="submit"
          label="Salvar"
          prefix-icon="add"
          input-class="w-full justify-center"
          :outer-class="formClass(2)"
          :disabled="!dirty"
        />
        <FormKit
          type="button"
          label="Cancelar"
          prefix-icon="close"
          :disabled="!dirty"
          input-class="w-full justify-center"
          :outer-class="formClass(2)"
          @click="cancelar()"
        />
        <FormKit
          type="button"
          label="Apagar"
          prefix-icon="trash"
          input-class="w-full justify-center"
          :outer-class="formClass(2)"
          @click="confirmarExclusao()"
        />
        <FormKit
          type="button"
          label="Log"
          prefix-icon="time"
          input-class="w-full justify-center"
          :outer-class="formClass(2)"
          @click="log()"
        />
      </div>
    </FormKit>
    <BaseGridCore
      ref="gridRef"
      :style="grid"
      :get-row-id="getRowId"
      :column-defs
      :row-data
      :pagination="false"
      :grid-options
      :on-row-double-clicked="onRowDoubleClicked"
    />
    <ModalDelete
      v-model="confirmarDelete"
      @success="excluir"
      @close="confirmarDelete = false"
    />
    <ModalLog
      v-if="showLog"
      v-model="showLog"
      :row-data="dataLog"
      @close="showLog = false"
    />
  </BaseForm>
</template>
