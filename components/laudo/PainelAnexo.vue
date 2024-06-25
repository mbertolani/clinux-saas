<script setup lang="ts">
import { useAnexo } from '~/composables/atendimento/useAnexo'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const { doAnexoDownload, doAnexoLista } = useAnexo(props.data.cd_atendimento)
const rowData = ref()
const src = ref()
const title = ref('')
const showImage = ref(false)
const showFile = ref(false)
const columnDefs = [
  { field: 'ds_documento', headerName: 'Tipo Documento' }
]

const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}

const onRowDoubleClicked = async ({ data }) => {
  const response = await doAnexoDownload(data.cd_documento)
  src.value = response.stream.data instanceof Blob ? URL.createObjectURL(response.stream.data) : ''
  title.value = data.ds_documento
  showFile.value = data.ds_arquivo.includes('.pdf')
  showImage.value = !showFile.value
}

// const response = await doAnexoLista()
// rowData.value = response.data
doAnexoLista().then((response) => {
  rowData.value = response.data
})
</script>

<template>
  <div>
    <BaseGridCore
      style="height: 100%; width: 100%;"
      :column-defs
      :row-data
      :pagination="false"
      :on-row-double-clicked="onRowDoubleClicked"
      @first-data-rendered="onFirstDataRendered"
    />
    <BaseForm
      v-model="showImage"
      :title
      :fullscreen="true"
      @close="showImage = false"
    >
      <NuxtImg
        :src
        class="mx-auto my-auto opacity-1"
      />
    </BaseForm>
    <ModalFullScreen
      v-model="showFile"
      :title
      :fullscreen="true"
      @close="showFile = false"
    >
      <iframe
        :src
        frameborder="0"
        style="height: 100%; width: 100%"
        allowfullscreen
      />
    </ModalFullScreen>
  </div>
</template>
