<script setup lang="ts">
import { GerencialHorario, GerencialHorarioFiltro } from '#components'
import { useHorario } from '~/composables/gerencial/useHorario'
import type { ActionMenuItem } from '~/types/grid'
import { Icones } from '~/types/system'

const title = 'Agenda'
const apiPage = ref(null)
const controller = useHorario()
const showModal = ref(false)
const id = ref(0)
const filter = ref()

const actionMenu: ActionMenuItem[] = []

const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}

const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.horario }"
    :controller
    :action-menu
    :filter
    @open-form="openForm"
  >
    <template #filter>
      <GerencialHorarioFiltro
        v-model="filter"
      />
    </template>
    <template #form>
      <GerencialHorario
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
