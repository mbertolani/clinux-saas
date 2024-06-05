<script lang="ts" setup>
import { GerencialModelo } from '#components'
import { useModelo } from '~/composables/gerencial/useModelo'
import type { ActionMenuItem } from '~/types/grid'

const actionMenu: ActionMenuItem[] = [
  {
    name: 'miEditarArquivo',
    action: () => {
      console.log('miEditarArquivo')
    }
  },
  {
    name: 'miEditarLayout',
    action: () => {
      console.log('Rota')
    }
  }
]
const apiPage = ref(null)
const controller = useModelo()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(GerencialModelo, {
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
    :header="{ title: 'Modelos', icon: 'i-heroicons-newspaper' }"
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
