<script lang="ts" setup>
import { GerencialMedico, GerencialMedicoProcedimento, GerencialMedicoSala } from '#components'
import { useMedico } from '~/composables/gerencial/useMedico'
import type { ActionMenuItem } from '~/types/grid'
import { Icones } from '~/types/system'

const title = 'Médico'
const apiPage = ref(null)
const controller = useMedico()
const showModal = ref(false)
const id = ref(0)
const modal = useModal()
const associarProcedimento = (codigo?: number) => {
  modal.open(GerencialMedicoProcedimento, {
    id: Number(codigo),
    onClose() {
      modal.close()
    }
  })
}
const associarSala = (codigo?: number) => {
  modal.open(GerencialMedicoSala, {
    id: Number(codigo),
    onClose() {
      modal.close()
    }
  })
}
const actionMenu: ActionMenuItem[] = [
  {
    name: 'acProcedimento',
    icon: Icones.procedimento,
    action: () => { associarProcedimento(apiPage.value.selectedData()?.cd_medico) }
  },
  {
    name: 'acSala',
    icon: Icones.sala,
    action: () => { associarSala(apiPage.value.selectedData()?.cd_medico) }
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
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.medico }"
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
