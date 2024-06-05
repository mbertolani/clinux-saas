<script lang="ts" setup>
import { GerencialFuncionario } from '#components'
import { useFuncionario } from '~/composables/gerencial/useFuncionario'
import type { ActionMenuItem } from '~/types/grid'

const apiPage = ref(null)
const actionMenu: ActionMenuItem[] = []
const controller = useFuncionario()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(GerencialFuncionario, {
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
    :header="{ title: 'Funcionários', icon: 'i-heroicons-identification' }"
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
