<script lang="ts" setup>
import { GerencialSala } from '#components'
import { useSala } from '~/composables/gerencial/useSala'
import { Icones } from '~/types/system'

const title = 'Salas'
const apiPage = ref(null)
const controller = useSala()
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
    :header="{ title, icon: Icones.sala }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <GerencialSala
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
