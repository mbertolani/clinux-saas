<script lang="ts" setup>
import { EstoqueMaterial } from '#components'
import { useMaterial } from '~/composables/estoque/useMaterial'
import { Icones } from '~/types/system'

const title = 'Materiais'
const apiPage = ref(null)
const controller = useMaterial()
const showModal = ref(false)
const id = ref(0)
const showUnidade = ref(false)
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}

const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}

const actionMenu = [
  {
    name: 'acUnidade',
    title: 'Associar Unidade',
    icon: Icones.unidade,
    action: () => {
      id.value = apiPage.value.selectedId()
      showUnidade.value = true
    }
  }
]
</script>

<template>
  <BasePage
    ref="apiPage"
    :header="{ title, icon: Icones.material }"
    :controller
    :action-menu
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
    <EstoqueMaterialUnidade
      v-if="showUnidade"
      :id
      v-model="showUnidade"
      @close="showUnidade=false"
    />
  </BasePage>
</template>
