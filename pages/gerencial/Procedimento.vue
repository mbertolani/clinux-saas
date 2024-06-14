<script lang="ts" setup>
import { GerencialProcedimento } from '#components'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import type { ActionMenuItem } from '~/types/grid'

const title = 'Procedimentos'
const apiPage = ref(null)
const actionMenu: ActionMenuItem[] = []
const controller = useProcedimento()
const showModal = ref(false)
const id = ref(0)
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}
const onSubmit = (_id: number, data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(_id ? { update: [data] } : { add: [data] })
}
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: 'i-heroicons-queue-list' }"
    :controller
    :action-menu
    @open-form="openForm"
  >
    <template
      v-if="false"
      #filter
    />
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
