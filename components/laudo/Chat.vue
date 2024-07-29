<script setup lang="ts">
import { useLaudo } from '~/composables/laudo/useLaudo'
import { formatDateTime } from '@/utils/masks'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const rowData = ref()
rowData.value = (await useLaudo().doChatLista(props.id)).data
const columnDefs = [
  { field: 'dt_data', headerName: 'Data', width: 200, valueFormatter: p => formatDateTime(p.value) },
  { field: 'ds_funcionario', headerName: 'Funcionário', width: 200 },
  { field: 'ds_mensagem', headerName: 'Descrição', width: 600 }
]
const submitHandler = async (data): Promise<void> => {
  await useLaudo().doChatGravar({
    cd_atendimento: props.id,
    ds_mensagem: data.ds_mensagem,
    sn_medico: useAuthStore().user.idmedico
  })
  rowData.value = (await useLaudo().doChatLista(props.id)).data
  getNode('form-chat').reset()
  // useSystemStore().showMessage()
}
const onCellKeyDown = ({ event, api }) => {
  switch (event.key) {
    case 'Delete':
      console.log('Delete', api)
      // buttonDelete(api)
      break
  }
}
</script>

<template>
  <BaseForm
    title="Mensagens"
    @close="useModal().close()"
  >
    <FormKit
      id="form-chat"
      type="form"
      @submit="submitHandler"
    >
      <FormKit
        type="textarea"
        label="Comentário"
        name="ds_mensagem"
        validation="required"
      />
    </FormKit>
    <BaseGridCore
      style="height: 400px; width: 100%;"
      :column-defs
      :row-data
      :on-cell-key-down="onCellKeyDown"
    />
  </BaseForm>
</template>
