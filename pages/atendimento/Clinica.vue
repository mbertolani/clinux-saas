<script lang="ts" setup>
import { AtendimentoClinica, AtendimentoClinicaExame } from '#components'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { Icones } from '~/types/system'

const title = 'Atendimento'
const apiPage = ref(null)
const controller = useAtendimento()
const showModal = ref(false)
const showExame = ref(false)
const showAnexo = ref(false)
const id = ref(0)
const filter = ref()

const actionMenu = [
  {
    title: 'Exames',
    icon: Icones.procedimento,
    action: () => associarExame(apiPage.value.selectedId())
  },
  {
    title: 'Documentos',
    icon: Icones.anexo,
    action: () => {
      id.value = apiPage.value.selectedId()
      showAnexo.value = id.value > 0
    }
  },
  {
    title: '-'
  },
  {
    title: 'Solicitar',
    icon: Icones.atendimento_ficha,
    action: () => solicitar(true)
  },
  {
    title: 'Cancelar',
    icon: Icones.atendimento_cancela,
    action: () => solicitar(false)
  }
]
const solicitar = (action: boolean) => {
  if (!apiPage.value.selectedId())
    return
  const _id = apiPage.value.selectedId()
  useMessage().openDialog({
    title: 'Atendimento',
    description: action ? 'Confirmar solicitação ?' : 'Cancelar solicitação ?',
    okClick: async () => {
      const data = action ? await useAtendimento().execFicha(apiPage.value.selectedId()) : await useAtendimento().execFichaCancela(apiPage.value.selectedId())
      apiPage.value.applyTransaction(_id ? { update: data } : { add: data })
    }
  })
}

const associarExame = async (_id) => {
  const response = await useAtendimento().get(_id, 'nr_controle')
  if (response.nr_controle)
    return useMessage().showError('A solicitação já foi enviada !')

  showExame.value = true
  id.value = _id
}
const openForm = async (codigo?: number) => {
  const response = await useAtendimento().get(codigo, 'nr_controle')
  if (response.nr_controle)
    return useMessage().showError('A solicitação já foi enviada !')
  showModal.value = true
  id.value = Number(codigo)
}
const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
  if (!id.value)
    associarExame(Object.values(data)[0])
}
const filterDate = ref({
  dt_de: useDateFormat(new Date(), 'YYYY-MM-DD').value
})
const onClose = () => {
  showModal.value = false
}
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.atendimento }"
    :controller
    :action-menu
    :filter
    :filter-date
    @open-form="openForm"
  >
    <AtendimentoClinica
      :id
      v-model="showModal"
      :title
      @submit="onSubmit"
      @close="onClose"
    />
    <AtendimentoClinicaExame
      v-if="showExame"
      :id
      v-model="showExame"
      @close="showExame=false"
    />
    <LaudoAnexo
      v-if="showAnexo"
      :id
      v-model="showAnexo"
      @close="showAnexo = false"
    />
  </BasePage>
</template>
