<script setup lang="ts">
import { GerencialEmpresa, GerencialEmpresaFiltro } from '#components'
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
const showModal = ref(false)
const id = ref(0)
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}
const onSubmit = (_id: number, data: any) => {
  showModal.value = false
  const nodes = _id ? { update: [data] } : { add: [data] }
  apiPage.value.applyTransaction(nodes)
  id.value = null
}
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
  <div>
    <BasePage
      ref="apiPage"
      :header="{ title: 'Empresas', description: 'Cadastro de Empresas', icon: 'i-heroicons-building-office' }"
      :controller
      :action-menu
      @open-form="openForm"
    >
      <template #filter>
        <!-- <UButton
          color="primary"
          label="Nova Empresa"
          @click="test()"
        /> -->
        <GerencialEmpresaFiltro />
      </template>
      <template #form>
        <GerencialEmpresa
          v-if="showModal"
          :id="id"
          v-model="showModal"
          @submit="onSubmit"
          @close="showModal = false"
        />
      </template>
    </BasePage>
  </div>
</template>
