<script lang="ts" setup>
import { GerencialModalidade } from '#components'
import { useModalidade } from '~/composables/gerencial/useModalidade'
import { Icones } from '~/types/system'

const title = 'Modalidades'
const apiPage = ref(null)
const controller = useModalidade()
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
    :header="{ title, icon: Icones.modalidade }"
    :controller
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
