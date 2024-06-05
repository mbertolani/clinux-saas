<script lang="ts" setup>
import { GerencialMedico } from '#components'
import { useMedico } from '~/composables/gerencial/useMedico'
import type { ActionMenuItem } from '~/types/grid'

const apiPage = ref(null)
const actionMenu: ActionMenuItem[] = []
const controller = useMedico()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(GerencialMedico, {
    id: Number(codigo),
    onClose: () => modal.close(),
    onSubmit: (id: number, data: any) => {
      const nodes = id ? { update: [data] } : { add: [data] }
      apiPage.value.applyTransaction(nodes)
      modal.close()
    }
  })
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
  </BasePage>
</template>
