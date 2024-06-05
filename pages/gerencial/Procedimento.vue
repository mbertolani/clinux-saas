<script lang="ts" setup>
import { GerencialProcedimento } from '#components'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import type { ActionMenuItem } from '~/types/grid'

const apiPage = ref(null)
const actionMenu: ActionMenuItem[] = []
const controller = useProcedimento()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(GerencialProcedimento, {
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
    :header="{ title: 'Procedimentos', icon: 'i-heroicons-hashtag' }"
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
