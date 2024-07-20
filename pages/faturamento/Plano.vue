<script lang="ts" setup>
import { FaturamentoPlano } from '#components'
import { usePlano } from '~/composables/faturamento/usePlano'
import { Icones } from '~/types/system'

const title = 'Planos'
const apiPage = ref(null)
const controller = usePlano()
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
    :header="{ title, icon: Icones.plano }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <FaturamentoPlano
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
