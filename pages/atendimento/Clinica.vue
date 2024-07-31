<script lang="ts" setup>
import { AtendimentoClinica, AtendimentoClinicaExame } from '#components'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { Icones } from '~/types/system'

const title = 'Atendimento'
const apiPage = ref(null)
const controller = useAtendimento()
const showModal = ref(false)
const showExame = ref(false)
const id = ref(0)
const filter = ref()

const actionMenu = [
  {
    title: 'Associar Exames',
    icon: Icones.procedimento,
    action: () => associarExame(apiPage.value.selectedId())
  }
]
const associarExame = (_id) => {
  showExame.value = true
  id.value = _id
}
const openForm = (codigo?: number) => {
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
  </BasePage>
</template>
