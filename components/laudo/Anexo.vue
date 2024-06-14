<script setup lang="ts">
import { useLaudo } from '~/composables/laudo/useLaudo'
import { useAnexo } from '~/composables/atendimento/useAnexo'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const { remove, doAnexoLista, doAnexoDownload, doAnexoSalvar } = useAnexo(props.id)
const { find } = useLaudo()
const rowData = ref()
const options = getFieldList(await find('tipodocumento'))
const columnDefs = [
  { field: 'ds_arquivo', headerName: 'Arquivo', width: 400 },
  { field: 'ds_documento', headerName: 'Tipo Documento', width: 200 }
]

const listaAnexos = async () => {
  const response = await doAnexoLista({ cd_atendimento: props.id })
  if (!response.error) {
    rowData.value = response.data
  }
}
const onRowDoubleClicked = async (params) => {
  const response = await doAnexoDownload(params.data.cd_documento)
  saveFile(response.filename, response.stream)
}
function saveFile(filename, blob) {
  const a = document.createElement('a')
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.click()
}
const submitHandler = async (data): Promise<void> => {
  // await Promise.all(data.bb_arquivo.map((fileItem) => {
  //   const fReader = new FileReader()
  //   fReader.onloadend = async () => {
  //     const data64 = String(fReader.result).replace(/^data:.+;base64,/, '')
  //     return await doAnexoSalvar({
  //       cd_atendimento: props.id,
  //       cd_tipo: data.cd_tipo,
  //       bb_arquivo: data64,
  //       ds_arquivo: fileItem.file.name
  //     })
  //   }
  //   fReader.readAsDataURL(fileItem.file)
  // }))
  // return await listaAnexos()
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
    showError('Nenhum registro selecionado')
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
listaAnexos()

// function blobToDataURL(blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = function () {
//       resolve(reader.result)
//     }
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   })
// }
// function carregarImagens() {
//   const lista = []
//   rowData.value.forEach(async (item) => {
//     const response = await doAnexoDownload(item.cd_documento)
//     const dataURL = await blobToDataURL(response.stream)
//     lista.push(dataURL)
//   })
//   images.value = lista
//   console.log('images', images.value)
// }
</script>

<template>
  <BaseForm
    title="Documentos"
    @close="useModal().close()"
  >
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
      :on-row-double-clicked="onRowDoubleClicked"
      :on-cell-key-down="onCellKeyDown"
    />
  </BaseForm>
</template>
