<script setup lang="ts">
import { useLaudo } from '~/composables/laudo/useLaudo'
import { useAnexo } from '~/composables/atendimento/useAnexo'
import { Messages } from '~/types/system'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const { remove, doAnexoLista, doAnexoDownload, doAnexoSalvar } = useAnexo(props.id)
const { find } = useLaudo()
const rowData = ref()
const rowImage = ref()
const options = getFieldList(await find('tipodocumento'))
const columnDefs = [
  { field: 'ds_documento', headerName: 'Tipo Documento' }
  // { field: 'ds_arquivo', headerName: 'Arquivo', width: 200 }
]
const gridOptions = {
  suppressHorizontalScroll: true,
  autoSizeStrategy: {
    type: 'fitGridWidth'
  }
}
const listaAnexos = async () => {
  const response = await doAnexoLista()
  if (!response.error) {
    rowData.value = response.data
  }
}

function saveFile(filename, blob) {
  const a = document.createElement('a')
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.click()
}
const submitHandler = async (data): Promise<void> => {
  await Promise.all(data.bb_arquivo.map((fileItem) => {
    return new Promise((resolve) => {
      const fReader = new FileReader()
      fReader.onloadend = async () => {
        const data64 = String(fReader.result).replace(/^data:.+;base64,/, '')
        resolve(await doAnexoSalvar({
          cd_atendimento: props.id,
          cd_tipo: data.cd_tipo,
          bb_arquivo: data64,
          ds_arquivo: fileItem.file.name
        }))
      }
      fReader.readAsDataURL(fileItem.file)
    })
  }))
  await listaAnexos()
  getNode('form-anexo').reset()
  useMessage().showMessage()
  return
}

const deleteAnexo = (api) => {
  Promise.all(api.getSelectedNodes().map(async (node) => {
    return remove(node.data.cd_documento)
  }))
  api.applyTransaction({
    remove: api.getSelectedRows()
  })
}

const buttonDelete = async (api) => {
  if (!api.getSelectedNodes().length) {
    showError(Messages.MSG_FNF_GRID)
    return
  }
  useMessage().openDialog({
    title: 'Exclusão',
    description: 'Confirmar exclusão ?',
    okClick: () => { useMessage().closeDialog(), deleteAnexo(api) },
    noClick: () => { useMessage().closeDialog() }
  })
}
const onCellKeyDown = ({ event, api }) => {
  switch (event.key) {
    case 'Delete':
      buttonDelete(api)
      break
  }
}
const onRowDoubleClicked = async (params) => {
  const response = await doAnexoDownload(params.data.cd_documento)
  saveFile(response.filename, response.stream.data)
}
const onCellClicked = async ({ data }) => {
  const response = await doAnexoDownload(data.cd_documento)
  rowImage.value = response.stream.data instanceof Blob ? URL.createObjectURL(response.stream.data) : ''
}
listaAnexos()
</script>

<template>
  <BaseForm
    title="Documentos"
    :fullscreen="true"
    @close="useModal().close()"
  >
    <div class="grid gap-x-4 grid-cols-1 lg:grid-cols-12">
      <div :class="rowImage ? 'lg:col-span-4' : 'lg:col-span-12'">
        <FormKit
          id="form-anexo"
          type="form"
          @submit="submitHandler"
        >
          <FormKit
            type="dropdown"
            label="Tipo"
            name="cd_tipo"
            :options
            accept=".jpg,.png,.pdf"
            validation="required"
          />
          <FormKit
            type="file"
            label="Documentos"
            name="bb_arquivo"
            accept=".jpg,.png,.pdf"
            multiple
            validation="required"
          />
        </FormKit>
        <BaseGridCore
          style="height: 400px; width: 100%;"
          :column-defs
          :row-data
          :pagination="false"
          :grid-options
          :on-row-double-clicked="onRowDoubleClicked"
          :on-cell-key-down="onCellKeyDown"
          :on-cell-clicked="onCellClicked"
        />
      </div>
      <div
        v-if="rowImage"
        class="lg:col-span-8 row-span-2"
      >
        <NuxtImg
          :src="rowImage"
          class="mx-auto my-auto opacity-1"
        />
      </div>
    </div>
  </BaseForm>
</template>
