<script lang="ts" setup>
import { GerencialLayout } from '#components'
import { useLayout } from '~/composables/gerencial/useLayout'
import { Icones } from '~/types/system'

const title = 'Impressora'
const apiPage = ref(null)
const controller = useLayout()
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
    :header="{ title, icon: Icones.layout }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <GerencialLayout
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
