<script lang="ts" setup>
import { GerencialFuncionario } from '#components'
import { useFuncionario } from '~/composables/gerencial/useFuncionario'
import type { ActionMenuItem } from '~/types/grid'
import { Icones } from '~/types/system'

const title = 'Funcionário'
const apiPage = ref(null)
const actionMenu: ActionMenuItem[] = []
const showModal = ref(false)
const controller = useFuncionario()
const id = ref(0)
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}
const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}
// const modal = useModal()
// const openForm = (codigo?: number) => {
//   modal.open(GerencialFuncionario, {
//     id: Number(codigo),
//     onClose: () => modal.close(),
//     onSubmit: (id: number, data: any) => {
//       const nodes = id ? { update: [data] } : { add: [data] }
//       apiPage.value.applyTransaction(nodes)
//       modal.close()
//     }
//   })
// }
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.funcionario }"
    :controller
    :action-menu
    @open-form="openForm"
  >
    <template #form>
      <GerencialFuncionario
        :id="id"
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
