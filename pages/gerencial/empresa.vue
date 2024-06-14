<script setup lang="ts">
import { GerencialEmpresa, GerencialEmpresaFiltro } from '#components'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'
import type { ActionMenuItem } from '~/types/grid'

const title = 'Empresas'
const apiPage = ref(null)
const controller = useEmpresa()
const showModal = ref(false)
const id = ref(0)

const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}

const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}

const apiFilter = ref(null)
const modelFilter = ref({
  'em.sn_empresa': true
})
const filtrar = async () => {
  apiPage.value.applyFilter()
}

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
// const modal = useModal()
// const openForm = (codigo?: number) => {
//   modal.open(GerencialEmpresa, {
//     id: Number(codigo),
//     onClose: () => modal.close(),
//     onSubmit: (id: number, data: any) => {
//       const nodes = id ? { update: [data] } : { add: [data] }
//       apiPage.value.applyTransaction(nodes)
//       modal.close()
//     }
//   })
// }
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
// const { openDialog } = useMessage()
// const test = () => {
//   openDialog({
//     description: 'Deseja sair sem salvar ?',
//     okClick: () => { useMessage().closeDialog() },
//     noClick: () => { useMessage().closeDialog() }
//   })
// }
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: 'i-heroicons-queue-list' }"
    :controller
    :action-menu
    :filter="modelFilter"
    @open-form="openForm"
  >
    <template #filter>
      <GerencialEmpresaFiltro
        ref="apiFilter"
        v-model="modelFilter"
        @submit="filtrar"
      />
    </template>
    <template #form>
      <GerencialEmpresa
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
