<script lang="ts" setup>
import { GerencialMedico } from '#components'
import { useMedico } from '~/composables/gerencial/useMedico'
import type { ActionMenuItem } from '~/types/grid'

const apiPage = ref(null)
const actionMenu: ActionMenuItem[] = []
const controller = useMedico()
const showModal = ref(false)
const id = ref(0)
// const modal = useModal()
// const openForm = (codigo?: number) => {
//   modal.open(GerencialMedico, {
//     id: Number(codigo),
//     onClose: () => modal.close(),
//     onSubmit: (id: number, data: any) => {
//       const nodes = id ? { update: [data] } : { add: [data] }
//       apiPage.value.applyTransaction(nodes)
//       modal.close()
//     }
//   })
// }
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
    <template
      v-if="false"
      #filter
    />
    <template #form>
      <GerencialMedico
        :id="id"
        v-model="showModal"
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
