<script lang="ts" setup>
import { GerencialProcedimento, GerencialModalidadeGrupo, GerencialProcedimentoModelo } from '#components'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import type { ActionMenuItem } from '~/types/grid'
import { Icones } from '~/types/system'

const title = 'Procedimentos'
const apiPage = ref(null)
const controller = useProcedimento()
const showModal = ref(false)
const id = ref(0)
const filter = ref()
const modal = useModal()

const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}

const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}

const actionMenu: ActionMenuItem[] = [
  {
    name: 'acModelo',
    title: 'Associar Modelo',
    icon: Icones.modelo,
    action: () => {
      associarModelo(apiPage.value.selectedNode()?.id)
    }
  },
  {
    name: 'acGrupo',
    title: 'Grupos de Procedimentos',
    icon: Icones.grupo,
    action: () => {
      modal.open(GerencialModalidadeGrupo, {
        title: 'Grupos de Procedimentos',
        pid: apiPage.value.selectedData()?.cd_modalidade,
        onClose() {
          modal.close()
        }
      })
    }
  }
]
const associarModelo = (codigo?: number) => {
  modal.open(GerencialProcedimentoModelo, {
    id: Number(codigo),
    onClose() {
      modal.close()
    }
  })
}
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.procedimento }"
    :controller
    :action-menu
    :filter
    @open-form="openForm"
  >
    <template #filter>
      <GerencialProcedimentoFiltro
        v-model="filter"
      />
    </template>
    <template #form>
      <GerencialProcedimento
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
