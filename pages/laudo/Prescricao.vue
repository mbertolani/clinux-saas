<script lang="ts" setup>
import { LaudoPrescricao } from '#components'
import { usePrescricao } from '~/composables/laudo/usePrescricao'
import type { ActionMenuItem } from '~/types/grid'

const apiPage = ref(null)
const actionMenu: ActionMenuItem[] = []
const controller = usePrescricao()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(LaudoPrescricao, {
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
