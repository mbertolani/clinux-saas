<script lang="ts" setup>
import { GerencialSala } from '#components'
import { useSala } from '~/composables/gerencial/useSala'

const title = 'Salas'
const apiPage = ref(null)
const controller = useSala()
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
