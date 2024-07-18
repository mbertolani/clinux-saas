<script lang="ts" setup>
import { GerencialUsuario, GerencialUsuarioEmpresa, ModalPassword } from '#components'
import { useUsuario } from '~/composables/gerencial/useUsuario'
import { Icones } from '~/types/system'

const title = 'Usuários'
const apiPage = ref(null)
const controller = useUsuario()
const showModal = ref(false)
const id = ref(0)
const modal = useModal()
const actionMenu = [
  {
    name: 'acEmpresa',
    title: 'Associar Empresa',
    icon: Icones.empresa,
    action: () => {
      associarEmpresa(apiPage.value.selectedNode()?.id)
    }
  },
  {
    name: 'acSenha',
    title: 'Alterar Senha',
    icon: Icones.password,
    action: () => {
      alterarSenha(apiPage.value.selectedNode()?.id)
    }
  }
]

const alterarSenha = (codigo?: number) => {
  modal.open(ModalPassword, {
    title: 'Alterar Senha',
    onSubmit(payload: any) {
      controller.exec('password', { cd_usuario: codigo, ds_password: payload.password })
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}

const associarEmpresa = (codigo?: number) => {
  modal.open(GerencialUsuarioEmpresa, {
    id: Number(codigo),
    onClose() {
      modal.close()
    }
  })
}

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
    :action-menu
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
