<script lang="ts" setup>
import { GerencialFormulario } from '#components'
import { useFormulario } from '~/composables/gerencial/useFormulario'
import { Icones } from '~/types/system'

const title = 'Formulários'
const apiPage = ref(null)
const controller = useFormulario()
const showModal = ref(false)
const id = ref(0)
const showCadastroPermissao = ref(false)

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
    name: 'acPermissao',
    title: 'Permissão',
    icon: Icones.acesso,
    action: () => {
      const data = apiPage.value.selectedData()
      id.value = data.cd_pai ? data.cd_pai : data.cd_form
      showCadastroPermissao.value = true
    }
  }
]
</script>

<template>
  <div>
    <BasePage
      ref="apiPage"
      :header="{ title, icon: Icones.sistema }"
      :controller
      :action-menu
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
    <GerencialUsuarioPermissao
      v-if="showCadastroPermissao"
      :id
      v-model="showCadastroPermissao"
      @close="showCadastroPermissao=false"
    />
  </div>
</template>
