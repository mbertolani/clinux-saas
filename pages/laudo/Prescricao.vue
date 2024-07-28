<script lang="ts" setup>
import { LaudoPrescricao, LaudoAssinado } from '#components'
import { usePrescricao } from '~/composables/laudo/usePrescricao'
import { Icones, Messages } from '~/types/system'

const { moduleId } = useRouterStore()
const apiPage = ref(null)
const controller = usePrescricao()
const modal = useModal()
const showEditor = ref(false)
const apiEditor = ref(null)
const openForm = async (codigo?: number) => {
  if (codigo) {
    const aberto = await controller.getStatus(codigo)
    if (!aberto)
      return abrirDocumento()
  }
  modal.open(LaudoPrescricao, {
    id: Number(codigo),
    onClose: () => modal.close(),
    onSubmit: (id: number, data: any) => {
      const nodes = id ? { update: [data] } : { add: [data] }
      apiPage.value.applyTransaction(nodes)
      modal.close()
    }
  })
}

const rowClassRules = {
  'custom-row-recusado': ({ data }) => (data?.ds_status === 'RECUSADO'),
  'custom-row-aprovado': ({ data }) => (data?.ds_status === 'APROVADO')
}

const commandAction = async (action) => {
  // apiPage.value.getSelectedNodes().map(async (node) => {
  //   const response = await controller.exec(action, { cd_prescricao: node.data.cd_prescricao })
  //   apiPage.value.applyTransaction({ update: response })
  // })
  const data = apiPage.value.selectedData()
  const response = await controller.exec(action, { cd_prescricao: data.cd_prescricao })
  apiPage.value.applyTransaction({ update: response })
  if (action !== 'reiniciar') {
    const document = await controller.getDocumento(data.cd_prescricao)
    openEditor(document.layout, document.data)
  }
}

const buttonAction = async (action: string) => {
  const data = apiPage.value.selectedData()

  if (!data)
    return useMessage().showError(Messages.MSG_FNF_GRID)

  if (action !== 'reiniciar') {
    const aberto = await controller.getStatus(data.cd_prescricao)
    if (!aberto)
      return useMessage().showError(Messages.MSG_SYS_NOT)
  }
  useMessage().openDialog({
    title: 'Atualizar Prescrição',
    description: `Deseja ${action} o(s) registro(s) selecionado(s) ?`,
    okClick: () => { useMessage().closeDialog(), commandAction(action) },
    noClick: () => { useMessage().closeDialog() }
  })
}
const actionMenu = moduleId === 'clinux'
  ? [
      {
        name: 'aprovar',
        title: 'Aprovar',
        icon: 'i-mdi-check-circle-outline',
        action: () => { buttonAction('aprovar') }
      },
      {
        name: 'recusar',
        title: 'Recusar',
        icon: 'i-mdi-close-circle-outline',
        action: () => { buttonAction('recusar') }
      },
      {
        name: 'reiniciar',
        title: 'Reiniciar',
        icon: 'i-mdi-restore',
        action: () => { buttonAction('reiniciar') }
      },
      {
        name: 'visualizar',
        title: 'Visualizar',
        icon: 'i-mdi-file-document',
        action: () => { abrirDocumento() }
      }
    ]
  : [
      {
        name: 'visualizar',
        title: 'Visualizar',
        icon: 'i-mdi-file-document',
        action: () => { abrirDocumento() }
      }
    ]
const filter = ref({
  dt_de: useDateFormat(new Date(), 'YYYY-MM-DD').value
})
const loadEditor = (payload) => {
  apiEditor.value = payload
}
const openEditor = (payload, data = null) => {
  showEditor.value = true
  apiEditor.value.load(payload, data ? data[0] : null)
  // if (data && data.length)
  //   apiEditor.value.editorMerge(data[0])
}
const closeEditor = async () => {
  apiEditor.value.close()
  showEditor.value = false
}
const saveEditor = async () => {
  const node = apiPage.value.selectedNode()
  const payload = await apiEditor.value.export()
  const response = await usePrescricao().setDocumento(node.id, payload)
  if (response) {
    closeEditor()
    showEditor.value = false
  }
}
const abrirDocumento = async () => {
  const node = apiPage.value.selectedNode()
  if (!node) {
    showError(Messages.MSG_FNF_GRID)
    return
  }
  const response = await usePrescricao().getAssinado(node.id)
  modal.open(LaudoAssinado, {
    title: 'Prescrição',
    src: URL.createObjectURL(response.data),
    onClose() {
      modal.close()
    }
  })
}
</script>

<template>
  <div>
    <BasePage
      v-show="!showEditor"
      ref="apiPage"
      :header="{ title: 'Prescrição', icon: Icones.prescricao }"
      :controller
      :action-menu
      :row-class-rules
      :filter="filter"
      :filter-date="filter"
      @open-form="openForm"
    />
    <BaseEditor
      v-show="showEditor"
      @load="loadEditor($event)"
      @close="closeEditor()"
      @save="saveEditor()"
    />
  </div>
</template>

<style>
.custom-row-aprovado {
  color: rgb(10, 150, 10);
}
.custom-row-recusado {
  color: rgb(255, 150, 150);
}
</style>
