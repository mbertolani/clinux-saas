<script lang="ts" setup>
import { GerencialUsuario } from '#components'
import { useUsuario } from '~/composables/gerencial/useUsuario'
import { Icones } from '~/types/system'

const title = 'Usuários'
const apiPage = ref(null)
const controller = useUsuario()
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
    :header="{ title, icon: Icones.usuario }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <GerencialUsuario
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
