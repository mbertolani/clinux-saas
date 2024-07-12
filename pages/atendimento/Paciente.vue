<script lang="ts" setup>
import { AtendimentoPaciente } from '#components'
import { _1 } from '#tailwind-config/theme/aspectRatio'
import { usePaciente } from '~/composables/atendimento/usePaciente'
import type { ActionMenuItem } from '~/types/grid'
import { Icones } from '~/types/system'

const title = 'Paciente'
const apiPage = ref(null)
const controller = usePaciente()
const showModal = ref(false)
const id = ref(0)
const filter = ref()
// const modal = useModal()
// const associarProcedimento = (codigo?: number) => {
//   modal.open(GerencialMedicoProcedimento, {
//     id: Number(codigo),
//     onClose() {
//       modal.close()
//     }
//   })
// }
// const associarSala = (codigo?: number) => {
//   modal.open(GerencialMedicoSala, {
//     id: Number(codigo),
//     onClose() {
//       modal.close()
//     }
//   })
// }
const actionMenu: ActionMenuItem[] = [
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
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.paciente }"
    :controller
    :action-menu
    :filter
    @open-form="openForm"
  >
    <template #filter>
      <AtendimentoPacienteFiltro
        v-model="filter"
      />
    </template>
    <template #form>
      <AtendimentoPaciente
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
