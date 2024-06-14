<script lang="ts" setup>
import { GerencialSala } from '#components'
import { useSala } from '~/composables/gerencial/useSala'

const apiPage = ref(null)
const controller = useSala()
const showModal = ref(false)
const id = ref(0)

const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}

const onSubmit = (_id: number, data: any) => {
  console.log('submit3', _id, data)
  showModal.value = false
  apiPage.value.applyTransaction(_id ? { update: [data] } : { add: [data] })
}
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title: 'Salas', icon: 'i-heroicons-queue-list' }"
    :controller
    @open-form="openForm"
  >
    <template
      v-if="false"
      #filter
    />
    <template #form>
      <GerencialSala
        :id
        v-model="showModal"
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
