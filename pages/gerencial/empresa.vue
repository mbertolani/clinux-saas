<script setup lang="ts">
import { GerencialEmpresa } from '#components'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'
import type { ActionMenuItem } from '~/types/grid'

const apiPage = ref(null)

const actionMenu: ActionMenuItem[] = [
  {
    name: 'acAnexo',
    action: () => {
      console.log('Anexo')
    }
  },
  {
    name: 'acRota',
    action: () => {
      console.log('Rota')
    }
  }
]
const controller = useEmpresa()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(GerencialEmpresa, {
    id: Number(codigo),
    onClose: () => modal.close(),
    onSubmit: (id: number, data: any) => {
      const nodes = id ? { update: [data] } : { add: [data] }
      apiPage.value.applyTransaction(nodes)
      modal.close()
    }
  })
}
// const getRowStyle = ({ data }) => {
//   if (data && 'sn_ativo' in data)
//     if (!data?.sn_ativo) {
//       return { 'color': 'rgb(255,0,0)', 'background-color': 'yellow' }
//     }
//   return { 'color': 'var(--ag-data-color)', 'background-color': 'var(--ag-data-background-color)' }
// }
// const getRowClass = ({ data }) => {
//   if (data && 'sn_ativo' in data)
//     if (!data?.sn_ativo) {
//       return 'var(--ag-invalid-color)'
//     }
//   // console.log('getRowClass', 'ag-row')
//   return 'var(--ag-row)'
// }
// const rowClassRules = { 'custom-row-alert': ({ data }) => data?.sn_ativo === false }
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title: 'Empresas', description: 'Cadastro de Empresas', icon: 'i-heroicons-building-office' }"
    :controller="controller"
    :action-menu="actionMenu"
    @open-form="openForm"
  />
</template>
