<script lang="ts" setup>
import { EstoqueMaterialGrupo } from '#components'
import { useMaterialGrupo } from '~/composables/estoque/useMaterialGrupo'
import { Icones } from '~/types/system'

const title = 'Grupos de Materiais'
const apiPage = ref(null)
const controller = useMaterialGrupo()
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
    :header="{ title, icon: Icones.material_grupo }"
    :controller
    @open-form="openForm"
  >
    <template #form>
      <EstoqueMaterialGrupo
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </template>
  </BasePage>
</template>
