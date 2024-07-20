<script lang="ts" setup>
import { FaturamentoConvenio } from '#components'
import { useConvenio } from '~/composables/faturamento/useConvenio'
import { Icones } from '~/types/system'

const title = 'Convênios'
const apiPage = ref(null)
const controller = useConvenio()
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
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.convenio }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <FaturamentoConvenio
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
