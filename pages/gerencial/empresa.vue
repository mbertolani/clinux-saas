<script setup lang="ts">
import { GerencialEmpresa, GerencialEmpresaProcedimento, GerencialEmpresaProcedencia, GerencialEmpresaFiltro, SetupProcedencia, SetupSla } from '#components'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'
import { Icones } from '~/types/system'

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

const filter = ref()
const filtrar = async () => {
  apiPage.value.applyFilter()
}

const actionMenu = [
  {
    name: 'acAnexo',
    title: 'Anexos',
    icon: Icones.anexo,
    action: () => {
      console.log('Anexo')
    }
  },
  {
    name: 'acRota',
    title: 'Rotas',
    icon: Icones.rota,
    action: () => {
      console.log('Rota')
    }
  },
  {
    title: '-'
  },
  {
    name: 'acProcedencia',
    title: 'Cadastrar Procedência',
    icon: Icones.procedencia,
    action: () => showCadastroProcedencia.value = true
  },
  {
    name: 'acSla',
    title: 'Cadastrar Sla',
    icon: Icones.sla,
    action: () => showCadastroSla.value = true
  },
  {
    title: '-'
  },
  {
    name: 'acProcedimento',
    title: 'Associar Procedimento',
    icon: Icones.procedimento,
    action: () => associarProcedimento()

  },
  {
    name: 'acEmpresaProcedencia',
    title: 'Associar Procedência',
    icon: Icones.procedencia,
    action: () => associarProcedencia()
  },
  {
    name: 'acEmpresaSla',
    title: 'Associar Sla',
    icon: Icones.sla,
    action: () => associarSla()
  }
]
const showCadastroSla = ref(false)
const showCadastroProcedencia = ref(false)
const showProcedencia = ref(false)
const showProcedimento = ref(false)
const showSla = ref(false)
const associarProcedimento = () => {
  id.value = apiPage.value.selectedId()
  showProcedimento.value = true
}
const associarProcedencia = () => {
  id.value = apiPage.value.selectedId()
  showProcedencia.value = true
}
const associarSla = () => {
  id.value = apiPage.value.selectedId()
  showSla.value = true
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
      :header="{ title, icon: Icones.empresa }"
      :controller
      :action-menu
      :filter
      @open-form="openForm"
    >
      <template #filter>
        <GerencialEmpresaFiltro
          v-model="filter"
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
    <GerencialEmpresaProcedimento
      v-if="showProcedimento"
      :id
      v-model="showProcedimento"
      @close="showProcedimento=false"
    />
    <GerencialEmpresaProcedencia
      v-if="showProcedencia"
      :id
      v-model="showProcedencia"
      @close="showProcedencia=false"
    />
    <SetupProcedencia
      v-if="showCadastroProcedencia"
      v-model="showCadastroProcedencia"
      @close="showCadastroProcedencia=false"
    />
    <SetupSla
      v-if="showCadastroSla"
      v-model="showCadastroSla"
      @close="showCadastroSla=false"
    />
  </div>
</template>
