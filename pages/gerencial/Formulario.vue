<script lang="ts" setup>
import { GerencialFormulario } from '#components'
import { useFormulario } from '~/composables/gerencial/useFormulario'
import { Icones } from '~/types/system'

const title = 'Formulários'
const apiPage = ref(null)
const controller = useFormulario()
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
    :header="{ title, icon: Icones.sistema }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <GerencialFormulario
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
