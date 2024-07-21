<script lang="ts" setup>
import { GerencialModalidade, GerencialModalidadeGrupo, GerencialModalidadeMedico } from '#components'
import { useModalidade } from '~/composables/gerencial/useModalidade'
import { Icones } from '~/types/system'
import type { ActionMenuItem } from '~/types/grid'

const title = 'Modalidades'
const apiPage = ref(null)
const controller = useModalidade()
const showModal = ref(false)
const id = ref(0)
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
    name: 'acGrupo',
    title: 'Grupos de Procedimento',
    icon: Icones.grupo,
    action: () => {
      modal.open(GerencialModalidadeGrupo, {
        title: 'Grupos de Procedimento',
        pid: apiPage.value.selectedId(),
        onClose() {
          modal.close()
        }
      })
    }
  },
  {
    name: 'acMedico',
    title: 'Auditoria',
    icon: Icones.medico,
    action: () => {
      modal.open(GerencialModalidadeMedico, {
        id: apiPage.value.selectedId(),
        onClose() {
          modal.close()
        }
      })
    }
  }
]
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.modalidade }"
    :controller
    :action-menu
    @open-form="openForm"
  >
    <template #form>
      <GerencialModalidade
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
