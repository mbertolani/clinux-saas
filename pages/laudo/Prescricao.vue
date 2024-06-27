<script lang="ts" setup>
import { LaudoPrescricao } from '#components'
import { usePrescricao } from '~/composables/laudo/usePrescricao'
import type { ActionMenuItem } from '~/types/grid'
import { Icones, Messages } from '~/types/system'

const apiPage = ref(null)
const controller = usePrescricao()
const modal = useModal()
const openForm = (codigo?: number) => {
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
  apiPage.value.getSelectedNodes().map(async (node) => {
    const response = await controller.exec(action, { cd_prescricao: node.data.cd_prescricao })
    apiPage.value.applyTransaction({ update: response })
  })
}

const buttonAction = async (action: string) => {
  if (!apiPage.value.getSelectedNodes().length) {
    showError(Messages.MSG_FNF_GRID)
    return
  }
  useMessage().openDialog({
    title: 'Atualizar Prescrição',
    description: `Deseja ${action} o(s) registro(s) selecionado(s) ?`,
    okClick: () => { useMessage().closeDialog(), commandAction(action) },
    noClick: () => { useMessage().closeDialog() }
  })
}
const actionMenu: ActionMenuItem[] = [
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
  }
]
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title: 'Prescrição', icon: Icones.prescricao }"
    :controller
    :action-menu
    :row-class-rules
    @open-form="openForm"
  />
</template>

<style>
.custom-row-aprovado {
  color: rgb(10, 150, 10);
}
.custom-row-recusado {
  color: rgb(255, 150, 150);
}
</style>
