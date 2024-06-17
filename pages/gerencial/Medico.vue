<script lang="ts" setup>
import { GerencialMedico, GerencialMedicoProcedimento } from '#components'
import { useMedico } from '~/composables/gerencial/useMedico'
import type { ActionMenuItem } from '~/types/grid'

const title = 'Médico'
const apiPage = ref(null)
const controller = useMedico()
const showModal = ref(false)
const id = ref(0)
const modal = useModal()
const associarProcedimento = (codigo?: number) => {
  modal.open(GerencialMedicoProcedimento, {
    id: Number(codigo)
  })
}
const actionMenu: ActionMenuItem[] = [
  {
    name: 'acProcedimento',
    action: () => { associarProcedimento(apiPage.value.selectedData()?.cd_medico) }
  }
]
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}
const onSubmit = (data: any) => {
  showModal.value = false
  const nodes = id.value ? { update: [data] } : { add: [data] }
  apiPage.value.applyTransaction(nodes)
}
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: 'i-heroicons-user-group' }"
    :controller
    :action-menu
    @open-form="openForm"
  >
    <template #form>
      <GerencialMedico
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
