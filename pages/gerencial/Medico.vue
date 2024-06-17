<script lang="ts" setup>
import { GerencialMedico, GerencialMedicoProcedimento } from '#components'
import { useMedico } from '~/composables/gerencial/useMedico'
import type { ActionMenuItem } from '~/types/grid'

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
const onSubmit = (_id: number, data: any) => {
  showModal.value = false
  const nodes = _id ? { update: [data] } : { add: [data] }
  apiPage.value.applyTransaction(nodes)
}
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title: 'Médicos', icon: 'i-heroicons-user-group' }"
    :controller
    :action-menu
    @open-form="openForm"
  >
    <template #form>
      <GerencialMedico
        :id
        v-model="showModal"
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
