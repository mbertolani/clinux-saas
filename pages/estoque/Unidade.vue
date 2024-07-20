<script lang="ts" setup>
import { EstoqueUnidade } from '#components'
import { useUnidade } from '~/composables/estoque/useUnidade'
import { Icones } from '~/types/system'

const title = 'Unidades'
const apiPage = ref(null)
const controller = useUnidade()
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
    :header="{ title, icon: Icones.unidade }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <EstoqueUnidade
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
