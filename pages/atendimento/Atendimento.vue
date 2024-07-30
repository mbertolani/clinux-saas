<script lang="ts" setup>
import Atendimento from '~/components/atendimento/Atendimento.vue'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { Icones } from '~/types/system'

const title = 'Atendimento'
const apiPage = ref(null)
const controller = useAtendimento()
const showModal = ref(false)
const id = ref(0)
const filter = ref()

const actionMenu = [
  {
    name: 'acProcedimento',
    title: 'Associar Procedimento',
    icon: Icones.procedimento,
    action: () => { }
  }
]
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}
const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
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
    <template #form>
      <Atendimento
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="onClose"
      />
    </template>
  </BasePage>
</template>
