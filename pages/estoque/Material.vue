<script lang="ts" setup>
import { EstoqueMaterial } from '#components'
import { useMaterial } from '~/composables/estoque/useMaterial'
import { Icones } from '~/types/system'

const title = 'Materiais'
const apiPage = ref(null)
const controller = useMaterial()
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
    :header="{ title, icon: Icones.material }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <EstoqueMaterial
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
